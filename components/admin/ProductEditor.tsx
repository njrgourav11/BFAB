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

    const [reviews, setReviews] = useState(initialData?.reviews || 0);
    const [packOptions, setPackOptions] = useState<{ label: string; price: number; stock: number; sku: string }[]>(
        initialData?.packOptions?.map(po => ({
            label: po.label,
            price: po.price,
            stock: po.stock || 0,
            sku: po.sku || ''
        })) || []
    );

    // Extended Details State
    const [longDescription, setLongDescription] = useState(initialData?.longDescription || '');
    const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(initialData?.faqs || []);
    const [ingredients, setIngredients] = useState<{ name: string; description: string }[]>(initialData?.ingredients || []);
    const [benefits, setBenefits] = useState<{ title: string; description: string }[]>(initialData?.detailedBenefits || []);
    const [feedGuide, setFeedGuide] = useState<string[]>(initialData?.feedGuide || []);

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

    // Pack Options Handlers
    const addPackOption = () => {
        setPackOptions([...packOptions, { label: `Pack of ${packOptions.length + 1}`, price: parseFloat(price) || 0, stock: parseInt(stock) || 0, sku: '' }]);
    };

    const removePackOption = (index: number) => {
        setPackOptions(packOptions.filter((_, i) => i !== index));
    };

    const updatePackOption = (index: number, field: keyof typeof packOptions[0], value: any) => {
        const newOptions = [...packOptions];
        newOptions[index] = { ...newOptions[index], [field]: value };
        setPackOptions(newOptions);
    };

    // Extended Details Handlers
    const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
    const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
        const newFaqs = [...faqs];
        newFaqs[index] = { ...newFaqs[index], [field]: value };
        setFaqs(newFaqs);
    };
    const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));

    const addIngredient = () => setIngredients([...ingredients, { name: '', description: '' }]);
    const updateIngredient = (index: number, field: 'name' | 'description', value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = { ...newIngredients[index], [field]: value };
        setIngredients(newIngredients);
    };
    const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));

    const addBenefit = () => setBenefits([...benefits, { title: '', description: '' }]);
    const updateBenefit = (index: number, field: 'title' | 'description', value: string) => {
        const newBenefits = [...benefits];
        newBenefits[index] = { ...newBenefits[index], [field]: value };
        setBenefits(newBenefits);
    };
    const removeBenefit = (index: number) => setBenefits(benefits.filter((_, i) => i !== index));

    const addFeedGuide = () => setFeedGuide([...feedGuide, '']);
    const updateFeedGuide = (index: number, value: string) => {
        const newGuide = [...feedGuide];
        newGuide[index] = value;
        setFeedGuide(newGuide);
    };
    const removeFeedGuide = (index: number) => setFeedGuide(feedGuide.filter((_, i) => i !== index));

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
            reviews: reviews, // Use state if we were editing it, or initialData
            packOptions: packOptions.length > 0 ? packOptions : undefined,
            longDescription: longDescription || undefined,
            faqs: faqs.length > 0 ? faqs : undefined,
            ingredients: ingredients.length > 0 ? ingredients : undefined,
            detailedBenefits: benefits.length > 0 ? benefits : undefined,
            feedGuide: feedGuide.length > 0 ? feedGuide : undefined,
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

                    {/* Pack Options Section */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Pack Options (Variants)</label>
                            <button type="button" onClick={addPackOption} className="text-sm text-blue-600 font-bold flex items-center gap-1 hover:underline">
                                <Plus size={16} /> Add Variant
                            </button>
                        </div>

                        {packOptions.length === 0 ? (
                            <p className="text-sm text-slate-500 italic">No variants added. Standard pricing applies.</p>
                        ) : (
                            <div className="space-y-3">
                                {packOptions.map((option, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row gap-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 relative group">
                                        <div className="flex-1">
                                            <label className="text-xs font-semibold text-slate-500 mb-1 block">Label</label>
                                            <input
                                                type="text"
                                                value={option.label} // e.g. "Pack of 2"
                                                onChange={(e) => updatePackOption(index, 'label', e.target.value)}
                                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm"
                                                placeholder="Pack of..."
                                            />
                                        </div>
                                        <div className="w-full sm:w-28">
                                            <label className="text-xs font-semibold text-slate-500 mb-1 block">Price (₹)</label>
                                            <input
                                                type="number"
                                                value={option.price}
                                                onChange={(e) => updatePackOption(index, 'price', parseFloat(e.target.value))}
                                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div className="w-full sm:w-24">
                                            <label className="text-xs font-semibold text-slate-500 mb-1 block">Stock</label>
                                            <input
                                                type="number"
                                                value={option.stock}
                                                onChange={(e) => updatePackOption(index, 'stock', parseInt(e.target.value))}
                                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removePackOption(index)}
                                            className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Extended Details UI */}
                    <div className="space-y-6">
                        {/* Long Description */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Long Description</label>
                            <textarea rows={5} value={longDescription} onChange={e => setLongDescription(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" placeholder="Detailed product story..." />
                        </div>

                        {/* Ingredients */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Ingredients</label>
                                <button type="button" onClick={addIngredient} className="text-sm text-blue-600 font-bold flex items-center gap-1 hover:underline">
                                    <Plus size={16} /> Add Ingredient
                                </button>
                            </div>
                            <div className="space-y-4">
                                {ingredients.map((item, i) => (
                                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 relative group space-y-3">
                                        <button type="button" onClick={() => removeIngredient(i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"><X size={16} /></button>
                                        <input type="text" placeholder="Ingredient Name" value={item.name} onChange={e => updateIngredient(i, 'name', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-medium" />
                                        <textarea rows={2} placeholder="Description" value={item.description} onChange={e => updateIngredient(i, 'description', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Detailed Benefits</label>
                                <button type="button" onClick={addBenefit} className="text-sm text-blue-600 font-bold flex items-center gap-1 hover:underline">
                                    <Plus size={16} /> Add Benefit
                                </button>
                            </div>
                            <div className="space-y-4">
                                {benefits.map((item, i) => (
                                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 relative group space-y-3">
                                        <button type="button" onClick={() => removeBenefit(i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"><X size={16} /></button>
                                        <input type="text" placeholder="Benefit Title" value={item.title} onChange={e => updateBenefit(i, 'title', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-medium" />
                                        <textarea rows={2} placeholder="Description" value={item.description} onChange={e => updateBenefit(i, 'description', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Feeding Guide */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Feeding Guide Steps</label>
                                <button type="button" onClick={addFeedGuide} className="text-sm text-blue-600 font-bold flex items-center gap-1 hover:underline">
                                    <Plus size={16} /> Add Step
                                </button>
                            </div>
                            <div className="space-y-2">
                                {feedGuide.map((step, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input type="text" placeholder={`Step ${i + 1}`} value={step} onChange={e => updateFeedGuide(i, e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950" />
                                        <button type="button" onClick={() => removeFeedGuide(i)} className="text-red-500 p-2"><X size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">FAQs</label>
                                <button type="button" onClick={addFaq} className="text-sm text-blue-600 font-bold flex items-center gap-1 hover:underline">
                                    <Plus size={16} /> Add FAQ
                                </button>
                            </div>
                            <div className="space-y-4">
                                {faqs.map((item, i) => (
                                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 relative group space-y-3">
                                        <button type="button" onClick={() => removeFaq(i)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"><X size={16} /></button>
                                        <input type="text" placeholder="Question" value={item.question} onChange={e => updateFaq(i, 'question', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-medium" />
                                        <textarea rows={3} placeholder="Answer" value={item.answer} onChange={e => updateFaq(i, 'answer', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm" />
                                    </div>
                                ))}
                            </div>
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
                            <select value={petType} onChange={e => setPetType(e.target.value as 'dog' | 'cat' | 'both')} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
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
