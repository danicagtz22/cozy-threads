import { useState } from 'react';
import { Button } from '../../components/ui/button';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Product } from '../types';

interface ProductListProps {
    products: Product[];
    onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export default function ProductList({ products, onAddToCart }: ProductListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
                <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
}

function ProductItem({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product, size: string, quantity: number) => void }) {
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        onAddToCart(product, selectedSize, quantity);
    };

    return (
        <Card>
            <CardHeader>
                <div className="relative w-full h-64">
                    <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="mt-4">
                    <label className="block mb-2">Size:</label>
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value as string)}
                        className="w-full p-2 border rounded"
                    >
                        {product.sizes?.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label className="block mb-2">Quantity:</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleAddToCart} className="w-full">
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}