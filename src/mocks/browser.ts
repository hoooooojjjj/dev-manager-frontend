/**
 * MSW 브라우저 설정
 * 개발 환경에서 API 모킹을 위한 Service Worker 설정
 */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// 개발 환경에서만 MSW 시작
export async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  console.log('[MSW] Enabling API mocking...');
  
  await worker.start({
    onUnhandledRequest: 'warn',
    serviceWorker: {
      // Service Worker 스크립트 위치
      url: '/mockServiceWorker.js',
    },
  });
  
  console.log('[MSW] ✅ API mocking enabled');
}
