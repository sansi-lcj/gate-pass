"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
      <div className="space-y-4">
        <h1 className="text-9xl font-bold text-red-100 dark:text-red-900/20">500</h1>
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Something went wrong
        </h2>
        <p className="mx-auto max-w-[500px] text-gray-500 dark:text-gray-400">
          We apologize for the inconvenience. An unexpected error has occurred. Please try again later.
        </p>
        <div className="flex justify-center gap-4 pt-8">
          <button
            onClick={reset}
            className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-8 text-sm font-medium text-white shadow transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-brand"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
