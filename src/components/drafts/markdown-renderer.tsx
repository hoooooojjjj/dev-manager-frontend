'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import './markdown-renderer.css';

interface MarkdownRendererProps {
  content: string;
  showCodeHeader?: boolean;
}

interface CodeBlockProps {
  children: string;
  className?: string | undefined;
  showHeader?: boolean;
}

function CodeBlock({ children, className, showHeader = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // 언어 추출 (className="language-typescript" 형태)
  const language = className?.replace('language-', '') || 'typescript';
  const code = children.replace(/\n$/, ''); // 마지막 개행 제거

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="notion-code-block">
      {showHeader && (
        <div className="notion-code-header">
          <Badge variant="secondary" className="notion-language-badge">
            {language}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="notion-copy-button"
            aria-label={copied ? '복사됨!' : '코드 복사'}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="ml-1">{copied ? '복사됨!' : '복사'}</span>
          </Button>
        </div>
      )}
      <pre className={`notion-pre ${className || ''}`}>
        <code className="notion-code">{children}</code>
      </pre>
    </div>
  );
}

export function MarkdownRenderer({ content, showCodeHeader = false }: MarkdownRendererProps) {
  return (
    <div className="notion-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [
            rehypePrism,
            {
              ignoreMissing: true,
              defaultLanguage: 'typescript',
            },
          ],
        ]}
        components={{
          // 코드 블록 커스텀 렌더링
          pre: ({ children, ...props }) => {
            const child = React.Children.only(children) as React.ReactElement<{
              className?: string;
              children: string;
            }>;
            if (child?.type === 'code') {
              return (
                <CodeBlock className={child.props.className} showHeader={showCodeHeader}>
                  {child.props.children}
                </CodeBlock>
              );
            }
            return <pre {...props}>{children}</pre>;
          },

          // 인라인 코드
          code: ({ children, className, ...props }) => {
            // pre > code는 위에서 처리됨
            if (className?.startsWith('language-')) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            // 인라인 코드
            return (
              <code className="notion-inline-code" {...props}>
                {children}
              </code>
            );
          },

          // 헤딩
          h1: ({ children, ...props }) => (
            <h1 className="notion-h1" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="notion-h2" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="notion-h3" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="notion-h4" {...props}>
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 className="notion-h5" {...props}>
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 className="notion-h6" {...props}>
              {children}
            </h6>
          ),

          // 단락
          p: ({ children, ...props }) => (
            <p className="notion-paragraph" {...props}>
              {children}
            </p>
          ),

          // 리스트
          ul: ({ children, ...props }) => (
            <ul className="notion-ul" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="notion-ol" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="notion-li" {...props}>
              {children}
            </li>
          ),

          // 강조
          strong: ({ children, ...props }) => (
            <strong className="notion-bold" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="notion-italic" {...props}>
              {children}
            </em>
          ),

          // 인용구
          blockquote: ({ children, ...props }) => (
            <blockquote className="notion-blockquote" {...props}>
              {children}
            </blockquote>
          ),

          // 수평선
          hr: ({ ...props }) => <hr className="notion-hr" {...props} />,

          // 테이블
          table: ({ children, ...props }) => (
            <div className="notion-table-wrapper">
              <table className="notion-table" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="notion-thead" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="notion-tbody" {...props}>
              {children}
            </tbody>
          ),
          tr: ({ children, ...props }) => (
            <tr className="notion-tr" {...props}>
              {children}
            </tr>
          ),
          th: ({ children, ...props }) => (
            <th className="notion-th" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="notion-td" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
