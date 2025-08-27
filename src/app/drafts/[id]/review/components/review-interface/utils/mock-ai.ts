import { Review, Section } from '../types';

/**
 * AI 응답을 시뮬레이션하는 간단한 mock 함수
 * 실제 서비스에서는 API 호출로 대체됩니다.
 * 
 * @param section - 리뷰할 섹션
 * @param instruction - 사용자 지시문
 * @returns Promise<Review> - 생성된 리뷰 데이터
 */
export async function mockAIReview(section: Section, instruction: string): Promise<Review> {
  // 실제 API 호출 시뮬레이션을 위한 지연
  await new Promise(resolve => setTimeout(resolve, 2000));

  const mockResponse = `JWT 보안 강화를 위해 다음과 같은 구체적인 방안을 구현합니다:

1. **토큰 만료 시간 단축**: 24시간 → 15분으로 변경
2. **리프레시 토큰 구현**: Redis를 활용한 자동 갱신 시스템
3. **토큰 무력화 기능**: 의심스러운 활동 감지 시 즉시 토큰 폐기
4. **성능 최적화**: 토큰 검증 시간 5ms 이하 보장

이러한 개선을 통해 보안성은 강화하면서도 사용자 경험을 유지할 수 있습니다.`;

  return {
    id: Date.now().toString(),
    sectionId: section.id,
    sectionTitle: section.title,
    originalContent: section.content,
    reviewPrompt: instruction,
    revisedContent: mockResponse,
    timestamp: new Date().toISOString(),
  };
}