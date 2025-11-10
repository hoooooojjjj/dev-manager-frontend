import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { getAccessToken, setAccessToken, setRefreshToken, clearTokens } from '@/utils/token';

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

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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
    (config: InternalAxiosRequestConfig) => {
      // Access Token 자동 추가
      const token = getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

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
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      const status = error.response?.status || 0;

      // 401 에러이고 아직 재시도하지 않은 경우
      if (status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // 이미 토큰 갱신 중이면 큐에 추가
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return client(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Refresh Token으로 새 Access Token 발급
          const { getRefreshToken } = await import('@/utils/token');
          const refreshToken = getRefreshToken();

          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await axios.post<{ accessToken: string; expiresIn: number }>(
            `${baseURL}/auth/refresh`,
            { refreshToken }
          );

          const { accessToken } = response.data;

          // 새 토큰 저장
          setAccessToken(accessToken);

          // 큐에 있는 요청들 처리
          processQueue(null, accessToken);

          // 원래 요청 재시도
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return client(originalRequest);
        } catch (refreshError) {
          // Refresh 실패 시 로그아웃 처리
          processQueue(refreshError as Error, null);
          clearTokens();

          // 로그인 페이지로 리다이렉트 (클라이언트 사이드에서만)
          if (typeof window !== 'undefined') {
            window.location.href = '/';
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

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
