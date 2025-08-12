/**
 * API 클라이언트 유틸리티
 * ProblemDetails 형식의 에러 처리와 상관 ID 지원
 */

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  correlationId: string;
}

interface ProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  correlationId?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public correlationId?: string,
    public details?: ProblemDetails
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * 기본 API 호출 함수
 */
export async function api<T>(
  path: string, 
  init?: RequestInit
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';
  const url = path.startsWith('http') ? path : `${baseUrl}${path}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    let errorData: ProblemDetails | undefined;
    
    try {
      errorData = await response.json();
    } catch {
      // JSON 파싱 실패 시 기본 에러 처리
    }

    throw new ApiError(
      errorData?.title || response.statusText,
      response.status,
      errorData?.correlationId,
      errorData
    );
  }

  const result: ApiResponse<T> = await response.json();
  
  if (result.error) {
    throw new ApiError(
      result.error,
      response.status,
      result.correlationId
    );
  }

  return result.data as T;
}

/**
 * GET 요청
 */
export function get<T>(path: string, params?: Record<string, string>) {
  const url = new URL(path, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  
  return api<T>(url.pathname + url.search);
}

/**
 * POST 요청
 */
export function post<T>(path: string, data?: unknown) {
  return api<T>(path, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCH 요청
 */
export function patch<T>(path: string, data?: unknown) {
  return api<T>(path, {
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE 요청
 */
export function del<T>(path: string) {
  return api<T>(path, {
    method: 'DELETE',
  });
}
