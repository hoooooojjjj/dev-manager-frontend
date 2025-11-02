import { z } from "zod";

/**
 * OAuth 환경 enum
 */
export const OAuthEnvironment = z.enum(["development", "production"]);
export type OAuthEnvironment = z.infer<typeof OAuthEnvironment>;

/**
 * GitHub OAuth 콜백 요청 스키마
 */
export const GithubCallbackRequestSchema = z.object({
  code: z.string().min(1, "Authorization code is required"),
  environment: OAuthEnvironment,
});

export type GithubCallbackRequest = z.infer<typeof GithubCallbackRequestSchema>;

/**
 * Refresh Token 요청 스키마
 */
export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
