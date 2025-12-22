'use client';

import { useEffect, useState, use } from 'react';
import BlogEditor from '@/components/admin/BlogEditor';
import { getBlogById } from '@/lib/blog-utils';
import { BlogPost } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) return;
            const data = await getBlogById(id);
            if (data) {
                setBlog(data);
            } else {
                alert('Blog not found');
                router.push('/admin/blogs');
            }
            setLoading(false);
        };
        fetchBlog();
    }, [id, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    if (!blog) return null;

    return <BlogEditor initialData={blog} isEditing />;
}
