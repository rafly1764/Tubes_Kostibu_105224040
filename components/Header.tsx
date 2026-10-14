import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-emerald-600">Kosibu</Link>
        <nav className="hidden sm:flex gap-6 items-center">
          <Link href="/#kamar" className="hover:text-emerald-600 font-medium">Daftar Kamar</Link>
          {/* Tombol ini akan mengarah ke halaman login nanti */}
          <Link href="/login" className="px-4 py-2 bg-emerald-600 text-white rounded-md font-bold hover:bg-emerald-700 transition">Login Admin</Link>
        </nav>
      </div>
    </header>
  );
}