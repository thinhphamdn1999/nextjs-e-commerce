'use client';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ROUTES } from '@/constants/routes';

import { Button } from '@/components/common/ui/button';
import { Input } from '@/components/common/ui/input';

import { signInSchema } from '@/lib/schema';
import { userSignIn } from '@/actions/auth';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { update } = useSession();
  const router = useRouter();

  type FormData = z.infer<typeof signInSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema)
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const res = await userSignIn({
        email: data.email,
        password: data.password
      });

      if (res) {
        setError('email', { message: res });
        setError('password', { message: '' });
        return;
      }

      await update();
    } catch {
      toast.error('Failed to log in. Please try again.');
      return;
    }

    router.push(ROUTES.HOME);
  };

  return (
    <form
      className="w-full max-w-md space-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="focus-within:ring-ring relative flex items-center rounded-md border pl-2 focus-within:ring-1">
        <MailIcon className="text-muted-foreground h-5 w-5" />
        <Input
          id="credentials-email"
          type="email"
          placeholder="Email"
          className="border-0 shadow-none focus-visible:ring-0"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
      </div>
      {errors.email && (
        <p className="text-destructive text-[0.8rem]">{errors.email.message}</p>
      )}
      <div className="focus-within:ring-ring relative flex items-center rounded-md border px-2 focus-within:ring-1">
        <LockIcon className="text-muted-foreground h-5 w-5" />
        <Input
          id="credentials-password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="border-0 shadow-none focus-visible:ring-0"
          aria-invalid={!!errors.password}
          {...register('password')}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? (
            <EyeOffIcon className="text-muted-foreground h-5 w-5" />
          ) : (
            <EyeIcon className="text-muted-foreground h-5 w-5" />
          )}
        </button>
      </div>
      {errors.password && (
        <p className="text-destructive text-[0.8rem]">
          {errors.password.message}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </Button>
    </form>
  );
};

export default LoginForm;
