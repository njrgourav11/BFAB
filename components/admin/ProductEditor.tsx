'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import { createProduct, updateProduct } from '@/lib/product-utils';
import { uploadImage } from '@/lib/storage-utils';
import { ArrowLeft, Upload, Loader2, Save, X, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductEditorProps {
    initialData?: Product;
    isEditing?: boolean;
}

export default function ProductEditor({ initialData, isEditing = false }: ProductEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [name, setName] = useState(initialData?.name || '');
    const [price, setPrice] = useState(initialData?.price?.toString() || '');
    const [stock, setStock] = useState(initialData?.stock?.toString() || '0');
    const [description, setDescription] = useState(initialData?.description || '');
    const [category, setCategory] = useState(initialData?.category || ''); // e.g., 'Food' (internal?)
    const [productCategory, setProductCategory] = useState(initialData?.productCategory || 'food'); // 'food', 'toy', etc
    const [petType, setPetType] = useState(initialData?.petType || 'dog');
    const [images, setImages] = useState<string[]>(initialData?.images || []);
    const [features, setFeatures] = useState<string[]>(initialData?.features || []);
    const [newFeature, setNewFeature] = useState('');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadImage(file, 'products');
            setImages([...images, url]);
        } catch (error) {
            console.error(error);
            alert('Failed to upload image');
        }
        setUploading(false);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setFeatures([...features, newFeature.trim()]);
            setNewFeature('');
        }
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const productData = {
            name,
            price: parseFloat(price),
            stock: parseInt(stock),
            description,
            category, // Keep as string for now if schema uses it
            productCategory,
            petType: petType as 'dog' | 'cat' | 'both',
            images,
            features,
            isNew: false, // Default
            rating: initialData?.rating || 5, // Default/Preserve
            reviews: initialData?.reviews || 0,
        };

        try {
            if (isEditing && initialData?.id) {
                await updateProduct(initialData.id, productData);
            } else {
                await createProduct(productData);
            }
            router.push('/admin/products');
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/products"
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Products
                </Link>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Product Name</label>
                            <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Price (₹)</label>
                                <input type="number" required value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Stock</label>
                                <input type="number" required value={stock} onChange={e => setStock(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Description</label>
                            <textarea rows={5} required value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Images</label>
                        <div className="grid grid-cols-3 gap-4">
                            {images.map((img, i) => (
                                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                    <Image src={img} alt="Product" fill className="object-cover" />
                                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"><X size={12} /></button>
                                </div>
                            ))}
                            <div className="aspect-square border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 relative">
                                {uploading ? <Loader2 className="animate-spin" /> : <Plus size={24} className="text-slate-400" />}
                                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Features</label>
                        <div className="flex gap-2">
                            <input type="text" value={newFeature} onChange={e => setNewFeature(e.target.value)} className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" placeholder="Add a feature..." />
                            <button type="button" onClick={addFeature} className="bg-slate-200 dark:bg-slate-800 p-3 rounded-xl"><Plus /></button>
                        </div>
                        <ul className="space-y-2">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-sm">
                                    {feature}
                                    <button type="button" onClick={() => removeFeature(i)} className="text-red-500"><X size={16} /></button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            {isEditing ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Category (Sub)</label>
                            <input type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" placeholder="e.g. Dry Food" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Product Category (Main)</label>
                            <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                                <option value="food">Food</option>
                                <option value="toys">Toys</option>
                                <option value="accessories">Accessories</option>
                                <option value="grooming">Grooming</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Pet Type</label>
                            <select value={petType} onChange={e => setPetType(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="both">Both</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
