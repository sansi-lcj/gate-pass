import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
      <div className="space-y-4">
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">
          404
        </h1>
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          Page not found
        </h2>
        <p className="mx-auto max-w-[500px] text-gray-500 dark:text-gray-400">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been removed, had its name changed, or is temporarily
          unavailable.
        </p>
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-8 text-sm font-medium text-white shadow transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
