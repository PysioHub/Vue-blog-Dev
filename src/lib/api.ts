import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'docs');
const blogPostsDirectory = path.join(process.cwd(), 'src/app/post');

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: string;
  content: string;
  path: string; // 文章的完整路径
};

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set(posts.flatMap(post => post.tags));
  return Array.from(tags);
}

// 按分类获取文章
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.category === category);
}

// 按标签获取文章
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}

export async function getAllPosts(): Promise<Post[]> {
  const [docsPosts, blogPosts] = await Promise.all([
    getPostsFromDirectory(postsDirectory, ''),
    getPostsFromDirectory(blogPostsDirectory, '/post')
  ]);

  const allPosts = [...docsPosts, ...blogPosts];
  return allPosts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

async function getPostsFromDirectory(directory: string, urlPrefix: string): Promise<Post[]> {
  try {
    const entries = await fs.promises.readdir(directory, { withFileTypes: true });
    const posts = await Promise.all(
      entries
        .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
        .map(async entry => {
          const slug = entry.name.replace(/\.md$/, '');
          return await getPostBySlug(slug, directory, urlPrefix);
        })
    );
    return posts;
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string, directory?: string, urlPrefix: string = ''): Promise<Post> {
  const fullPath = path.join(directory || postsDirectory, `${slug}.md`);
  try {
    const fileContents = await fs.promises.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      tags: data.tags || [],
      category: data.category || 'Uncategorized',
      content,
      path: `${urlPrefix}/${slug}`,
    };
  } catch {
    throw new Error(`Post with slug ${slug} not found`);
  }
}
