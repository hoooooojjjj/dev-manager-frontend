export const researchSummary = {
  totalSources: 12,
  authoritativeSources: 7,
  jobPostings: 5,
};

export const references = [
  {
    id: '1',
    title: 'JWT Security Best Practices 2024',
    url: 'https://auth0.com/blog/jwt-security-best-practices',
    domain: 'auth0.com',
    author: 'Auth0 Team',
    published_at: '2024-01-10',
    summary: 'JWT 토큰의 보안 취약점과 최신 보안 가이드라인을 다룹니다.',
    weight: 0.9,
    metadata: { authority_score: 9, recency_score: 8 },
  },
  {
    id: '2',
    title: 'OAuth 2.1 Security Guidelines',
    url: 'https://datatracker.ietf.org/doc/draft-ietf-oauth-security-topics/',
    domain: 'ietf.org',
    author: 'IETF OAuth Working Group',
    published_at: '2023-12-15',
    summary: 'OAuth 2.1 스펙의 보안 권장사항과 구현 가이드입니다.',
    weight: 0.95,
    metadata: { authority_score: 10, recency_score: 7 },
  },
];

export const jobPostings = [
  {
    id: '1',
    title: 'Senior Frontend Engineer - Authentication',
    company: '카카오',
    url: 'https://careers.kakao.com/jobs',
    published_at: '2024-01-08',
    requirements: ['JWT 토큰 기반 인증 구현', 'OAuth 2.0/OIDC 경험', '보안 취약점 분석'],
    metadata: { company_tier: '대기업', salary_range: '7000-9000만원' },
  },
  {
    id: '2',
    title: '프론트엔드 개발자 - 보안 플랫폼',
    company: '네이버',
    url: 'https://careers.naver.com/jobs',
    published_at: '2024-01-05',
    requirements: ['인증/인가 시스템 개발', '보안 라이브러리 구축', '취약점 스캐닝'],
    metadata: { company_tier: '대기업', salary_range: '6500-8500만원' },
  },
];

export const competencyMap = [
  {
    competency: 'JWT 보안 구현',
    evidence: ['web://auth0.com/blog/jwt-security', 'job://카카오-auth-engineer'],
    applies_to: ['토큰 검증 로직', '리프레시 토큰 관리'],
    learning_points: ['HS256 vs RS256 선택 기준', '토큰 만료 처리 패턴'],
  },
  {
    competency: 'OAuth 2.1 구현',
    evidence: ['web://ietf.org/oauth-security', 'job://네이버-security-platform'],
    applies_to: ['PKCE 플로우', '상태 검증'],
    learning_points: ['PKCE 필수 적용', 'state 파라미터 검증'],
  },
];
