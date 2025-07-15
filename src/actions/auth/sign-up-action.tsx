'use server';

export const signUpAction = async (formData: FormData) => {
  console.warn('---------------------------');
  console.warn('Sign Up Action Triggered');
  console.warn(formData);
  console.warn('---------------------------');
};
