import { getPostsByCategory } from '@/lib/api';
import { PostCard } from '@/components/PostCard';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categoryName = resolvedParams.name;

  if (!categoryName) {
    notFound();
  }

  try {
    const posts = await getPostsByCategory(categoryName);
    if (!posts.length) {
      notFound();
    }

    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
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
