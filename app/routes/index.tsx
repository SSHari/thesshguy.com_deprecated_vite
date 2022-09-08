import { IconLink } from '~/components/IconLink';
import { useMagicLink } from '~/hooks/use-magic-link';
import TwitterIcon from '~/icons/TwitterIcon';
import LinkedInIcon from '~/icons/LinkedInIcon';
import GitHubIcon from '~/icons/GitHubIcon';
import BlogIcon from '~/icons/BlogIcon';

function About() {
  return (
    <>
      <div className="mt-8 mb-2 px-8 text-xl">
        <p className="text-xl">About</p>
        <hr />
      </div>
      <main className="flex flex-col gap-8 py-4 px-8 md:flex-row md:gap-16">
        <div className="flex w-full max-w-[600px] flex-col gap-4">
          <p>
            With a name like SSH, you probably came here expecting me to tell
            you about networking or security or some other third thing.
          </p>
          <p>Sorry! I can't help you with that.</p>
          <p>
            So what's up with the SSH? I'm sure you're dying to find out. Well,
            it turns out those are just my initials. Also, it sounds kind of
            cool and it rhymes.
          </p>
          <p>
            Put it all together and we end up with you just as confused about
            what I do and me wasting a perfectly good elevator pitch trying to
            explain my name.
          </p>
          <p>
            If you stuck with me for this long then here's what I do. I build
            things.
          </p>
          <p>
            I used to build things at <strong>RSA Security</strong>.
          </p>
          <p>
            Today I build things at <strong>Dragos</strong>.
          </p>
          <p>And yes. Don't worry. The irony isn't lost on me.</p>
        </div>
        <div>
          <p className="font-bold">Here's a couple of highlights:</p>
          <ul className="mt-2 ml-4 flex list-outside list-disc flex-col gap-2">
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
              <strong>Docker</strong> and <strong>Kubernetes</strong> for the
              services
            </li>
            <li>
              <strong>AWS</strong> for the cloud and <strong>Terraform</strong>{' '}
              to codify the infrastructure
            </li>
            <li>
              <strong>Lua</strong> to fuel that sweet sweet{' '}
              <strong>Neovim</strong> life
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}

export default function IndexRoute() {
  // Handle magic links from supabase
  useMagicLink();

  return (
    <div className="flex h-full w-full flex-col overflow-scroll">
      <div className="sticky -top-48 mx-auto flex w-full text-center md:relative md:top-0 md:mt-2 md:h-[250px] md:w-11/12 md:max-w-[1000px] md:rounded-md md:border-x-8 md:border-r-primary-700 md:border-l-primary-100 md:text-left">
        <div className="hidden overflow-hidden md:flex md:h-full md:w-[300px] md:items-center">
          <img src="/images/The_SSH_Guy_Logo.png" className="w-full" />
        </div>
        <div className="flex w-full flex-col gap-6 border-b-8 border-b-primary-700 bg-gray-100 p-4 pt-12 md:flex-1 md:border-b-0 md:pt-8">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">TheSSHGuy</p>
            <p className="text-xl text-gray-600">Sai Hari</p>
          </div>

          <div className="flex flex-col">
            <p className="text-xl">Staff Data Engineer</p>
            <p className="text-l text-gray-600">Dragos</p>
          </div>

          <div className="flex items-center justify-center gap-2 md:justify-start">
            <IconLink
              Component={TwitterIcon}
              link="https://twitter.com/TheSSHGuy"
            />
            <IconLink
              Component={LinkedInIcon}
              link="https://www.linkedin.com/in/sshari/"
            />
            <IconLink Component={GitHubIcon} link="https://github.com/SSHari" />
            <IconLink Component={BlogIcon} link="https://blog.thesshguy.com" />
          </div>
        </div>
      </div>

      <div className="mx-auto w-11/12 max-w-[1000px] flex-1">
        <About />
      </div>
    </div>
  );
}
