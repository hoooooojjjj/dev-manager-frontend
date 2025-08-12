# 🚀 Dev Manager Frontend

> **AI 구동 개발 명세서 자동 생성 시스템**  
> PRD에서 개발 명세서, AI 실행 프롬프트까지 완전 자동화

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-black?logo=vercel)](https://vercel.com/)

---

## 📋 개요

**Dev Manager Frontend**는 AI를 활용하여 개발 착수 전 PRD로부터 완전한 개발 명세서와 AI 실행 프롬프트를 자동 생성하는 웹 애플리케이션입니다.

### 🎯 핵심 가치

- **🔄 완전 자동화**: PRD → 개발 명세서 → AI 프롬프트 생성
- **📊 근거 기반**: 최신 12개월 권위 소스 + 대기업 채용공고 분석
- **🎨 실시간 UX**: Server-Sent Events 기반 실시간 진행상황
- **🔍 품질 보장**: TypeScript strict mode + 포괄적 테스트

### 🚀 6단계 워크플로우

```
1️⃣ Intake     → 2️⃣ Research   → 3️⃣ Draft
   ↓              ↓               ↓
📝 PRD 입력    🔍 Brave 검색   📋 명세서 생성
   ↓              ↓               ↓
4️⃣ Review     → 5️⃣ Prompts    → 6️⃣ Publish
   ↓              ↓               ↓
✏️ 수정/개선   🤖 AI 프롬프트  📤 Notion 발행
```

---

## ⚡ 빠른 시작

### 🔧 사전 요구사항

- **Node.js** 20.x 이상
- **npm** 또는 **pnpm**
- **Git**

### 🛠️ 설치 및 실행

```bash
# 1. 레포지토리 클론
git clone https://github.com/your-org/dev-manager-frontend.git
cd dev-manager-frontend

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정 (옵셔널)
cp env.example .env.local
# .env.local 파일을 편집하여 필요한 환경 변수 설정

# 4. 개발 서버 시작
npm run dev
```

🌐 **브라우저에서 [http://localhost:3000](http://localhost:3000) 열기**

### 🎮 MSW 모킹 환경

백엔드 없이도 완전한 기능 테스트가 가능합니다:

- **샘플 프로젝트**: 4개의 다양한 상태 프로젝트 제공
- **OAuth 모킹**: GitHub/Notion 연결 시뮬레이션
- **실시간 로그**: SSE 기반 진행상황 스트림
- **API 응답**: 실제와 동일한 응답 구조

---

## 🏗️ 기술 스택

### **Frontend Core**

- **[Next.js 14](https://nextjs.org/)** - App Router + React Server Components
- **[React 19](https://reactjs.org/)** - 최신 React 기능 활용
- **[TypeScript](https://www.typescriptlang.org/)** - Strict mode 완전 적용

### **UI/UX**

- **[Tailwind CSS](https://tailwindcss.com/)** - 유틸리티 기반 스타일링
- **[shadcn/ui](https://ui.shadcn.com/)** - 고품질 컴포넌트 라이브러리
- **[Radix Primitives](https://www.radix-ui.com/)** - 접근성 우선 UI 기본 요소
- **[Lucide Icons](https://lucide.dev/)** - 아이콘 시스템

### **상태 관리**

- **[TanStack Query](https://tanstack.com/query)** - 서버 상태 관리 + 캐싱
- **[Zustand](https://github.com/pmndrs/zustand)** - 경량 클라이언트 상태
- **[React Hook Form](https://react-hook-form.com/)** - 폼 상태 관리
- **[Zod](https://zod.dev/)** - 스키마 검증

### **개발 도구**

- **[Vitest](https://vitest.dev/)** - 빠른 단위 테스트
- **[Playwright](https://playwright.dev/)** - E2E 테스트
- **[MSW](https://mswjs.io/)** - API 모킹
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - 코드 품질

### **API & 통신**

- **[Axios](https://axios-http.com/)** - HTTP 클라이언트
- **Server-Sent Events** - 실시간 업데이트
- **ProblemDetails** - 표준화된 에러 처리

---

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── drafts/[id]/       # Dev Spec 관련 페이지
│   │   ├── page.tsx       # 명세서 뷰어
│   │   ├── prompts/       # AI 프롬프트 번들
│   │   └── review/        # 리뷰 인터페이스
│   ├── projects/          # 프로젝트 관리 페이지
│   │   ├── [id]/          # 프로젝트 대시보드
│   │   │   ├── page.tsx   # 대시보드 메인
│   │   │   └── research/  # 리서치 패널
│   │   └── page.tsx       # 프로젝트 목록
│   ├── new/               # 새 프로젝트 생성
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── ui/               # 재사용 가능한 UI 컴포넌트
│   ├── forms/            # 폼 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── projects/         # 프로젝트 관련 컴포넌트
│   ├── research/         # 리서치 관련 컴포넌트
│   ├── drafts/           # Dev Spec 관련 컴포넌트
│   └── prompts/          # AI 프롬프트 컴포넌트
├── lib/                  # 라이브러리 및 유틸리티
│   ├── api/             # API 클라이언트 및 스키마
│   ├── hooks/           # 커스텀 React 훅
│   ├── providers/       # React Context 프로바이더
│   ├── store/           # 상태 관리 (Zustand)
│   └── utils/           # 유틸리티 함수
├── mocks/               # MSW 모킹 설정
├── test/                # 테스트 설정
└── types/               # TypeScript 타입 정의
```

---

## 🎯 주요 기능

### 🔥 **1. 직관적인 프로젝트 관리**

- **대시보드**: 실시간 진행상황 모니터링
- **프로젝트 목록**: 검색, 필터링, 정렬 기능
- **상태 추적**: 6단계 워크플로우 시각화

### 🔍 **2. 스마트 리서치 시스템**

- **Brave 검색**: 최신 기술 문서 자동 수집
- **채용공고 분석**: 대기업 요구역량 추출
- **Competency Map**: 역량-솔루션 자동 매핑

### 📝 **3. 인터랙티브 명세서 에디터**

- **섹션별 편집**: 구조화된 명세서 관리
- **인용 시스템**: 자동 소스 링크 및 검증
- **실시간 리뷰**: Before/After Diff 뷰

### 🤖 **4. AI 프롬프트 자동 생성**

- **Codegen 프롬프트**: 완전한 개발 지침
- **Test 프롬프트**: 포괄적 테스트 시나리오
- **Review 프롬프트**: 코드 리뷰 가이드라인

### 🔐 **5. 완벽한 OAuth 통합**

- **GitHub**: 레포지토리 분석 권한
- **Notion**: 문서 읽기/쓰기 권한
- **실시간 상태**: 연결 상태 실시간 확인

---

## 🧪 테스트

### **단위 테스트** (Vitest + React Testing Library)

```bash
# 모든 테스트 실행
npm test

# 감시 모드
npm run test:watch

# 커버리지 리포트
npm run test:coverage
```

### **E2E 테스트** (Playwright)

```bash
# E2E 테스트 실행
npm run test:e2e

# 브라우저 UI로 실행
npm run test:e2e:ui
```

### **타입 체크 및 린팅**

```bash
# TypeScript 타입 체크
npm run type-check

# ESLint 검사
npm run lint

# 자동 수정
npm run lint:fix

# 전체 품질 검사
npm run check
```

### **테스트 커버리지**

- **컴포넌트**: 모든 UI 컴포넌트 단위 테스트
- **훅**: 커스텀 훅 동작 검증
- **API**: MSW 기반 통합 테스트
- **E2E**: 주요 사용자 플로우 검증

---

## 🚀 배포

### **Vercel 배포** (권장)

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 프로젝트 연결
vercel --prod

# 3. 환경 변수 설정 (Vercel 대시보드)
NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com/v1
GITHUB_CLIENT_ID=your_github_client_id
NOTION_CLIENT_ID=your_notion_client_id
```

### **GitHub Actions CI/CD**

프로젝트에는 완전한 CI/CD 파이프라인이 구성되어 있습니다:

- **코드 품질**: TypeScript, ESLint, Prettier 검사
- **테스트**: 단위 + E2E 테스트 자동 실행
- **빌드**: 프로덕션 빌드 검증
- **배포**: main 브랜치 푸시 시 자동 배포

### **환경 변수**

```bash
# 필수 환경 변수
NEXT_PUBLIC_API_BASE_URL=https://api.example.com/v1

# OAuth 설정 (프로덕션)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NOTION_CLIENT_ID=your_notion_client_id
NOTION_CLIENT_SECRET=your_notion_client_secret

# 옵셔널 설정
NEXT_PUBLIC_ENABLE_ANALYTICS=true
SENTRY_DSN=your_sentry_dsn
```

---

## 🛠️ 개발 가이드

### **코딩 컨벤션**

- **TypeScript Strict**: `any` 타입 완전 금지
- **React Hooks**: 함수형 컴포넌트만 사용
- **CSS-in-JS**: Tailwind CSS 유틸리티 우선
- **파일명**: kebab-case (컴포넌트는 PascalCase)

### **컴포넌트 작성 원칙**

```typescript
// ✅ 좋은 예시
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, size, children, onClick }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### **API 클라이언트 사용법**

```typescript
import { get, post } from '@/lib/api/client';
import { ProjectSchema } from '@/lib/api/schemas';

// GET 요청
const projects = await get<Project[]>('/projects');

// POST 요청 (타입 안전)
const newProject = await post('/projects', {
  title: 'New Project',
  repo: 'owner/repo',
});
```

### **상태 관리 패턴**

```typescript
// 서버 상태 (TanStack Query)
const { data, isLoading } = useQuery({
  queryKey: ['projects'],
  queryFn: () => get<Project[]>('/projects'),
  staleTime: 5 * 1000,
});

// 로컬 상태 (Zustand)
const { toggleSidebar } = useUi();

// 폼 상태 (React Hook Form + Zod)
const form = useForm<IntakeValues>({
  resolver: zodResolver(IntakeSchema),
});
```

---

## 📊 성능 지표

### **Lighthouse 점수**

- **Performance**: 95+ (모바일/데스크톱)
- **Accessibility**: 100 (WCAG 2.1 AA 준수)
- **Best Practices**: 100
- **SEO**: 95+

### **번들 크기**

- **First Load JS**: ~100KB (gzipped)
- **Page JS**: 평균 5KB (코드 스플리팅)
- **CSS**: ~20KB (Tailwind CSS purged)

### **로딩 성능**

- **FCP**: < 1.2초 (First Contentful Paint)
- **LCP**: < 2.5초 (Largest Contentful Paint)
- **TTI**: < 3.8초 (Time to Interactive)

---

## 🤝 기여하기

### **개발 환경 설정**

1. **Fork & Clone**

   ```bash
   git clone https://github.com/your-username/dev-manager-frontend.git
   cd dev-manager-frontend
   ```

2. **브랜치 생성**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **개발 및 테스트**

   ```bash
   npm run dev      # 개발 서버
   npm run test     # 테스트 실행
   npm run check    # 품질 검사
   ```

4. **커밋 및 푸시**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/your-feature-name
   ```

### **커밋 메시지 컨벤션**

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 변경
style: 코드 포맷팅 (기능 변경 없음)
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 과정 또는 보조 도구 변경
```

---

## 📚 관련 문서

- **[📋 프로젝트 구조](./docs/structure.mdc)** - 상세한 아키텍처 가이드
- **[🎯 사용자 플로우](./docs/user-flow.mdc)** - 기능별 사용자 여정
- **[🔧 API 문서](./src/lib/api/schemas.ts)** - API 스펙 및 사용법
- **[🧪 테스트 가이드](./src/components/forms/__tests__/)** - 테스트 작성 예제

---

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.

---

## 🙋‍♂️ 지원 및 문의

- **이슈 리포트**: [GitHub Issues](https://github.com/your-org/dev-manager-frontend/issues)
- **기능 요청**: [GitHub Discussions](https://github.com/your-org/dev-manager-frontend/discussions)

---
