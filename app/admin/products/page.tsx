'use client';

import { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct, seedProducts } from '@/lib/product-utils';
import { Product } from '@/lib/types';
import { products as staticProducts } from '@/app/data/products';
import Link from 'next/link';
import { Plus, Edit, Trash2, Database, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            fetchProducts();
        }
    };

    const handleSeed = async () => {
        if (confirm('This will overwrite/add products from the static file app/data/products.ts to Firestore. Continue?')) {
            setSeeding(true);
            try {
                await seedProducts(staticProducts);

                // Also ensure admin user
                const { ensureAdminPrivileges } = await import('@/lib/auth-utils');
                await ensureAdminPrivileges('njrgourav@gmail.com');

                alert('Seeding complete! Products added and Admin permissions verified.');
                fetchProducts();
            } catch (e) {
                console.error(e);
                alert('Seeding failed.');
            }
            setSeeding(false);
        }
    };

    if (loading) return <div className="p-8 text-center"><Loader2 className="animate-spin inline mr-2" /> Loading products...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Products</h1>
                <div className="flex gap-3">

                    <button
                        onClick={handleSeed}
                        disabled={seeding}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-colors disabled:opacity-70"
                    >
                        {seeding ? <Loader2 className="animate-spin" size={20} /> : <Database size={20} />}
                        Seed Data
                    </button>

                    <Link
                        href="/admin/products/new"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-colors"
                    >
                        <Plus size={20} />
                        Add Product
                    </Link>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Product</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Category</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Price</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Stock</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        No products found. Seed data or add a new one.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="border-b border-slate-200 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="p-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                                            <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                                {product.images && product.images[0] ? (
                                                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                                ) : null}
                                            </div>
                                            {product.name}
                                        </td>
                                        <td className="p-4 text-slate-600 dark:text-slate-400 capitalize">{product.productCategory}</td>
                                        <td className="p-4 text-slate-900 dark:text-white font-bold">₹{product.price}</td>
                                        <td className="p-4 text-slate-600 dark:text-slate-400">{product.stock}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/products/${product.id}`} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
