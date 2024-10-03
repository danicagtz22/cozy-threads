// app/components/ProductList.tsx
import { Product } from '../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import Image from 'next/image';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <Card key={product.id}>
          <Image src={product.image} alt={product.name} width={300} height={200} />
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>${product.price.toFixed(2)}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{product.description}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => onAddToCart(product)} className="w-full">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

