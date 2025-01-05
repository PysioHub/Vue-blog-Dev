import { getAllPosts } from '@/lib/api';
import Link from 'next/link';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen p-8 pb-20 gap-8 sm:p-20">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">我的博客</h1>
        <p className="text-gray-600 dark:text-gray-400">分享技术与生活</p>
      </header>

      <main className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <Link href={`/post/${post.slug}`}>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
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
              <time className="text-sm text-gray-500 mt-4 block">
                {new Date(post.date).toLocaleDateString()}
              </time>
            </Link>
          </article>
        ))}
      </main>
    </div>
  );
}
