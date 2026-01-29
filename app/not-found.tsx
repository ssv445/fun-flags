import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-dark">
      <div className="text-center p-8">
        <div className="text-8xl mb-6">🏳️</div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Oops! This flag seems to have flown away. Let&apos;s get you back to exploring!
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-coral text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
