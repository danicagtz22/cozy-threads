
// app/components/Cart.tsx
//import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from  '../../components/ui/card';
//import { X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Product } from '../types';

interface CartProps {
    items: (Product & { selectedSize: string; quantity: number })[];
    onRemove: (productId: number) => void;
    onCheckout: () => void;
}

export default function Cart({ items, onRemove, onCheckout }: CartProps) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {items.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center mb-4 p-2 border-b">
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <Button variant="outline" onClick={() => onRemove(item.id)}>Remove</Button>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
                        <Button onClick={onCheckout}>Proceed to Checkout</Button>
                    </div>
                </>
            )}
        </div>
    );
}