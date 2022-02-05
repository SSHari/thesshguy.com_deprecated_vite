import { createCookieSessionStorage, redirect } from 'remix';
import invariant from 'tiny-invariant';
import { supabase } from './supabase';

/*
 * CONSTANTS
 */
const tokenKey = 'auth_token';
const sessionSecret = process.env.SESSION_SECRET;
invariant(!!sessionSecret, 'SESSION_SECRET must be set');

export async function login(email: string) {
  return supabase.auth.api.sendMagicLinkEmail(email);
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'SSH_session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
});

export async function createUserSession(token: string, expiresIn: string) {
  // Verify the user is real to avoid creating unnecessary sessions
  const { error } = await supabase.auth.api.getUser(token);
  if (error) return redirect('/');

  let maxAge = Number(expiresIn);
  if (Number.isNaN(maxAge)) {
    // If no expiration is provided, set the expiration to an hour
    maxAge = 60 * 60;
  }

  const session = await storage.getSession();
  session.set(tokenKey, token);
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.commitSession(session, { maxAge }),
    },
  });
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function getUser(request: Request) {
  const session = await getUserSession(request);
  const token = session.get(tokenKey);
  if (!token || typeof token !== 'string') return null;

  const { user, error } = await supabase.auth.api.getUser(token);
  if (error) return null;
  return user;
}

export async function requireUser(request: Request) {
  const user = await getUser(request);
  if (!user) throw redirect('/');
  return user;
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'));
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}
