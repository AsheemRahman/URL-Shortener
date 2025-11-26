import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Shorten Your URLs
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create short, memorable links in seconds. Track and manage all your URLs in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register"  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Get Started
          </Link>
          <Link href="/login"  className="px-8 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-100 font-medium border">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}