'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import { Copy, Check } from 'lucide-react';
import { Badge } from '@/components/ui/components/Badge';
import * as S from './index.css';
import { sourceCodePro } from '@/utils/font';
import { extractCodeText } from './utils';

interface MarkdownRendererProps {
  content: string;
  showCodeHeader?: boolean;
}

export default function MarkdownRenderer({
  content,
  showCodeHeader = false,
}: MarkdownRendererProps) {
  return (
    <div className={S.markdownContainer}>
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
          // 코드 블록
          pre: ({ children }) => {
            const child = React.Children.only(children) as React.ReactElement<{
              className?: string;
              children: React.ReactNode;
            }>;

            return (
              <CodeBlock className={child.props.className} showHeader={showCodeHeader}>
                {child.props.children}
              </CodeBlock>
            );
          },

          // 인라인 코드
          code: ({ children, className, ...props }) => {
            // 블록 코드 (``` ... ```)
            if (className?.startsWith('language-')) {
              return (
                <code className={`${className} ${S.codeBlockCode}`} {...props}>
                  {children}
                </code>
              );
            }

            // 인라인 코드 (`...`)
            return (
              <code className={S.inlineCode} {...props}>
                {children}
              </code>
            );
          },

          // 헤딩
          h1: ({ children, ...props }) => (
            <h1 className={S.heading1} {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className={S.heading2} {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className={S.heading3} {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className={S.heading4} {...props}>
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 className={S.heading5} {...props}>
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 className={S.heading6} {...props}>
              {children}
            </h6>
          ),

          // 단락
          p: ({ children, ...props }) => (
            <p className={S.paragraph} {...props}>
              {children}
            </p>
          ),

          // 리스트
          ul: ({ children, ...props }) => (
            <ul className={S.ul} {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className={S.ol} {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className={S.li} {...props}>
              {children}
            </li>
          ),

          // 강조
          strong: ({ children, ...props }) => (
            <strong className={S.bold} {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className={S.italic} {...props}>
              {children}
            </em>
          ),

          // 인용구
          blockquote: ({ children, ...props }) => (
            <blockquote className={S.blockquote} {...props}>
              {children}
            </blockquote>
          ),

          // 수평선
          hr: ({ ...props }) => <hr className={S.hr} {...props} />,

          // 테이블
          table: ({ children, ...props }) => (
            <div className={S.tableWrapper}>
              <table className={S.table} {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
          tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
          tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
          th: ({ children, ...props }) => (
            <th className={S.th} {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className={S.td} {...props}>
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

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string | undefined;
  showHeader?: boolean;
}

function CodeBlock({ children, className, showHeader = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const language =
    className?.replace('language-', '').replace('code-highlight', '') || 'typescript';

  const code = extractCodeText(children);

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
    <div className={S.codeBlockContainer}>
      {showHeader && (
        <div className={S.codeHeader}>
          <Badge variant="secondary" className={S.languageBadge}>
            {language}
          </Badge>
          <button
            onClick={handleCopy}
            className={S.copyButton}
            aria-label={copied ? '복사됨!' : '코드 복사'}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? '복사됨!' : '복사'}</span>
          </button>
        </div>
      )}

      <pre className={`${S.codeBlockPre} ${className || ''}`}>
        <code className={`${S.codeBlockCode} ${sourceCodePro.className}`}>{children}</code>
      </pre>
    </div>
  );
}
