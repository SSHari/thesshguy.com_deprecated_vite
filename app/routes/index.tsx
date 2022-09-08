import { IconLink } from '~/components/IconLink';
import { useMagicLink } from '~/hooks/use-magic-link';
import TwitterIcon from '~/icons/TwitterIcon';
import LinkedInIcon from '~/icons/LinkedInIcon';
import GitHubIcon from '~/icons/GitHubIcon';
import BlogIcon from '~/icons/BlogIcon';

export default function IndexRoute() {
  // Handle magic links from supabase
  useMagicLink();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-auto flex w-full overflow-hidden bg-white text-center md:mt-2 md:h-[250px] md:w-11/12 md:max-w-[1000px] md:rounded-md md:border-x-8 md:border-r-primary md:border-l-[#cce9ee] md:text-left">
        <div className="hidden bg-[#cce9ee] md:flex md:h-full md:w-[300px] md:items-center">
          <img src="/images/The_SSH_Guy_Logo.png" className="w-full" />
        </div>
        <div className="flex w-full flex-col gap-6 border-b-8 border-b-primary bg-[hsl(189,30%,97%)] p-8 pt-24 md:flex-1 md:border-b-0 md:pt-8">
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
    </div>
  );
}
