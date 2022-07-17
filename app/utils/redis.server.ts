import { createClient, defineScript } from 'redis';
import invariant from 'tiny-invariant';

type RedisClient = ReturnType<typeof setupClient>;
let redis: RedisClient;

declare global {
  var __redis: RedisClient | undefined;
}

const redisUrl = process.env.REDIS_URL;
invariant(!!redisUrl, 'The env variable REDIS_URL needs to be set.');

function noop() {}

function setupClient(url: string) {
  const client = createClient({
    url,
    socket: {
      // Redis is just an optional caching layer...don't wait for it
      reconnectStrategy: () => Error('We cannot connect to redis'),
    },
    scripts: {
      getJson: defineScript({
        NUMBER_OF_KEYS: 1,
        SCRIPT: 'return redis.call("GET", KEYS[1]);',
        transformArguments(key: string) {
          return [key];
        },
        transformReply(reply: string) {
          try {
            return JSON.parse(reply);
          } catch {
            // If the parse fails, just return nothing
            return null;
          }
        },
      }),
      setJson: defineScript({
        NUMBER_OF_KEYS: 1,
        SCRIPT: 'return redis.call("SET", KEYS[1], ARGV[1]);',
        transformArguments(key: string, value: any) {
          return [key, JSON.stringify(value)];
        },
      }),
    },
  });
  client.on('error', (err) => console.warn('Redis Client Error', err));
  return client;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to redis with every change either.
if (process.env.NODE_ENV === 'production') {
  redis = setupClient(redisUrl);
} else {
  if (!global.__redis) {
    global.__redis = setupClient(redisUrl);
  }
  redis = global.__redis;
}

async function getRedisClient() {
  if (!redis.isReady) {
    try {
      await redis.connect();
    } catch {
      // Prevent access to redis if the connection failed
      return new Proxy(redis, {
        get(target, prop) {
          console.warn(
            `Failed to connect to redis, so the ${
              prop as string
            } request cannot be completed.`,
          );
          if (typeof target[prop as keyof RedisClient] === 'function') {
            return noop;
          }
        },
      });
    }
  }

  return redis;
}

const redisKeys = {
  DEMO_LIST: 'demo:list',
  DEMO_POST: (slug: string) => `demo:post:${slug}`,
  WRITING_LIST: 'writing:list',
  WRITING_POST: (slug: string) => `writing:post:${slug}`,
};

export { getRedisClient, redisKeys };
