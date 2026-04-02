'use client';

import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/common/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="bg-contained flex min-h-[60vh] flex-col items-center justify-center">
      <div className="bg-contained flex w-full max-w-md flex-col items-center rounded-xl p-8 shadow-lg">
        <AlertTriangle className="text-destructive mb-4 h-16 w-16" />
        <h1 className="text-gray mb-2 text-2xl font-bold">
          Oops! Something went wrong
        </h1>
        <p className="text-gray/60 mb-4 text-center">
          Failed to fetch data. Please try again later!
        </p>
        <Button
          onClick={() => reset()}
          variant="destructive"
          className="mt-2 w-full"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
