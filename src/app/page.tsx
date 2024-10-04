'use client';

import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/CheckoutForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Product } from './types';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const products: Product[] = [
  {
    id: 1,
    name: 'Eco-Friendly Hoodie',
    description: 'Comfortable, sustainable cotton blend hoodie perfect for any occasion.',
    price: 59.99,
    image: '/app/images/hoodie.jpg',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    description: 'Classic fit t-shirt made from 100% organic cotton.',
    price: 29.99,
    image: '/api/placeholder/300/200',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 3,
    name: 'Recycled Denim Jeans',
    description: 'Stylish jeans made from recycled materials without compromising comfort.',
    price: 79.99,
    image: '/app/images/jeans.webp',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    name: 'Organic White T-Shirt',
    description: 'Versatile white tee made from organic cotton, perfect for any outfit.',
    price: 24.99,
    image: '/app/images/whiteshirt.webp',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 5,
    name: 'Eco-Friendly Graphic Tee',
    description: 'Express your style with this sustainably made graphic t-shirt.',
    price: 34.99,
    image: '/app/images/tshirt.webp',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

export default function Home() {
  const [cartItems, setCartItems] = useState<(Product & { selectedSize: string; quantity: number })[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const addToCart = (product: Product, size: string, quantity: number) => {
    const itemWithOptions = { ...product, selectedSize: size, quantity };
    setCartItems([...cartItems, itemWithOptions]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleCheckout = async () => {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          amount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        },
      }),
    });

    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);
    setShowCheckout(true);
  };

  return (
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Cozy Threads</h1>
          <Button
              variant="outline"
              onClick={() => setShowCart(!showCart)}
              className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
            )}
          </Button>
        </header>

        {showCheckout && clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
        ) : showCart ? (
            <Cart
                items={cartItems}
                onRemove={removeFromCart}
                onCheckout={handleCheckout}
            />
        ) : (
            <ProductList products={products} onAddToCart={addToCart} />
        )}
      </div>
  );
}