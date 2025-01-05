import { getPostBySlug } from '@/lib/api';
import { Markdown } from '@/components/Markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) {
    notFound();
  }

  try {
    const post = await getPostBySlug(id);
    if (!post) {
      notFound();
    }

    return (
      <article className="max-w-3xl mx-auto p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <time className="text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </time>
            <Link
              href={`/category/${post.category}`}
              className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {post.category}
            </Link>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </header>
        <div className="prose dark:prose-invert max-w-none">
          <Markdown content={post.content} />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
