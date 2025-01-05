import { getAllTags } from '@/lib/api';
import Link from 'next/link';

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">所有标签</h1>
      <div className="flex flex-wrap gap-4">
        {tags.map(tag => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
