import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

// 메인 컨테이너
export const markdownContainer = style({
  lineHeight: 1.6,
  color: vars.colors.foreground,
  fontSize: '16px',
  fontFamily: vars.fontFamily.sans,
});

// 헤딩 스타일
export const heading1 = style({
  fontSize: '2em',
  fontWeight: 700,
  lineHeight: 1.2,
  margin: '2em 0 0.5em 0',
  color: vars.colors.foreground,
});

export const heading2 = style({
  fontSize: '1.5em',
  fontWeight: 600,
  lineHeight: 1.3,
  margin: '1.8em 0 0.5em 0',
  color: vars.colors.foreground,
});

export const heading3 = style({
  fontSize: '1.25em',
  fontWeight: 600,
  lineHeight: 1.3,
  margin: '1.5em 0 0.5em 0',
  color: vars.colors.foreground,
});

export const heading4 = style({
  fontSize: '1.125em',
  fontWeight: 600,
  lineHeight: 1.4,
  margin: '1.2em 0 0.5em 0',
  color: vars.colors.foreground,
});

export const heading5 = style([heading4]);
export const heading6 = style([heading4]);

// 단락
export const paragraph = style({
  margin: '0 0 1em 0',
  lineHeight: 1.6,

  selectors: {
    '&:last-child': {
      marginBottom: 0,
    },
  },
});

// 강조
export const bold = style({
  fontWeight: 600,
});

export const italic = style({
  fontStyle: 'italic',
});

// 리스트
export const ul = style({
  margin: '0.5em 0 1em 0',
  paddingLeft: '1.5em',
  listStyleType: 'disc',
});

export const ol = style({
  margin: '0.5em 0 1em 0',
  paddingLeft: '1.5em',
  listStyleType: 'decimal',
});

export const li = style({
  margin: '0.25em 0',
  lineHeight: 1.6,
});

// 인라인 코드
export const inlineCode = style({
  backgroundColor: vars.colors.muted,
  borderRadius: '4px',
  color: '#e11d48',
  fontFamily: '"JetBrains Mono", "Fira Code", Menlo, Consolas, monospace',
  fontSize: '0.9em',
  padding: '0.15em 0.4em',
  fontWeight: 500,
  whiteSpace: 'pre-wrap', // ✅ 줄바꿈 허용
  wordBreak: 'break-word', // ✅ 모바일에서 잘림 방지
});

// 코드 블록 컨테이너
export const codeBlockContainer = style({
  margin: '1.5em 0',
  borderRadius: '8px',
  backgroundColor: vars.colors.card,
  border: `1px solid ${vars.colors.border}`,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  overflow: 'hidden',
  position: 'relative',
});

// 코드 헤더
export const codeHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 16px',
  backgroundColor: vars.colors.muted,
  borderBottom: `1px solid ${vars.colors.border}`,
});

export const languageBadge = style({
  fontFamily: '"JetBrains Mono", "Fira Code", Menlo, Consolas, monospace',
  fontSize: '11px',
  fontWeight: 500,
  textTransform: 'lowercase',
  backgroundColor: 'transparent',
  border: 'none',
  color: vars.colors.mutedForeground,
  padding: 0,
});

export const copyButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '4px 8px',
  fontSize: '12px',
  color: vars.colors.mutedForeground,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: vars.colors.accent,
    color: vars.colors.accentForeground,
  },

  ':focus': {
    outline: `2px solid ${vars.colors.ring}`,
    outlineOffset: '2px',
  },
});

// 코드 블록 프리
export const codeBlockPre = style({
  margin: 0,
  padding: '20px',
  overflow: 'auto',
  backgroundColor: 'transparent',
  fontFamily: '"JetBrains Mono", "Fira Code", Menlo, Consolas, monospace',
  fontSize: '13px',
  lineHeight: 1.6,
  whiteSpace: 'pre',
  '::-webkit-scrollbar': {
    height: '6px',
    width: '6px',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: vars.colors.border,
    borderRadius: '3px',
  },
});

