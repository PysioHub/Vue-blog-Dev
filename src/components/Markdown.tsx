import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        code: ({ inline, className, children, ...props }: CodeBlockProps) => {
          if (!children) return null;
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
