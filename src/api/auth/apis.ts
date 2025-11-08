import { get, post } from '@/api/client';
import type { AuthResponse, RefreshResponse, User } from './responses.dto';
import type { GithubCallbackRequest, RefreshTokenRequest } from './requests.dto';

/**
 * GitHub OAuth Callback
 */
export async function githubCallback(request: GithubCallbackRequest): Promise<AuthResponse> {
  const response = await post<{ data: AuthResponse }>('/auth/github/callback', request);

  return response.data;
}

/**
 * Access Token Refresh
 */
export async function refreshAccessToken(request: RefreshTokenRequest): Promise<RefreshResponse> {
  const response = await post<{ data: RefreshResponse }>('/auth/refresh', request);
  return response.data;
}

/**
 * Logout
 */
export async function logout(): Promise<{ message: string }> {
  const response = await post<{ data: { message: string } }>('/auth/logout');
  return response.data;
}

/**
 * Get Current User
 */
export async function getCurrentUser(): Promise<User> {
  const response = await get<{ data: User }>('/auth/me');
  return response.data;
}
