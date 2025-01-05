import { getPostsByTag } from '@/lib/api';
import { PostCard } from '@/components/PostCard';
import { notFound } from 'next/navigation';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  try {
    const resolvedParams = await params;
    const decodedTag = decodeURIComponent(resolvedParams.tag);
    
    if (!decodedTag) {
      notFound();
    }

    const posts = await getPostsByTag(decodedTag);
    
    if (!posts.length) {
      notFound();
    }

    return (
      <div className="max-w-4xl mx-auto p-8 animate-fade-up">
        <h1 className="text-3xl font-bold mb-8">#{decodedTag}</h1>
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
