'use client';

import { signIn } from '@/lib/auth-client';

import { Button } from '../ui/button';

export type Provider =
  | 'apple'
  | 'discord'
  | 'facebook'
  | 'github'
  | 'google'
  | 'huggingface'
  | 'kick'
  | 'linkedin'
  | 'microsoft'
  | 'tiktok'
  | 'twitch'
  | 'twitter'
  | 'dropbox'
  | 'gitlab'
  | 'reddit'
  | 'spotify'
  | 'roblox'
  | 'steam'
  | 'vk'
  | 'zoom';

interface SignInSocialProps {
  provider: Provider;
  children: React.ReactNode;
  callbackURL?: string; // Optional callback URL
}

const SignInSocial = ({
  provider,
  children,
  callbackURL,
}: SignInSocialProps) => {
  const handleSocialSignIn = async () => {
    await signIn.social({
      callbackURL,
      provider,
    });
  };

  return (
    <Button
      className='cursor-pointer'
      variant='outline'
      onClick={handleSocialSignIn}
    >
      {children}
    </Button>
  );
};
export default SignInSocial;