export const codeBlockCode = style({
  fontFamily: '"JetBrains Mono", "Fira Code", Menlo, Consolas, monospace',
  fontSize: '14px',
  lineHeight: 1.6,
  whiteSpace: 'pre', // ✅ 줄바꿈 그대로
  display: 'block',
});
// 플로팅 복사 버튼
export const floatingCopyButton = style({
  position: 'absolute',
  top: '12px',
  right: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  opacity: 0.6,
  transition: 'opacity 0.2s ease, transform 0.1s ease',
  zIndex: 10,

  ':hover': {
    opacity: 1,
    transform: 'scale(1.05)',
  },

  ':focus': {
    outline: `2px solid ${vars.colors.ring}`,
    outlineOffset: '2px',
  },
});

// 인용구
export const blockquote = style({
  margin: '1em 0',
  padding: '0 0 0 1em',
  borderLeft: `3px solid ${vars.colors.border}`,
  color: vars.colors.mutedForeground,
  fontStyle: 'italic',
});

// 수평선
export const hr = style({
  margin: '2em 0',
  border: 'none',
  borderTop: `1px solid ${vars.colors.border}`,
});

// 테이블
export const tableWrapper = style({
  overflowX: 'auto',
  margin: '1em 0',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '14px',
});

export const th = style({
  border: `1px solid ${vars.colors.border}`,
  padding: '8px 12px',
  textAlign: 'left',
  backgroundColor: vars.colors.muted,
  fontWeight: 600,
});

export const td = style({
  border: `1px solid ${vars.colors.border}`,
  padding: '8px 12px',
  textAlign: 'left',
});

// 전역 스타일
globalStyle(`${ul} li p, ${ol} li p`, {
  margin: 0,
});

globalStyle(`${codeBlockPre}::-webkit-scrollbar-thumb:hover`, {
  backgroundColor: vars.colors.mutedForeground,
});

// Prism.js 토큰 스타일
globalStyle('.token.comment, .token.prolog, .token.doctype, .token.cdata', {
  color: vars.colors.mutedForeground,
  fontStyle: 'italic',
});

globalStyle('.token.punctuation', {
  color: vars.colors.foreground,
});

globalStyle('.token.property, .token.tag, .token.constant, .token.symbol, .token.deleted', {
  color: '#f92672',
});

globalStyle('.token.boolean, .token.number', {
  color: '#ae81ff',
});

globalStyle(
  '.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted',
  {
    color: '#a6e22e',
  }
);

globalStyle('.token.operator, .token.entity, .token.url', {
  color: vars.colors.foreground,
});

globalStyle('.language-css .token.string, .style .token.string, .token.variable', {
  color: vars.colors.foreground,
});

globalStyle('.token.atrule, .token.attr-value, .token.function, .token.class-name', {
  color: '#e6db74',
});

globalStyle('.token.keyword', {
  color: '#66d9ef',
});

globalStyle('.token.regex, .token.important', {
  color: '#fd971f',
});

// 모바일 최적화
globalStyle(`${markdownContainer}`, {
  '@media': {
    '(max-width: 768px)': {
      fontSize: '14px',
    },
  },
});

globalStyle(`${codeBlockPre}`, {
  '@media': {
    '(max-width: 768px)': {
      padding: '12px',
      fontSize: '13px',
    },
  },
});

globalStyle(`${codeHeader}`, {
  '@media': {
    '(max-width: 768px)': {
      padding: '6px 10px',
    },
  },
});

globalStyle(`${heading1}`, {
  '@media': {
    '(max-width: 768px)': {
      fontSize: '1.8em',
    },
  },
});

globalStyle(`${heading2}`, {
  '@media': {
    '(max-width: 768px)': {
      fontSize: '1.4em',
    },
  },
});

globalStyle(`${heading3}`, {
  '@media': {
    '(max-width: 768px)': {
      fontSize: '1.2em',
    },
  },
});

globalStyle('pre[class*="language-"]', {
  whiteSpace: 'pre !important',
  overflowX: 'auto',
});
