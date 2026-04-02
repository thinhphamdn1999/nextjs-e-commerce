'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ROUTES } from '@/constants/routes';

import { Button } from '@/components/common/ui/button';
import { Skeleton } from '@/components/common/ui/skeleton';

import { userSignOut } from '@/actions/auth';
import useCartContext from '@/hooks/use-cart-context';

const ProfileSection = () => {
  const { data: session, status, update } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { clearCart } = useCartContext();
  const router = useRouter();

  const email = session?.user?.email || '';

  const handleClickLogout = async () => {
    setIsLoggingOut(true);
    try {
      await userSignOut();
      clearCart(); // Clear the cart on logout
      await update(); // Update session state
    } catch {
      toast.error('Failed to log out. Please try again.');
      setIsLoggingOut(false);
      return;
    }

    router.push(ROUTES.HOME);
  };

  return (
    <>
      <div className="border-border-foreground flex max-w-lg flex-col rounded-lg border p-4">
        <h2 className="text-lg font-semibold">Email</h2>
        {status === 'loading' || !email ? (
          <Skeleton className="h-10 w-100" />
        ) : (
          <p className="text-primary mt-2 text-sm">{email}</p>
        )}
      </div>
      <div>
        <Button
          variant="destructive"
          className="mt-4"
          onClick={handleClickLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    </>
  );
};

export default ProfileSection;
