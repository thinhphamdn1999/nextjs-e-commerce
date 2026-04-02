import Link from 'next/link';
import { Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <Ghost size={96} className="text-gray mb-6" />
      <h1 className="text-gray mb-2 text-3xl font-bold">
        404 - Page Not Found
      </h1>
      <p className="text-gray mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-contained inline-block rounded bg-blue-600 px-6 py-2 transition-colors hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
