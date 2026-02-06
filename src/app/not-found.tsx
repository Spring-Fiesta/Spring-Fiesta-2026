import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] text-white">
      <h1 className="text-6xl md:text-9xl font-bold font-unbounded text-[#FF204E]">404</h1>
      <h2 className="text-2xl md:text-4xl mt-4 font-unbounded">Page Not Found</h2>
      <p className="text-gray-400 mt-4 text-center max-w-md px-4">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 px-8 py-3 bg-[#FF204E] hover:bg-[#A0153E] rounded-lg font-bold transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}
