/**
 * 인증 관련 API 함수들
 * OAuth 상태 확인, 연결, 해제 등
 */

import { get, post } from './client';

export interface OAuthStatus {
  github: boolean;
  notion: boolean;
}

export interface OAuthConnectResponse {
  connected: boolean;
  provider: string;
  redirectUrl?: string;
}

/**
 * OAuth 상태 조회
 */
export function getOAuthStatus(): Promise<OAuthStatus> {
  return get<OAuthStatus>('/auth/status');
}

/**
 * OAuth 연결
 */
export function connectOAuth(provider: 'github' | 'notion'): Promise<OAuthConnectResponse> {
  return post<OAuthConnectResponse>(`/auth/connect/${provider}`);
}

/**
 * OAuth 연결 해제
 */
export function disconnectOAuth(provider: 'github' | 'notion'): Promise<{ success: boolean }> {
  return post<{ success: boolean }>(`/auth/disconnect/${provider}`);
}
