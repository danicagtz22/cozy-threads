
// app/components/Cart.tsx
import { Product } from '../types';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from  '../../components/ui/card';
import { X } from 'lucide-react';

interface CartProps {
  items: Product[];
  onRemove: (productId: number) => void;
  onCheckout: () => void;
}

export default function Cart({ items, onRemove, onCheckout }: CartProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
        <CardDescription>
          {items.length} item{items.length !== 1 ? 's' : ''} in cart
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-4 p-2 border rounded">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onRemove(item.id)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-lg font-semibold">
          Total: ${items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
        </div>
        <Button onClick={onCheckout} disabled={items.length === 0}>
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}

