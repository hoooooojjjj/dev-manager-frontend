import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/**
 * Access Token을 쿠키에 저장
 */
export function setAccessToken(token: string): void {
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    expires: 1 / 96, // 15분 (1/96일)
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

/**
 * Refresh Token을 쿠키에 저장
 */
export function setRefreshToken(token: string): void {
  Cookies.set(REFRESH_TOKEN_KEY, token, {
    expires: 7, // 7일
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

/**
 * Access Token 가져오기
 */
export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

/**
 * Refresh Token 가져오기
 */
export function getRefreshToken(): string | undefined {
  return Cookies.get(REFRESH_TOKEN_KEY);
}

/**
 * Access Token 삭제
 */
export function removeAccessToken(): void {
  Cookies.remove(ACCESS_TOKEN_KEY);
}

/**
 * Refresh Token 삭제
 */
export function removeRefreshToken(): void {
  Cookies.remove(REFRESH_TOKEN_KEY);
}

/**
 * 모든 토큰 삭제 (로그아웃)
 */
export function clearTokens(): void {
  removeAccessToken();
  removeRefreshToken();
}

/**
 * 토큰이 존재하는지 확인
 */
export function hasTokens(): boolean {
  return !!getAccessToken() && !!getRefreshToken();
}
