import Link from 'next/link';
import { PackageX } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <PackageX className="text-gray mb-4 text-6xl" />
      <h1 className="text-primary mb-2 text-3xl font-extrabold">
        Product Not Found
      </h1>
      <p className="text-gray mb-6 max-w-md text-lg">
        The product you are looking for does not exist or may have been removed.
      </p>
      <Link href={ROUTES.SHOP}>
        <span className="bg-primary hover:bg-primary/90 text-contained inline-block rounded-lg px-6 py-2 font-semibold shadow transition-colors">
          Back to Shop
        </span>
      </Link>
    </div>
  );
}
