import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#06131d] text-white">
      <div className="text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <Link href="/" className="mt-6 inline-block underline">
          HOME
        </Link>
      </div>
    </main>
  );
}
