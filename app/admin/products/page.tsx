'use client';

import { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct, seedProducts, seedK9Product } from '@/lib/product-utils';
import { Product } from '@/lib/types';
import { products as staticProducts } from '@/app/data/products';
import Link from 'next/link';
import { Plus, Edit, Trash2, Database, Loader2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { AdminButton, AdminHeader, Empty, Panel, Row, SkeletonBlock, th } from '@/components/admin/ui';

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
        if (!confirm('This will overwrite/add products from the static file app/data/products.ts to Firestore. Continue?')) return;

        setSeeding(true);
        try {
            // Map static products to match the Firestore Product interface
            const productsToSeed = staticProducts.map(p => ({
                ...p,
                price: Number(p.price),
                originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
                stock: p.inStock ? 50 : 0,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                petType: (p.petType === 'Canine' ? 'dog' : p.petType === 'Feline' ? 'cat' : 'both') as any,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                productCategory: p.productCategory as any,
            }));

            await seedProducts(productsToSeed);

            // Also ensure admin user
            const { ensureAdminPrivileges } = await import('@/lib/auth-utils');
            await ensureAdminPrivileges('njrgourav@gmail.com');

            alert('Seeding complete! Products added and Admin permissions verified.');
            fetchProducts();
        } catch (e) {
            console.error(e);
            alert('Seeding failed.');
        } finally {
            setSeeding(false);
        }
    };

    const [query, setQuery] = useState('');
    const visible = products.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()));
    const lowStock = products.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) < 10).length;
    const outOfStock = products.filter((p) => (p.stock ?? 0) <= 0).length;

    return (
        <div>
            <AdminHeader
                eyebrow="Catalogue"
                title="Products"
                description="Everything listed in the store. Edit details, stock and pricing, or add something new."
                actions={
                    <>
                        <AdminButton variant="ghost" icon={seeding ? Loader2 : Database} onClick={handleSeed} disabled={seeding}>Seed standard</AdminButton>
                        <AdminButton
                            variant="ghost"
                            icon={seeding ? Loader2 : Database}
                            disabled={seeding}
                            onClick={async () => {
                                if (confirm('Seed K9 Demo Product to DB?')) {
                                    setSeeding(true);
                                    await seedK9Product();
                                    setSeeding(false);
                                    fetchProducts();
                                }
                            }}
                        >
                            Seed K9 demo
                        </AdminButton>
                        <AdminButton href="/admin/products/new" icon={Plus}>Add product</AdminButton>
                    </>
                }
            />

            <div className="mb-5 grid grid-cols-3 gap-3 sm:max-w-xl">
                {[
                    { label: 'Listed', value: products.length, tone: 'text-[#241F1B] dark:text-white' },
                    { label: 'Low stock', value: lowStock, tone: 'text-[#D9502C]' },
                    { label: 'Sold out', value: outOfStock, tone: 'text-red-600' },
                ].map((c, i) => (
                    <motion.div key={c.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }} className="rounded-2xl border border-[#241F1B]/[0.08] bg-white px-4 py-3 dark:border-white/10 dark:bg-[#1A1511]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#241F1B]/45 dark:text-white/40">{c.label}</p>
                        <p className={`font-fredoka text-2xl font-bold ${c.tone}`}>{c.value}</p>
                    </motion.div>
                ))}
            </div>

            <Panel delay={0.15}>
                <div className="flex items-center gap-3 border-b border-[#241F1B]/[0.07] px-5 py-4 dark:border-white/10">
                    <Search size={17} className="text-[#241F1B]/40 dark:text-white/40" />
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" aria-label="Search products" className="w-full bg-transparent text-sm outline-none placeholder:text-[#241F1B]/35 dark:placeholder:text-white/35" />
                </div>
                {loading ? (
                    <div className="space-y-3 p-5">{[0, 1, 2, 3].map((i) => <SkeletonBlock key={i} className="h-14" />)}</div>
                ) : visible.length === 0 ? (
                    <Empty title={products.length ? 'No matches' : 'No products yet'} hint={products.length ? 'Try a different search.' : 'Seed the catalogue or add your first product.'} action={!products.length && <AdminButton href="/admin/products/new" icon={Plus}>Add product</AdminButton>} />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead>
                                <tr>
                                    <th className={th}>Product</th>
                                    <th className={th}>Category</th>
                                    <th className={th}>Price</th>
                                    <th className={th}>Stock</th>
                                    <th className={`${th} text-right`}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visible.map((product, i) => {
                                    const stock = product.stock ?? 0;
                                    return (
                                        <Row key={product.id} i={i} className="group">
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center gap-3.5">
                                                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#F6F2EB] dark:bg-white/5">
                                                        {product.images?.[0] && (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img src={product.images[0]} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                        )}
                                                    </div>
                                                    <Link href={`/admin/products/${product.id}`} className="font-semibold hover:text-[#F4623B]">{product.name}</Link>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className="rounded-full bg-[#241F1B]/[0.05] px-2.5 py-1 text-xs font-semibold capitalize dark:bg-white/10">{product.productCategory || '—'}</span>
                                            </td>
                                            <td className="px-6 py-3.5 font-fredoka text-base font-semibold">₹{Number(product.price).toLocaleString('en-IN')}</td>
                                            <td className="px-6 py-3.5">
                                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${stock <= 0 ? 'text-red-600' : stock < 10 ? 'text-[#D9502C]' : 'text-[#1d8a5f] dark:text-[#5fe0ad]'}`}>
                                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                    {stock <= 0 ? 'Sold out' : `${stock} in stock`}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link href={`/admin/products/${product.id}`} aria-label={`Edit ${product.name}`} className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-[#F4623B] hover:text-white">
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button type="button" onClick={() => handleDelete(product.id)} aria-label={`Delete ${product.name}`} className="grid h-9 w-9 place-items-center rounded-full text-red-600 transition-colors hover:bg-red-600 hover:text-white">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </Row>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </Panel>
        </div>
    );
}
