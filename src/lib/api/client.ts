/**
 * Axios 기반 API 클라이언트
 * ProblemDetails 형식의 에러 처리와 상관 ID 지원
 */

import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError 
} from 'axios';

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
 * Axios 인스턴스 생성
 */
const createApiClient = (): AxiosInstance => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';
  
  const client = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request 인터셉터
  client.interceptors.request.use(
    (config) => {
      // 상관 ID 추가
      config.headers['X-Correlation-ID'] = crypto.randomUUID();
      
      // 디버그 로깅 (개발 환경에서만)
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          data: config.data,
        });
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response 인터셉터
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      // 성공 응답 로깅
      if (process.env.NODE_ENV === 'development') {
        console.log(`[API] ✅ ${response.status} ${response.config.url}`, response.data);
      }
      return response;
    },
    (error: AxiosError) => {
      const status = error.response?.status || 0;
      const correlationId = error.config?.headers?.['X-Correlation-ID'] as string;
      
      // 에러 로깅
      if (process.env.NODE_ENV === 'development') {
        console.error(`[API] ❌ ${status} ${error.config?.url}`, {
          error: error.response?.data,
          correlationId,
        });
      }

      // ProblemDetails 형식의 에러 변환
      if (error.response?.data) {
        const errorData = error.response.data as ProblemDetails;
        throw new ApiError(
          errorData.title || error.message,
          status,
          correlationId,
          errorData
        );
      }

      // 네트워크 에러 등
      throw new ApiError(
        error.message,
        status,
        correlationId
      );
    }
  );

  return client;
};

// API 클라이언트 인스턴스
export const apiClient = createApiClient();

/**
 * 기본 API 호출 함수
 */
export async function api<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.request<ApiResponse<T>>({
    url,
    ...config,
  });

  const result = response.data;
  
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
export function get<T>(url: string, params?: Record<string, any>) {
  return api<T>(url, {
    method: 'GET',
    params,
  });
}

/**
 * POST 요청
 */
export function post<T>(url: string, data?: unknown) {
  return api<T>(url, {
    method: 'POST',
    data,
  });
}

/**
 * PATCH 요청
 */
export function patch<T>(url: string, data?: unknown) {
  return api<T>(url, {
    method: 'PATCH',
    data,
  });
}

/**
 * DELETE 요청
 */
export function del<T>(url: string) {
  return api<T>(url, {
    method: 'DELETE',
  });
}

/**
 * PUT 요청
 */
export function put<T>(url: string, data?: unknown) {
  return api<T>(url, {
    method: 'PUT',
    data,
  });
}
