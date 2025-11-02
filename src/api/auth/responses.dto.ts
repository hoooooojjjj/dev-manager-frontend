import { z } from "zod";

/**
 * 사용자 정보 스키마
 */
export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  userName: z.string(),
  avatarUrl: z.string().nullable(),
  githubId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;

/**
 * 인증 응답 스키마 (로그인 시)
 */
export const AuthResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

/**
 * Refresh Token 응답 스키마
 */
export const RefreshResponseSchema = z.object({
  accessToken: z.string(),
  expiresIn: z.number(),
});

export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;
