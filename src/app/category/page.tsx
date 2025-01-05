import { getAllCategories } from '@/lib/api';
import Link from 'next/link';

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">所有分类</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(category => (
          <Link
            key={category}
            href={`/category/${category}`}
            className="p-4 border rounded-lg hover:border-blue-500 transition-all"
          >
            <h2 className="text-xl font-semibold">{category}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
