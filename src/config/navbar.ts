export interface NavItem {
  text: string;
  link?: string;
  icon?: string;
  children?: NavItem[];
}

export const navbar: NavItem[] = [
  {
    text: "首页",
    link: "/",
    icon: "home",
  },
  {
    text: "分类",
    icon: "category",
    children: [
      {
        text: "技术",
        link: "/category/tech",
      },
      {
        text: "生活",
        link: "/category/life",
      },
    ],
  },
  {
    text: "关于",
    link: "/about",
    icon: "info",
  },
  {
    text: "GitHub",
    link: "https://github.com/PysioHub/Vue-blog-Dev/tree/nextjs",
    icon: "github",
  },
];
