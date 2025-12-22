'use client';

import { useEffect, useState, use } from 'react';
import ProductEditor from '@/components/admin/ProductEditor';
import { getProductById } from '@/lib/product-utils';
import { Product } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            const data = await getProductById(id);
            if (data) {
                setProduct(data);
            } else {
                alert('Product not found');
                router.push('/admin/products');
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    if (!product) return null;

    return <ProductEditor initialData={product} isEditing />;
}
