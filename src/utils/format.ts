import { clsx, type ClassValue } from 'clsx';

/**
 * 클래스 조합 (Vanilla Extract 환경용)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * 상대 시간 포맷팅 (몇 분 전, 몇 시간 전 등)
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return '방금 전';
  }
}
