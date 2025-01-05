import { getPostsByCategory } from '@/lib/api';
import { PostCard } from '@/components/PostCard';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ name: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    const resolvedParams = await params;
    const decodedName = decodeURIComponent(resolvedParams.name);
    
    if (!decodedName) {
      notFound();
    }

    const posts = await getPostsByCategory(decodedName);
    
    if (!posts.length) {
      notFound();
    }

    return (
      <div className="max-w-4xl mx-auto p-8 animate-fade-up">
        <h1 className="text-3xl font-bold mb-8">{decodedName}</h1>
        <div className="grid gap-8">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
