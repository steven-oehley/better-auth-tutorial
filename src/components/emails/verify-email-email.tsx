import * as React from 'react';

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

interface VerifyEmailTemplateProps {
  verificationUrl: string;
  userEmail: string;
  userName: string;
}

const VerifyEmailTemplate = ({
  verificationUrl,
  userEmail,
  userName,
}: VerifyEmailTemplateProps) => {
  return (
    <Html dir='ltr' lang='en'>
      <Preview>Verify your Better Build account</Preview>
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
                Welcome to Better Build!
              </Heading>

              <Text className='mb-[20px] text-[16px] leading-[24px] text-[#5e5e5e]'>
                Hi {userName},
              </Text>

              <Text className='mb-[20px] text-[16px] leading-[24px] text-[#5e5e5e]'>
                Thank you for signing up for Better Build! We&apos;re excited to
                have you on board and help you take your saas projects to the
                next level.
              </Text>

              <Text className='mb-[32px] text-[16px] leading-[24px] text-[#5e5e5e]'>
                To get started, please verify your email address ({userEmail})
                by clicking the button below. This helps us keep your account
                secure and ensures you receive important updates.
              </Text>

              {/* Verify Button */}
              <Section className='mb-[32px] text-center'>
                <Button
                  className='box-border rounded-[8px] border-2 border-solid border-[#f5d900] bg-[#f5d900] px-[32px] py-[16px] text-[16px] font-semibold text-[#6b4700] no-underline'
                  href={verificationUrl}
                >
                  Verify My Email
                </Button>
              </Section>

              <Text className='mb-[20px] text-[14px] leading-[20px] text-[#888888]'>
                If the button doesn&apos;t work, you can copy and paste this
                link into your browser:
              </Text>

              <Text className='mb-[32px] text-[14px] leading-[20px] break-all text-[#0066cc]'>
                {verificationUrl}
              </Text>

              <Text className='mb-[20px] text-[16px] leading-[24px] text-[#5e5e5e]'>
                This verification link will expire in 48 hours. If you
                didn&apos;t create an account with Better Build, you can safely
                ignore this email.
              </Text>

              <Text className='mb-[32px] text-[16px] leading-[24px] text-[#5e5e5e]'>
                Once verified, you&apos;ll have full access to all Better Build
                features including project management, team collaboration, and
                progress tracking.
              </Text>

              <Text className='text-[16px] leading-[24px] text-[#5e5e5e]'>
                Welcome aboard!
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
                © 2025 Better Build. All rights reserved. |
                {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className='ml-[4px] text-[#0066cc] no-underline' href='#'>
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

export default VerifyEmailTemplate;
