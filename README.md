# Dev Manager Frontend

PRD에서 개발 명세서, AI 실행 프롬프트까지 자동 생성하는 개발 착수 전 단계 관리 시스템

## 🚀 Quick Start

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 테스트 실행
npm test

# E2E 테스트
npm run test:e2e
```

## 📋 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: 
  - Server State: TanStack Query
  - Local UI State: Zustand
  - URL State: SearchParams
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Testing**: 
  - Unit: Vitest + React Testing Library
  - E2E: Playwright
  - API Mocking: MSW (Mock Service Worker)
- **Icons**: Lucide React
- **Theme**: next-themes (다크/라이트 모드)

## 🏗️ 프로젝트 구조

```
src/
├── app/                    # App Router 페이지
│   ├── (public)/          # 홈페이지 그룹
│   ├── new/               # Intake 폼
│   ├── projects/[id]/     # 프로젝트 대시보드
│   ├── drafts/[id]/       # Dev Spec 뷰
│   └── globals.css        # 글로벌 스타일
├── components/            # 재사용 컴포넌트
│   ├── ui/               # shadcn/ui 기본 컴포넌트
│   ├── forms/            # 폼 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── projects/         # 프로젝트 관련 컴포넌트
│   ├── research/         # 리서치 패널 컴포넌트
│   ├── drafts/           # 드래프트 뷰 컴포넌트
│   └── prompts/          # AI 프롬프트 컴포넌트
├── lib/                  # 라이브러리 및 유틸리티
│   ├── api/              # API 클라이언트
│   ├── hooks/            # 커스텀 훅
│   ├── providers/        # Context Providers
│   ├── store/            # Zustand 스토어
│   └── utils/            # 유틸리티 함수
├── mocks/                # MSW API 모킹
└── test/                 # 테스트 설정
```

## 🔧 주요 기능

### 1. Intake 폼
- React Hook Form + Zod 검증
- OAuth 상태 실시간 확인 (GitHub, Notion)
- Focus Files 동적 추가/제거
- 실시간 폼 유효성 검사

### 2. 프로젝트 대시보드
- 실시간 상태 타임라인
- SSE 기반 로그 스트림
- 진행률 표시

### 3. 리서치 패널
- References/Job Postings/Competency Map 탭
- 권위 소스 필터링 (최근 12개월)
- 리서치 커버리지 배지

### 4. Dev Spec 뷰어
- 좌측 목차 네비게이션
- 인용 링크 배지 시스템
- 체크리스트 진행도

### 5. 리뷰 인터페이스
- 섹션별 수정 지시
- Before/After Diff 표시
- 엄격한 인용 검증 옵션

### 6. AI 프롬프트 번들
- codegen/test/review 프롬프트
- 변수 치환 시스템
- 클립보드 복사 기능

## 🧪 테스트

### Unit Tests (Vitest + RTL)
```bash
# 단일 실행
npm test

# 감시 모드
npm run test:watch

# 커버리지 포함
npm run test:coverage
```

### E2E Tests (Playwright)
```bash
# E2E 테스트 실행
npm run test:e2e

# 브라우저 UI로 실행
npm run test:e2e:ui
```

### API Mocking (MSW)
개발 환경에서 MSW를 사용하여 백엔드 API를 모킹합니다:

- OAuth 상태 관리
- 프로젝트 생성/조회
- 리서치 데이터
- 에러 케이스 시뮬레이션

## 🎨 UI/UX 가이드라인

### 접근성
- 키보드 네비게이션 완전 지원
- ARIA 레이블 및 롤 적용
- 색상 대비 4.5:1 이상
- `prefers-reduced-motion` 대응

### 반응형 디자인
- Mobile First 접근
- Tailwind CSS 브레이크포인트 활용
- 유연한 그리드 시스템

### 타입 안정성
- TypeScript strict mode
- Zod 스키마 기반 런타임 검증
- 모든 API 응답 타입 정의

## 🔗 API 명세

### 주요 엔드포인트
```
GET    /api/v1/auth/status           # OAuth 상태 조회
POST   /api/v1/auth/connect/:provider # OAuth 연결
POST   /api/v1/projects/intake       # 프로젝트 생성
GET    /api/v1/projects/:id/status   # 프로젝트 상태 조회
GET    /api/v1/projects/:id/research # 리서치 결과 조회
GET    /api/v1/drafts/:id           # 드래프트 조회
PATCH  /api/v1/drafts/:id           # 드래프트 수정
```

### 에러 처리
ProblemDetails 표준을 따르는 구조화된 에러 응답:

```typescript
{
  type: "validation-error",
  title: "입력 데이터 오류", 
  status: 422,
  detail: "필수 필드가 누락되었습니다.",
  correlationId: "abc-123"
}
```

## 🛠️ 개발 도구

### 코드 품질
- **ESLint**: airbnb + next 설정
- **Prettier**: 자동 포맷팅
- **Husky**: Git 훅 관리
- **lint-staged**: 커밋 전 린팅

### 성능 모니터링
- Web Vitals 수집
- React Query DevTools
- 개발 환경 API 로깅

## 📦 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start

# 타입 체크
npm run type-check

# 린트 검사
npm run lint
```

## 🔧 환경 설정

### 환경 변수
```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=/api/v1
```

### MSW 설정
개발 환경에서 자동으로 활성화됩니다. Service Worker가 등록되어 API 요청을 가로채고 모킹된 응답을 제공합니다.

## 📚 추가 문서

- [Cursor Rules](.cursor/rules/) - 개발 컨벤션 및 아키텍처 가이드
- [API 스키마](src/lib/api/schemas.ts) - Zod 기반 타입 정의
- [테스트 가이드](src/components/forms/__tests__/) - 테스트 작성 예제

## 🤝 기여 가이드

1. **브랜치 생성**: `feature/기능명` 또는 `fix/버그명`
2. **커밋 메시지**: 컨벤셔널 커밋 형식 준수
3. **테스트**: 새 기능에 대한 테스트 작성 필수
4. **린트**: `npm run lint:fix`로 코드 포맷팅
5. **PR**: 템플릿에 따라 상세한 설명 작성

---

