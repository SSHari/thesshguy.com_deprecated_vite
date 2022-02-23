import { useEffect } from 'react';
import { useLocation, useSubmit } from 'remix';

/************
 * MAGIC LINK
 ************/
type MagicLinkInfo = {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  token_type: string;
  type: string;
};

// Check if the magic link follows the pattern set by supabase
function isValidMagicLink(hash: string) {
  if (!hash.includes('access_token')) return false;
  if (!hash.includes('expires_in')) return false;
  if (!hash.includes('refresh_token')) return false;
  if (!hash.includes('token_type')) return false;
  if (!hash.includes('type')) return false;

  return true;
}

// Parse the magic link into an object for easy access
function parseMagicLink(hash: string) {
  const normalizedHash = hash.replace('#', '');
  const linkParts = normalizedHash.split('&');
  const magicLinkInfo = linkParts.reduce<Partial<MagicLinkInfo>>(
    (info, part) => {
      const [key, value] = part.split('=');
      return { ...info, [key]: value };
    },
    {},
  );

  return magicLinkInfo as MagicLinkInfo;
}

/********************
 * SESSION MANAGEMENT
 ********************/
// Take a magic link and make a request to /auth so the server can set a cookie
export function useMagicLink() {
  const { hash } = useLocation();
  const submit = useSubmit();

  useEffect(() => {
    if (hash && isValidMagicLink(hash)) {
      const magicLinkInfo = parseMagicLink(hash);
      submit(magicLinkInfo, { method: 'post', action: '/auth' });
    }
  }, [submit, hash]);
}
