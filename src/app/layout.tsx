import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body>
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <Link href="/" className="text-3xl font-bold">Cozy Threads</Link>
          <nav className="mt-2">
            <Link href="/" className="mx-2 hover:underline">Home</Link>
            <Link href="/products" className="mx-2 hover:underline">Products</Link>
            <Link href="/cart" className="mx-2 hover:underline">Cart</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      </body>
      </html>
  );
}