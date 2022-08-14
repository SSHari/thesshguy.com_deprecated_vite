import { Header } from 'components/Header';
import { CustomCSSProperties } from 'utils/styles';

function App() {
  return (
    <div
      style={
        {
          '--min-clamp': '500px',
          '--ideal-clamp': '60%',
          '--max-clamp': '900px',
        } as CustomCSSProperties
      }
      className="clamp-width mx-auto"
    >
      <Header />

      <main className="my-4 p-4">
        <p className="m-0 text-6xl font-medium">Hi I'm Sai</p>
        <p className="m-0 text-3xl font-medium">The SSH Guy</p>
        <p>With a name like SSH, you probably came here expecting me to tell you about networking or security or some other third thing.</p>
        <p>Sorry! I can't help you with that.</p>
        <p>
          So what's up with the SSH? I'm sure you're dying to find out. Well, it turns out those are just my initials. Also, it sounds kind of cool
          and it rhymes.
        </p>
        <p>
          Put it all together and we end up with you just as confused about what I do and me wasting a perfectly good elevator pitch trying to explain
          my name.
        </p>
        <p>If you stuck with me for this long then here's what I do. I build things.</p>
        <p>
          Here's a couple of highlights:
          <ul className="mt-2 flex list-inside list-disc flex-col gap-2">
            <li>
              <strong>React</strong> for the frontend
            </li>
            <li>
              <strong>Node</strong> for the backend
            </li>
            <li>
              <strong>Python</strong> for the data pipelines
            </li>
            <li>
              <strong>Elasticsearch</strong> for the data storage / retrieval
            </li>
            <li>
              <strong>Docker</strong> and <strong>Kubernetes</strong> for the services
            </li>
            <li>
              <strong>AWS</strong> for the cloud and <strong>Terraform</strong> to codify the infrastructure
            </li>
            <li>
              <strong>Lua</strong> to fuel that sweet sweet <strong>Neovim</strong> life
            </li>
          </ul>
        </p>
        <p>
          I used to build things at <strong>RSA Security</strong>.
        </p>
        <p>
          Today I build things at <strong>Dragos</strong>.
        </p>
        <p>And yes. Don't worry. The irony isn't lost on me.</p>
      </main>
    </div>
  );
}

export default App;
