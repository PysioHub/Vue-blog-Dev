import Link from 'next/link';
import type { Post } from '@/lib/api';

export function PostCard({ post }: { post: Post }) {
  return (
    <Link 
      href={post.path}
      className="block p-6 rounded-lg border hover:border-blue-500 transition-all"
    >
      <article>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
        <div className="flex items-center gap-4">
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {post.category}
          </span>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="text-sm text-gray-500 hover:text-blue-500"
              >
                #{tag}
              </Link>
            ))}
          </div>
          <time className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString()}
          </time>
        </div>
      </article>
    </Link>
  );
}
