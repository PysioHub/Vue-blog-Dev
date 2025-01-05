import { getPostBySlug } from '@/lib/api';
import { Markdown } from '@/components/Markdown';
import { notFound } from 'next/navigation';

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
          <div className="flex gap-4 items-center">
            <time className="text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </time>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm"
                >
                  {tag}
                </span>
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
