// src/app/success/page.tsx
import Link from 'next/link';

export default function SuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Thank you for your order!</h1>
            <p className="text-xl mb-8">Your payment was successful and your order is on the way.</p>
            <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Return to Home
            </Link>
        </div>
    );
}
