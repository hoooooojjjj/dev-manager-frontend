import { isValidElement, ReactNode } from 'react';

// 코드 블록 텍스트 string으로 변환하는 함수
export function extractCodeText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);

  if (Array.isArray(node)) {
    return node.map(extractCodeText).join('');
  }

  if (isValidElement(node)) {
    return extractCodeText((node.props as { children?: ReactNode })?.children);
  }

  return '';
}
