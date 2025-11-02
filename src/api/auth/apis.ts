import { get, post } from '@/api/client';
import type { AuthResponse, RefreshResponse, User } from './responses';
import type { GithubCallbackRequest, RefreshTokenRequest } from './requests';

/**
 * GitHub OAuth Callback
 */
export async function githubCallback(request: GithubCallbackRequest): Promise<AuthResponse> {
  return post<AuthResponse>('/api/v1/auth/github/callback', request);
}

/**
 * Access Token Refresh
 */
export async function refreshAccessToken(request: RefreshTokenRequest): Promise<RefreshResponse> {
  return post<RefreshResponse>('/api/v1/auth/refresh', request);
}

/**
 * Logout
 */
export async function logout(): Promise<{ message: string }> {
  return post<{ message: string }>('/api/v1/auth/logout');
}

/**
 * Get Current User
 */
export async function getCurrentUser(): Promise<User> {
  return get<User>('/api/v1/auth/me');
}
