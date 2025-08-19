import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

// 메인 컨테이너
export const markdownContainer = style({
  lineHeight: 1.6,
  color: vars.colors.foreground,
  fontSize: '16px',
  fontFamily: vars.fontFamily.sans,
  minWidth: 0, // ✅ 그리드/플렉스 컨텍스트에서 가로 오버플로우 허용
});

export const codeScrollArea = style({
  position: 'relative',
  overflowX: 'auto', // 가로 스크롤 책임
  overflowY: 'hidden',
  width: '100%', // 부모 기준 꽉 채움
  maxWidth: '100%',
  WebkitOverflowScrolling: 'touch',

  // 가로 스크롤바 스타일
  selectors: {
    '&::-webkit-scrollbar': { height: '8px' },
    '&::-webkit-scrollbar-thumb': {
      background: vars.colors.border,
      borderRadius: '4px',
    },
  },
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

// 리스트 아이템 내 단락 스타일
globalStyle(`${ul} li p, ${ol} li p`, {
  margin: 0,
});

// 인라인 코드
export const inlineCode = style({
  marginRight: '0.25em',
  marginLeft: '0.25em',
  backgroundColor: vars.colors.muted,
  border: 'none',
  borderRadius: '4px',
  color: 'hsl(0 84.2% 60.2%)',
  fontFamily: '"JetBrains Mono", "Fira Code", Menlo, Consolas, "Courier New", monospace',
  fontSize: '0.9em',
  padding: '0.15em 0.4em',
  fontWeight: 500,
  display: 'inline-block',
  verticalAlign: 'baseline',
});

export const codeBlockContainer = style({
  margin: '1.5em 0',
  borderRadius: '8px',
  backgroundColor: vars.colors.card,
  border: `1px solid ${vars.colors.border}`,
  boxShadow: '0 2px 8px rgba(0,0,0,.06)',
  overflow: 'hidden', // 카드 바깥 삐져나옴 방지
});

export const scrollFadeLeft = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: '24px',
  background: 'linear-gradient(to right, rgba(0,0,0,0.05), transparent)',
  pointerEvents: 'none',
});
export const scrollFadeRight = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: '24px',
  background: 'linear-gradient(to left, rgba(0,0,0,0.05), transparent)',
  pointerEvents: 'none',
});

/** 헤더(언어/복사 버튼) 그대로 사용 가능 */
export const codeHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 16px',
  backgroundColor: vars.colors.muted,
  borderBottom: `1px solid ${vars.colors.border}`,
  fontSize: '12px',
});

export const codeBlockPre = style({
  display: 'inline-block', // ✅ 내용만큼 확장
  minWidth: 'auto',
  whiteSpace: 'pre',
  overflowX: 'visible', // 스크롤은 부모가 담당
});

export const languageBadge = style({
  fontFamily: '"JetBrains Mono", "Fira Code", Menlo, Consolas, "Courier New", monospace',
  fontSize: '11px',
  fontWeight: 500,
  textTransform: 'lowercase',
  backgroundColor: 'transparent',
  border: 'none',
  color: vars.colors.mutedForeground,
  padding: 0,
});

export const copyButton = style({
  fontSize: '12px',
  padding: '4px 8px',
  height: 'auto',
  color: vars.colors.mutedForeground,
  background: 'transparent',
  border: 'none',
  borderRadius: '3px',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  ':hover': {
    backgroundColor: vars.colors.accent,
    color: vars.colors.accentForeground,
  },

  ':focus': {
    outline: `2px solid ${vars.colors.ring}`,
    outlineOffset: '2px',
  },
});

/** code는 별도 줄바꿈/폰트만 유지 */
export const codeBlockCode = style({
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  background: 'transparent',
});

/** 헤더가 없을 때 우상단에 뜨는 복사 버튼 */
export const floatingCopyButton = style({
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: 'rgba(0,0,0,.6)',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  padding: '6px',
  cursor: 'pointer',
  opacity: 0.6,
  transition: 'opacity .2s ease, transform .1s ease',
  zIndex: 1,
  '@media': {
    '(prefers-color-scheme: dark)': {
      backgroundColor: 'rgba(0,0,0,.5)',
    },
  },
  selectors: {
    '&:hover': { opacity: 1, transform: 'scale(1.05)' },
    '&:focus': { outline: `2px solid ${vars.colors.ring}`, outlineOffset: '2px' },
  },
});

// 스크롤바 호버 스타일
globalStyle(`${codeBlockPre}::-webkit-scrollbar-thumb:hover`, {
  backgroundColor: vars.colors.mutedForeground,
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

// Prism.js 토큰 스타일 전역 설정
globalStyle('.token.comment, .token.prolog, .token.doctype, .token.cdata', {
  color: vars.colors.mutedForeground,
  fontStyle: 'italic',
});

globalStyle('pre[class*="language-"]', {
  whiteSpace: 'pre !important',
  overflowX: 'auto',
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
