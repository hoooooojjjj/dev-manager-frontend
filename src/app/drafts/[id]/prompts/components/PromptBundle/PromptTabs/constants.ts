export const prompts = {
  codegen: `[system]
너는 Next.js 14, TypeScript, JWT 보안 전문가다. 접근성과 타입 안정성을 우선한다.

[context]
프로젝트: 사용자 인증 시스템 JWT 보안 강화
요구사항: 토큰 만료 시간 단축(15분), 리프레시 토큰 로테이션, CSRF 방어
제약: Asia/Seoul 시간대, Redis 사용, 성능 < 5ms

[user]
다음 요구사항에 맞춰 JWT 보안 강화 코드를 구현해줘:
- 토큰 만료 시간을 15분으로 설정
- 리프레시 토큰 로테이션 로직 구현
- SameSite 쿠키 적용
- Redis 기반 토큰 블랙리스트

출력: 변경된 파일 목록과 각 파일의 전체 코드.`,

  test: `[system]
너는 JWT 보안 테스트 전문가다. 보안 취약점과 엣지 케이스를 철저히 검증한다.

[context]
테스트 대상: JWT 보안 강화 구현
주요 테스트 시나리오: 토큰 만료, 리프레시 로테이션, CSRF 방어
도구: Jest, Supertest, Redis Mock

[user]
다음 시나리오에 대한 통합 테스트를 작성해줘:
1. 토큰 만료 시 자동 갱신 플로우
2. 리프레시 토큰 탈취 시 무효화
3. CSRF 공격 방어 검증
4. 성능 벤치마크 (응답시간 < 5ms)

출력: 테스트 파일과 실행 가능한 테스트 케이스.`,

  review: `[system]
너는 시니어 보안 아키텍트다. 코드 리뷰 시 보안성, 성능, 유지보수성을 종합 평가한다.

[context]
리뷰 대상: JWT 보안 강화 PR
보안 기준: OWASP Top 10, JWT 보안 가이드라인
성능 기준: 토큰 검증 < 5ms, Redis 연결 < 3ms

[user]
다음 JWT 보안 구현을 리뷰해줘:
{code_snippet}

리뷰 관점:
1. 보안 취약점 분석
2. 성능 최적화 포인트
3. 코드 품질 개선사항
4. 운영 관점 고려사항

출력: 구체적인 개선사항과 우선순위.`,
};

export const variables = {
  codegen: [
    { name: '{project_context}', value: '사용자 인증 시스템 JWT 보안 강화' },
    { name: '{constraints}', value: 'Asia/Seoul, Redis, 성능 < 5ms' },
    { name: '{requirements}', value: '토큰 만료 15분, 리프레시 로테이션' },
  ],
  test: [
    { name: '{test_scenarios}', value: '토큰 만료, 리프레시 로테이션, CSRF 방어' },
    { name: '{performance_target}', value: '응답시간 < 5ms' },
  ],
  review: [
    { name: '{code_snippet}', value: '실제 구현된 JWT 코드 스니펫' },
    { name: '{security_criteria}', value: 'OWASP Top 10, JWT 가이드라인' },
  ],
};
