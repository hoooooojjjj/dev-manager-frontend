import { get, post } from '@/api/client';
import type { AuthResponse, RefreshResponse, User } from './responses';
import type { GithubCallbackRequest, RefreshTokenRequest } from './requests';

/**
 * GitHub OAuth Callback
 */
export async function githubCallback(request: GithubCallbackRequest): Promise<AuthResponse> {
  const response = await post<{ data: AuthResponse }>('/api/v1/auth/github/callback', request);

  return response.data;
}

/**
 * Access Token Refresh
 */
export async function refreshAccessToken(request: RefreshTokenRequest): Promise<RefreshResponse> {
  const response = await post<{ data: RefreshResponse }>('/api/v1/auth/refresh', request);
  return response.data;
}

/**
 * Logout
 */
export async function logout(): Promise<{ message: string }> {
  const response = await post<{ data: { message: string } }>('/api/v1/auth/logout');
  return response.data;
}

/**
 * Get Current User
 */
export async function getCurrentUser(): Promise<User> {
  const response = await get<{ data: User }>('/api/v1/auth/me');
  return response.data;
}
