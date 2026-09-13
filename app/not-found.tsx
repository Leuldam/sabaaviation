import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-200 px-6 py-20 text-midnight">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#073f67]">
          404
        </p>
        <h1 className="text-4xl font-black tracking-[-0.06em] text-[#0b1620]">
          This page could not be found.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-700">
          The page you were looking for may have moved or no longer exists.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#073f67] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#062d4b]"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
