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
  const fileNames = await fs.promises.readdir(postsDirectory);
  const allPosts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return await getPostBySlug(slug);
      })
  );

  return allPosts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  try {
    const fileContents = await fs.promises.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      tags: data.tags || [],
      content,
    };
  } catch {
    throw new Error(`Post with slug ${slug} not found`);
  }
}
