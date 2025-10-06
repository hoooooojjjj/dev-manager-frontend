import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}

interface ProblemDetails {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: ProblemDetails
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Axios 인스턴스
 */
const createApiClient = (): AxiosInstance => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3333';

  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request 인터셉터
  client.interceptors.request.use(
    (config) => {
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

      // 에러 로깅
      if (process.env.NODE_ENV === 'development') {
        console.error(`[API] ❌ ${status} ${error.config?.url}`, {
          error: error.response?.data,
        });
      }

      // ProblemDetails 형식의 에러 변환
      if (error.response?.data) {
        const errorData = error.response.data as ProblemDetails;
        throw new ApiError(errorData.title || error.message, status, errorData);
      }

      // 네트워크 에러 등
      throw new ApiError(error.message, status);
    }
  );

  return client;
};

// API 클라이언트 인스턴스
export const apiClient = createApiClient();

/**
 * 기본 API 호출 함수
 */
export async function api<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.request<ApiResponse<T>>({
    url,
    ...config,
  });

  return response as T;
}

export function get<T>(
  url: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  return api<T>(url, {
    method: 'GET',
    params,
  });
}

export function post<T>(url: string, data?: unknown) {
  return api<T>(url, {
    method: 'POST',
    data,
  });
}

export function patch<T>(url: string, data?: unknown) {
  return api<T>(url, {
    method: 'PATCH',
    data,
  });
}

export function del<T>(url: string) {
  return api<T>(url, {
    method: 'DELETE',
  });
}

export function put<T>(url: string, data?: unknown) {
  return api<T>(url, {
    method: 'PUT',
    data,
  });
}
