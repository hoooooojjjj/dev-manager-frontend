/**
 * MSW 초기화
 * 클라이언트 사이드에서 MSW를 조건부로 활성화
 */

export async function initMocks() {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 MSW를 사용하지 않음
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    const { enableMocking } = await import('@/mocks/browser');
    await enableMocking();
  }
}
