/**
 * API 에러 처리 유틸리티
 * ProblemDetails 표준 기반 에러 매핑과 사용자 친화적 메시지 변환
 */

import { ApiError } from './client';

export interface ErrorInfo {
  title: string;
  message: string;
  actions?: string[];
  retryable: boolean;
}

/**
 * API 에러를 사용자 친화적 메시지로 변환
 */
export function mapApiError(error: unknown): ErrorInfo {
  // ApiError 인스턴스인 경우
  if (error instanceof ApiError) {
    return mapApiErrorToInfo(error);
  }

  // 일반 Error 인스턴스인 경우
  if (error instanceof Error) {
    return {
      title: '오류가 발생했습니다',
      message: error.message,
      retryable: true,
    };
  }

  // 기타 오류
  return {
    title: '알 수 없는 오류',
    message: '예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    retryable: true,
  };
}

function mapApiErrorToInfo(error: ApiError): ErrorInfo {
  const { status, details } = error;

  // 상태 코드별 기본 처리
  switch (status) {
    case 400:
      return {
        title: '잘못된 요청',
        message: details?.detail || '입력 정보를 확인해주세요.',
        actions: ['입력 내용 재확인'],
        retryable: false,
      };

    case 401:
      return {
        title: '인증 필요',
        message: 'GitHub 또는 Notion 연결이 필요합니다.',
        actions: ['OAuth 연결 확인'],
        retryable: false,
      };

    case 403:
      return {
        title: '권한 없음',
        message: '해당 리소스에 접근할 권한이 없습니다.',
        actions: ['권한 확인'],
        retryable: false,
      };

    case 404:
      return {
        title: '리소스를 찾을 수 없음',
        message: details?.detail || '요청한 리소스가 존재하지 않습니다.',
        retryable: false,
      };

    case 409:
      return {
        title: '충돌 발생',
        message: details?.detail || '이미 존재하는 리소스입니다.',
        retryable: false,
      };

    case 422:
      return {
        title: '유효성 검사 실패',
        message: details?.detail || '입력 데이터가 유효하지 않습니다.',
        actions: ['입력 데이터 재확인'],
        retryable: false,
      };

    case 429:
      return {
        title: '요청 한도 초과',
        message: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.',
        actions: ['잠시 후 재시도'],
        retryable: true,
      };

    case 500:
      return {
        title: '서버 오류',
        message: '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        actions: ['잠시 후 재시도', '관리자에게 문의'],
        retryable: true,
      };

    case 502:
    case 503:
    case 504:
      return {
        title: '서비스 일시 중단',
        message: '서비스가 일시적으로 이용 불가합니다. 잠시 후 다시 시도해주세요.',
        actions: ['잠시 후 재시도'],
        retryable: true,
      };

    default:
      return {
        title: `오류 (${status})`,
        message: details?.detail || error.message,
        retryable: status >= 500,
      };
  }
}

/**
 * 특정 도메인별 에러 메시지 매핑
 */
export function mapDomainError(error: ApiError): ErrorInfo | null {
  const { details } = error;
  
  if (!details?.type) return null;

  // 프로젝트 관련 에러
  if (details.type.includes('project')) {
    if (details.type.includes('not-found')) {
      return {
        title: '프로젝트를 찾을 수 없음',
        message: '해당 프로젝트가 존재하지 않거나 삭제되었습니다.',
        retryable: false,
      };
    }
    
    if (details.type.includes('invalid-repo')) {
      return {
        title: '잘못된 GitHub 레포지토리',
        message: 'GitHub 레포지토리 형식이 올바르지 않거나 접근 권한이 없습니다.',
        actions: ['레포지토리 경로 확인', 'GitHub 권한 확인'],
        retryable: false,
      };
    }
  }

  // 리서치 관련 에러
  if (details.type.includes('research')) {
    if (details.type.includes('insufficient-sources')) {
      return {
        title: '리서치 소스 부족',
        message: '충분한 권위 소스를 찾지 못했습니다. 검색 키워드를 조정하거나 범위를 확장해보세요.',
        actions: ['키워드 변경', '검색 범위 확장'],
        retryable: true,
      };
    }
  }

  // OAuth 관련 에러
  if (details.type.includes('oauth')) {
    if (details.type.includes('expired')) {
      return {
        title: 'OAuth 토큰 만료',
        message: 'GitHub 또는 Notion 연결이 만료되었습니다. 다시 연결해주세요.',
        actions: ['OAuth 재연결'],
        retryable: false,
      };
    }
  }

  return null;
}

/**
 * 네트워크 에러 감지 및 처리
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) {
    return error.message.includes('fetch') || error.message.includes('network');
  }
  
  return false;
}

/**
 * 재시도 가능한 에러인지 판단
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof ApiError) {
    const info = mapApiError(error);
    return info.retryable;
  }
  
  if (isNetworkError(error)) {
    return true;
  }
  
  return false;
}

/**
 * 에러 로깅 유틸리티
 */
export function logError(error: unknown, context?: string) {
  const errorInfo = mapApiError(error);
  
  console.error('[API Error]', {
    context,
    title: errorInfo.title,
    message: errorInfo.message,
    retryable: errorInfo.retryable,
    error,
  });
  
  // 프로덕션에서는 외부 로깅 서비스로 전송
  if (process.env.NODE_ENV === 'production') {
    // TODO: Sentry 등으로 전송
  }
}
