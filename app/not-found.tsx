import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-2rem)] flex-1 items-center justify-center bg-[#071426] px-5 py-20 text-[#f5f7fb]">
      <div className="w-full max-w-xl text-center">
        <Link
          href="/"
          className="mx-auto mb-10 grid h-14 w-14 place-items-center"
          aria-label="Bright Academy home"
        >
          <Image src="/brightacademylogo.jpg" alt="" width={56} height={59} className="h-14 w-14 rounded-2xl object-contain" />
        </Link>
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#f2c14e]">
          Page not found
        </p>
        <h1 className="mt-4 text-7xl font-black tracking-[-0.05em] sm:text-8xl">
          404
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-white/65">
          The page you&apos;re looking for isn&apos;t here. Head back to Bright Academy
          to find the information you need.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f2c14e] px-6 py-4 text-sm font-bold text-[#071426] transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>
    </main>
  );
}
