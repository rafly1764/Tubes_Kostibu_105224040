import Link from "next/link";

interface Tautan {
  href: string;
  label: string;
}

interface HeaderProps {
  namaProduk?: string;
  tautan?: Tautan[];
}

export default function Header({ namaProduk = "Kosibu", tautan = [] }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        <Link href="/" className="text-2xl font-bold text-emerald-600">
          {namaProduk}
        </Link>
        
        <nav className="hidden sm:flex gap-6 items-center">
          
          {tautan.map((t) => (
            <Link key={t.href} href={t.href} className="hover:text-emerald-600 font-medium">
              {t.label}
            </Link>
          ))}
          
          <Link href="/login" className="px-4 py-2 bg-emerald-600 text-white rounded-md font-bold hover:bg-emerald-700 transition">
            Login Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}