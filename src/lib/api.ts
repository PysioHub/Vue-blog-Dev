import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'docs');

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
};

export async function getAllPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      return getPostBySlug(slug);
    });

  return allPosts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags || [],
    content,
  };
}
