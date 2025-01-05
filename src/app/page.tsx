import { getAllPosts } from '@/lib/api';
import Link from 'next/link';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="flex-grow container mx-auto px-4 md:px-6">
      <section className="py-12 md:py-24 lg:py-32 xl:py-48 animate-fade-up">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-500">
            Pysio&apos;s Home
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-500 dark:text-gray-400 tracking-tight pl-1">
            一个温暖的家
          </p>
        </div>
      </section>

      <section className="animate-fade-up" style={{ '--tw-animation-delay': '200ms' } as React.CSSProperties}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link 
              key={post.slug} 
              href={`/post/${post.slug}`}
              className="group relative rounded-lg border p-6 hover:border-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <article>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <time className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </time>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
