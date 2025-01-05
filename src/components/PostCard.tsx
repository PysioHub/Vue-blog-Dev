import Link from 'next/link';
import type { Post } from '@/lib/api';

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="block p-6 rounded-lg border hover:border-blue-500 transition-all">
      <Link href={post.path} className="block mb-4">
        <article>
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
        </article>
      </Link>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={`/category/${post.category}`}
          className="text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-3 py-1 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          {post.category}
        </Link>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <time className="text-sm text-gray-500">
          {new Date(post.date).toLocaleDateString()}
        </time>
      </div>
    </div>
  );
}
