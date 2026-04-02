import { BASE_URL } from '@/constants/url';

import ProfileSection from '@/components/features/user/profile/profile-section';

import { createMetadata } from '@/utils/metadata';

export const metadata = createMetadata({
  title: 'Profile',
  description: 'View and manage your user profile on Shop.co',
  keywords: ['profile', 'user', 'account', 'Shop.co'],
  url: `${BASE_URL}/profile`,
  imageAlt: 'Shop.co Profile',
  type: 'profile'
});

export default function ProfilePage() {
  return (
    <div className="py-10">
      <div className="container m-auto px-3">
        <h1 className="mb-6 text-2xl font-bold">Profile</h1>
        <ProfileSection />
      </div>
    </div>
  );
}
