import { BASE_URL } from '@/constants/url';
import { ROUTES } from '@/constants/routes';

import LoginForm from '@/components/features/auth/login/login-form';

import { createMetadata } from '@/utils/metadata';

export const metadata = createMetadata({
  title: 'Login',
  description:
    'Login to your Shop.co account to access exclusive deals and manage your profile.',
  keywords: ['login', 'authentication', 'user', 'Shop.co'],
  url: `${BASE_URL}${ROUTES.LOGIN}`,
  imageAlt: 'Shop.co Login'
});

export default function LoginPage() {
  return (
    <div className="border-border-foreground mx-auto mt-60 w-fit rounded-xl border p-15 shadow-lg">
      <h1 className="mb-6 text-2xl font-bold">Login</h1>
      <LoginForm />
    </div>
  );
}
