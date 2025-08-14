/**
 * 포맷팅 유틸리티 함수들
 * 날짜, 시간, 텍스트, 파일 크기 등 표시용 변환
 */

import { clsx, type ClassValue } from "clsx";

/**
 * 클래스 조합 (Vanilla Extract 환경용)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * 날짜 포맷팅 (한국 시간대)
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
    ...options,
  };

  return new Intl.DateTimeFormat('ko-KR', defaultOptions).format(dateObj);
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

/**
 * 파일 크기 포맷팅
 */
export function formatFileSize(bytes: number): string {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  
  return `${size.toFixed(1)} ${sizes[i]}`;
}

/**
 * 숫자 포맷팅 (천 단위 콤마)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num);
}

/**
 * 백분율 포맷팅
 */
export function formatPercentage(num: number, decimals = 1): string {
  return `${(num * 100).toFixed(decimals)}%`;
}

/**
 * 텍스트 줄임 처리
 */
export function truncateText(text: string, maxLength = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * 카멜케이스를 사람이 읽기 쉬운 형태로 변환
 */
export function camelToTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * 슬러그 생성 (URL 친화적 문자열)
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 특수 문자 제거
    .replace(/[\s_-]+/g, '-') // 공백과 언더스코어를 하이픈으로
    .replace(/^-+|-+$/g, ''); // 시작과 끝의 하이픈 제거
}

/**
 * 이메일 마스킹
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;
  
  const maskedUsername = username.slice(0, 2) + '*'.repeat(username.length - 2);
  return `${maskedUsername}@${domain}`;
}

/**
 * GitHub 레포지토리 이름에서 owner/repo 추출
 */
export function parseGitHubRepo(repo: string): { owner: string; name: string } | null {
  const match = repo.match(/^([\w.-]+)\/([\w.-]+)$/);
  if (!match || !match[1] || !match[2]) return null;
  
  return {
    owner: match[1],
    name: match[2],
  };
}

/**
 * 인용 링크 타입 추출
 */
export function parseCitationType(citation: string): {
  type: 'code' | 'pr' | 'doc' | 'web' | 'job' | 'unknown';
  url: string;
} {
  if (citation.startsWith('code://')) {
    return { type: 'code', url: citation.replace('code://', '') };
  } else if (citation.startsWith('pr://')) {
    return { type: 'pr', url: citation.replace('pr://', '') };
  } else if (citation.startsWith('doc://')) {
    return { type: 'doc', url: citation.replace('doc://', '') };
  } else if (citation.startsWith('web://')) {
    return { type: 'web', url: citation.replace('web://', '') };
  } else if (citation.startsWith('job://')) {
    return { type: 'job', url: citation.replace('job://', '') };
  }
  
  return { type: 'unknown', url: citation };
}

/**
 * 상태에 따른 색상 클래스 반환
 */
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    idle: 'bg-gray-100 text-gray-800',
    submitting: 'bg-blue-100 text-blue-800',
    queued: 'bg-yellow-100 text-yellow-800',
    collecting: 'bg-orange-100 text-orange-800',
    researching: 'bg-purple-100 text-purple-800',
    drafting: 'bg-indigo-100 text-indigo-800',
    review: 'bg-cyan-100 text-cyan-800',
    publishing: 'bg-emerald-100 text-emerald-800',
    done: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
}
