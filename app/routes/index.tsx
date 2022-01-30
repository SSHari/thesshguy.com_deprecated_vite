import type { LinksFunction } from 'remix';
import homeStyles from '~/styles/routes/home.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: homeStyles },
];

export default function Index() {
  return (
    <main>
      <p id="name">Hi I'm Sai</p>
      <p id="alias">The SSH Guy</p>
      <p>
        With a name like SSH, you probably came here expecting me to tell you
        about networking or security or some other third thing.
      </p>
      <p>Sorry! I can't help you with that.</p>
      <p>
        So what's up with the SSH? I'm sure you're dying to find out. Well, it
        turns out those are just my initials. Also, it sounds kind of cool and
        it rhymes.
      </p>
      <p>
        Put it all together and we end up with you just as confused about what I
        do and me wasting a perfectly good elevator pitch trying to explain my
        name.
      </p>
      <p>
        If you stuck with me for this long then here's what I do. I build
        things. Usually front end applications. Usually with React.
      </p>
      <p>
        I'm currently building things at <strong>RSA Security</strong>.
      </p>
      <p>And yes. Don't worry. The irony isn't lost on me.</p>
    </main>
  );
}
