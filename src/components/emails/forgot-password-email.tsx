import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface PasswordResetEmailProps {
  resetUrl: string;
  userName: string;
  userEmail: string;
}

const PasswordResetEmail = ({
  resetUrl,
  userName,
  userEmail,
}: PasswordResetEmailProps) => {
  return (
    <Html dir='ltr' lang='en'>
      <Preview>Reset your Better Build password</Preview>
      <Tailwind>
        <Head />
        <Body className='bg-gray-100 py-[40px] font-sans'>
          <Container className='mx-auto max-w-[600px] rounded-[16px] bg-white shadow-lg'>
            {/* Header */}
            <Section className='rounded-t-[16px] bg-[#f5d900] px-[40px] py-[32px] text-[#6b4700]'>
              <Heading className='m-0 text-center text-[32px] font-bold'>
                Better Build
              </Heading>
            </Section>

            {/* Main Content */}
            <Section className='px-[40px] py-[32px]'>
              <Heading className='mb-[24px] text-[24px] font-bold text-[#333333]'>
                Reset Your Password
              </Heading>

              <Text className='mb-[20px] text-[16px] leading-[24px] text-[#5e5e5e]'>
                Hi there {userName || '👋'},
              </Text>

              <Text className='mb-[20px] text-[16px] leading-[24px] text-[#5e5e5e]'>
                We received a request to reset the password for your Better
                Build account associated with {userEmail}.
              </Text>

              <Text className='mb-[32px] text-[16px] leading-[24px] text-[#5e5e5e]'>
                Click the button below to create a new password. This link will
                expire in 24 hours for security reasons.
              </Text>

              {/* Reset Button */}
              <Section className='mb-[32px] text-center'>
                <Button
                  className='box-border rounded-[8px] border-2 border-solid border-[#f5d900] bg-[#f5d900] px-[32px] py-[16px] text-[16px] font-semibold text-[#6b4700] no-underline'
                  href={resetUrl}
                >
                  Reset My Password
                </Button>
              </Section>

              <Text className='mb-[20px] text-[14px] leading-[20px] text-[#888888]'>
                If the button doesn&apos;t work, you can copy and paste this
                link into your browser:
              </Text>

              <Text className='mb-[32px] text-[14px] leading-[20px] break-all text-[#0066cc]'>
                {resetUrl}
              </Text>

              <Text className='mb-[20px] text-[16px] leading-[24px] text-[#5e5e5e]'>
                If you didn&apos;t request this password reset, you can safely
                ignore this email. Your password will remain unchanged.
              </Text>

              <Text className='mb-[32px] text-[16px] leading-[24px] text-[#5e5e5e]'>
                For security reasons, please don&apos;t share this email with
                anyone.
              </Text>

              <Text className='text-[16px] leading-[24px] text-[#5e5e5e]'>
                Best regards,
                <br />
                The Better Build Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className='rounded-b-[16px] border-t border-solid border-[#e0e0e0] bg-[#f5f5f5] px-[40px] py-[24px]'>
              <Text className='m-0 mb-[8px] text-center text-[12px] text-[#888888]'>
                Better Build, Inc.
              </Text>
              <Text className='m-0 mb-[8px] text-center text-[12px] text-[#888888]'>
                123 Construction Ave, Builder City, BC 12345
              </Text>
              <Text className='m-0 text-center text-[12px] text-[#888888]'>
                © 2025 Better Build. All rights reserved. | //
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a className='ml-[4px] text-[#0066cc] no-underline' href='/'>
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
