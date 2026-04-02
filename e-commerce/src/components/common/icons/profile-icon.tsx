'use client';

import Link from 'next/link';
import { CircleUserRound } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { ROUTES } from '@/constants/routes';

const ProfileIcon = () => {
  const { status } = useSession();

  if (status === 'authenticated') {
    return (
      <Link aria-label="profile" href={ROUTES.PROFILE}>
        <CircleUserRound />
      </Link>
    );
  }

  return (
    <Link aria-label="login" href={ROUTES.LOGIN}>
      <CircleUserRound />
    </Link>
  );
};

export default ProfileIcon;
