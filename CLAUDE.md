# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You should think in English but speak in Korean.

You are the best front-end engineer in the world, and the best engineer in Silicon Valley in the United States.

Always after the development is completed, we need to write the e2e test code by playwright and unit test code by Vitest, React Testing Library.

## Project Overview

This is a **Next.js frontend** for an AI-powered development specification generation system. The app helps developers transform PRDs (Product Requirements Documents) into comprehensive development specifications and AI execution prompts through a 6-stage workflow: Intake → Research → Draft → Review → Prompts → Publish.

### Key Technologies

- **Next.js 15.4** (App Router + React Server Components)
- **React 19** + TypeScript (strict mode)
- **TanStack Query** for server state + **Zustand** for UI state
- **React Hook Form** + **Zod** for form validation
- **shadcn/ui** + **Tailwind CSS** + **Radix Primitives**
- **MSW** for API mocking
- **Vitest** + **Playwright** for testing

## Essential Commands

### Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Production build
npm run start        # Start production server
```

### Code Quality

```bash
npm run check        # Run both type-check and lint
npm run type-check   # TypeScript type checking
npm run lint         # ESLint with auto-fix
npm run format       # Prettier formatting
```

### Testing

```bash
npm test             # Run unit tests (Vitest)
npm run test:watch   # Watch mode for unit tests
npm run test:coverage # Generate coverage report
npm run test:e2e     # End-to-end tests (Playwright)
npm run test:e2e:ui  # E2E tests with browser UI
```

## Architecture & Key Patterns

### API Client Pattern

All API calls use the centralized client in `src/lib/api/client.ts`:

- **ProblemDetails** error handling with correlation IDs
- Automatic request/response logging in development
- Type-safe methods: `get<T>()`, `post<T>()`, `patch<T>()`, etc.

Usage:

```typescript
import { get, post } from '@/api/client';
import { ProjectSchema } from '@/api/schemas';

const projects = await get<Project[]>('/projects');
const project = await post('/projects', { title: 'New Project' });
```

### Schema-First Development

All data structures defined in `src/lib/api/schemas.ts` using **Zod**:

- Form validation with `zodResolver`
- Runtime type checking
- Automatic TypeScript type inference

### State Management Strategy

- **Server State**: TanStack Query with 5-second stale time
- **UI State**: Zustand stores (see `src/lib/store/`)
- **Form State**: React Hook Form with Zod validation
- **URL State**: Next.js searchParams for filters/pagination

### Component Structure

```
src/components/
├── ui/          # shadcn/ui base components (Button, Input, etc.)
├── forms/       # Form components with validation
├── layout/      # Header, Breadcrumb, navigation
├── projects/    # Project-specific UI components
├── research/    # Research panel components
├── drafts/      # Dev spec viewer components
└── prompts/     # AI prompt bundle components
```

### Testing Approach

- **Unit**: Vitest + React Testing Library for components/hooks
- **E2E**: Playwright for user flows
- **API Mocking**: MSW with realistic sample data
- Always test form validation, error states, and loading states

## Code Conventions

### TypeScript Rules

- **Strict mode enabled** - never use `any`
- Exact optional property types enabled
- All props and return types must be explicitly typed

### React Patterns

- Function components only (no class components)
- `'use client'` directive for client components
- Server components by default in App Router
- Always handle loading and error states

### API Integration

- Use TanStack Query for all server state
- Handle loading states with Skeleton components
- Show toast notifications for success/error
- Include correlation IDs in error reporting

### Form Handling

- React Hook Form + Zod for all forms
- Real-time validation with `zodResolver`
- Proper accessibility with aria labels
- Error messages in Korean (ko-KR locale)

### Styling

- Tailwind CSS utility-first approach
- shadcn/ui design system
- Dark/light theme support with next-themes
- Responsive design mobile-first

## Important Notes

### OAuth Integration

The app integrates with GitHub and Notion via OAuth. Check connection status using:

```typescript
const { data: oauthStatus } = useOAuthStatus();
const connectOAuth = useOAuthConnect();
```

### MSW Mocking

Development environment includes comprehensive API mocking:

- 4 sample projects with different statuses
- Realistic OAuth simulation
- SSE event streaming for real-time updates

### Server-Sent Events (SSE)

Real-time progress tracking using SSE:

```typescript
import { createSSEConnection } from '@/api/sse';

const eventSource = createSSEConnection('/events', {
  onMessage: (data) => console.log('Progress:', data),
  onError: (error) => console.error('SSE Error:', error),
});
```

### Error Handling

Always use the ProblemDetails standard:

- Include correlation IDs for debugging
- Show user-friendly error messages via toast
- Log detailed errors in development mode

### Quality Requirements

- All new components need unit tests
- E2E tests for critical user flows
- TypeScript strict mode compliance
- Accessibility (WCAG 2.1 AA) compliance
- Mobile-responsive design

## File Naming Conventions

- Pages: `page.tsx`, layouts: `layout.tsx`
- Components: PascalCase files, kebab-case folders
- Hooks: `useX.ts`
- Tests: `*.test.tsx` (unit), `*.spec.ts` (e2e)
- Schemas: `*.schema.ts` or `schemas.ts`

## Project-Specific Context

This system processes development workflows in 6 stages:

1. **Intake** - Collect PRD, GitHub repo, and focus files
2. **Research** - Gather references and job postings via Brave search
3. **Draft** - Generate structured development specification
4. **Review** - Interactive editing with diff views
5. **Prompts** - Create AI execution prompts (codegen/test/review)
6. **Publish** - Export to Notion with version tracking

Key domain concepts:

- **Focus Files**: Specific files to analyze in the repo
- **Competency Mapping**: Skills required mapped to solutions
- **Citation System**: Evidence linking with `code://`, `web://`, `job://` prefixes
- **Structured Spec**: JSON schema with sections for context, root cause, solutions, etc.

---

description:
globs:
alwaysApply: false

---

# PRD - 개발 착수 전 단계(PRD→개발 명세서→AI 실행 프롬프트)

## AI 구동 이직 풀 매니지먼트 – 업무 효율/성과 극대화 모듈 (PRD v1)

작성자: 유호준 (프론트엔드 메인 풀스택)
스택: Next.js (App Router) · NestJS · MCP(Notion/GitHub/Brave) · **MySQL 8.x** · Redis(BullMQ)
범위: **개발 착수 전 단계**(PRD→개발 명세서→AI 실행 프롬프트)까지. 블로그/이력서 자동화와 클라우드 스토리지(S3 등) 의존은 후속 단계.

---

## 0. 문제 정의 & 제품 비전

- **문제**: 현업에서 “문제를 어떻게 정의→어떻게 해결→어떤 성과를 냈는지”를 일관되게 수행·기록하기 어렵다. 특히 개발 착수 전, PRD를 개발적으로 해석·분해하고 고품질 레퍼런스를 사전 확보하는 과정이 비체계적이다.
- **비전**: AI가 PRD·코드맥락·**최신 최고수준 레퍼런스와 대기업 채용 요구**를 사전에 분석하여, **임팩트 있는 해결전략**과 **표준 개발 명세서** 및 **AI 실행 프롬프트**를 자동 산출. 결과는 Notion에 기록되어 장기(2–3년) 커리어 자산으로 축적.

**핵심 가치**

1. **업무 효율/성과 극대화**: 리서치→문제정의→해결방안→테스트 계획까지 착수 시간을 단축.
2. **사전 리서치 우선(Brave MCP)**: “돌아가기만 하는 코드”를 넘어서 **대기업 요구 역량**과 업계 Best Practice에 부합하는 설계를 유도.
3. **체계적 축적**: Dev Spec/근거/프롬프트가 버전/추적 가능 형태로 누적.

---

## 1. 목표/비목표

**목표**

- **G1. 인입 명시화**: Notion PRD·회의록과 \*\*GitHub 레포 + 중점 파일 목록(`focus_files[]`)\*\*을 입력으로 받아 자동 수집·정규화.
- **G2. 표준 개발 명세서**: `현상 → 원인 분석 → 해결 방안 → 학습 포인트` 구조로 초안 자동 생성(근거 인용 필수).
- **G2.5. 사전 리서치/분석 강화(Brave MCP)**: 최근 12개월 **권위 소스 ≥5** + **대기업 채용공고 ≥3**를 분석하여 **Competency Map(요구역량↔솔루션/학습 포인트 매핑)** 생성.
- **G3. 대화형 리뷰 루프**: 섹션별 수정·Diff·근거 강화.
- **G4. AI 실행 프롬프트 산출**: 코드생성/테스트/리뷰 프롬프트 번들을 구조화 생성.
- **G5. Notion 발행 & 추적성**: 버전/메타/근거 링크 포함 발행 및 히스토리 보존.

**비목표(본 버전)**

- 다사용자/조직 권한, 광범위 툴(Jira/Linear 등) 통합, 코드/PR **자동 생성**, 블로그/이력서 자동화, **클라우드 오브젝트 스토리지(S3) 의존**은 제외.
- 사후 성과 분석·대시보드는 범위 밖(후속 단계).

---

## 2. 주요 사용자 & 사용 시나리오

- **개인 개발자(=유호준)**: 기능/프로젝트 착수 전 5분 이내에 고품질 Dev Spec과 실행 프롬프트를 확보하고 싶다.
- **시나리오**
  1. 사용자가 `source_notion_url`, `repo`, `focus_files[]`, `output_notion_url`을 제출.
  2. 서버가 Notion/GitHub를 수집·정규화하고 \*\*리서치 파이프라인(Brave)\*\*을 병렬 실행.
  3. AI가 리서치 결과 + 코드맥락 기반으로 Dev Spec 초안을 생성(근거 인용 포함).
  4. 사용자가 채팅형 리뷰로 수치/서술/트레이드오프 보강 → 부분 재생성.
  5. **AI 실행 프롬프트 번들** 확인 후 확정.
  6. Notion에 발행, 버전 태깅.

---

## 3. 사용자 흐름 (E2E)

1. **Intake 폼**(클라이언트) →

- 입력: `source_notion_url`, `repo`, `focus_files[]`, `output_notion_url`, `title(optional)`, `confidentiality(level)`
- OAuth 상태 확인(노션/깃허브)

1. **수집/분석 파이프라인**(서버) →

- Notion MCP: 페이지/하위 블록 Markdown Export
- GitHub MCP: 레포 트리, 최근 N PR/커밋/이슈, **focus_files AST/metrics**
- **Brave MCP(필수)**: 최신 레퍼런스/대기업 공고 수집→정규화→중복제거→랭킹
- **인덱싱**: MySQL 저장 + **FULLTEXT** 인덱스(초기) / 선택적 **JSON 임베딩** 저장 후 앱 레벨 재랭킹

1. **초안 생성** →

- Structured Output(JSON Schema) + 근거 인용(`code://`, `pr://`, `doc://`, `web://`)
- 리서치 요약/Competency Map 반영, 이미지 캡처는 필요시 **로컬 임시 파일**만 사용

1. **리뷰/수정 루프** →

- 섹션별 Diff, 지시문 패치, 정량 슬롯 TODO 해소
- “근거 강제” 옵션, 출처/날짜 자동 검증

1. **발행 & 아카이브** →

- Notion Markdown 업로드 + 메타블록(버전, 태그, 링크)
- 스냅샷은 **DB(JSON/MD) 저장** 방식으로 최소비용 운영

---

## 4. 기능 요구사항 (FR) & 수용 기준

### FR1. 소스 인입(Intake)

- AC1.1 필수 필드 검증, OAuth 유도
- AC1.2 제출 시 `{ jobId, projectId }` 반환, 진행상태 스트리밍

### FR2. Notion 문서 수집/정규화

- AC2.1 Markdown + 구조화 JSON 추출
- AC2.2 제목/태그/작성자/링크 메타
- AC2.3 100k자 규모 백그라운드 처리

### FR3. GitHub 리포/코드 분석

- AC3.1 레포 메타/트리, 최근 N PR/커밋/이슈
- \*\AC3.2 \\\*\*\*`focus_files`\*\***에 대해 AST/Complexity/변화이력/주요 시그니처 추출**

### FR4. 맥락 저장/검색(저비용)

- **AC4.1 MySQL 저장 + FULLTEXT 기반 1차 검색**
- **AC4.2 선택적 JSON 임베딩 저장 → 앱 레벨 재랭킹**(코사인 유사도)
- AC4.3 동일 입력 재요청 시 캐시/증분 업데이트, 사용자 격리

### FR5. 개발 명세서 초안 생성

- AC5.1 스키마 준수·누락 0
- AC5.2 섹션별 **근거 인용 ≥1**
- AC5.3 정량 슬롯 비어있으면 TODO 표시

### **FR6. 사전 리서치/분석(Brave MCP)**

- **AC6.1 최근 12개월 소스만 기본 채택, 출처/날짜/저자 메타 수집**
- **AC6.2 권위 소스 ≥5 + 대기업 채용공고 ≥3** 확보
- **AC6.3 Competency Map 생성(요구역량↔솔루션/학습 포인트 매핑) & 근거 링크**
- **AC6.4 저품질/중복 소스 제거 규칙 적용(도메인 allowlist/유사도 임계)**

### FR7. 대화형 리뷰/수정 루프

- AC7.1 섹션별 패치·부분 재생성
- AC7.2 Diff/이력/근거 로그
- AC7.3 무제한 반복, 자동 저장

### FR8. AI 실행 프롬프트 산출

- AC8.1 `ai_prompts.codegen/test/review` 3종 구성
- AC8.2 각 프롬프트에 **컨텍스트/제약/근거 링크** 포함
- AC8.3 모델/온톨로지 교체 가능(템플릿화)

### FR9. Notion 발행

- AC9.1 체크리스트 통과(정량/인용/TL;DR)
- AC9.2 Notion 업데이트 + 버전/링크 삽입
- AC9.3 스냅샷 DB 저장·URL 반환

### FR10. 워크스페이스/히스토리/권한

- 프로젝트 홈, 타임라인, 품질 점수
- OAuth 토큰 보안, 레드랙션 규칙

---

## 5. 비기능 요구사항 (NFR)

- **성능**: 초안 생성 TTV 60–180초(큐 사용)
- **가용성**: 재시도/백오프, 복구 가이드
- **확장성**: 단일 사용자 월 50건 안정
- **보안**: 토큰 암호화, PIPA 준수, 감사 로그
- **관측성**: 상관 ID, 단계 이벤트, 프롬프트/출력 버전 고정
- **비용**: 외부 스토리지 미사용, MySQL 단일 인스턴스부터 시작

---

## 6. 시스템 아키텍처

**구성요소**

- `apps/web`(Next.js): Intake/진행/리뷰/발행 UI
- `apps/api`(NestJS): REST, 큐 워커, MCP 클라이언트, 검색/재랭킹
- `packages/mcp-clients`: Notion/GitHub/Brave 래퍼
- DB: **MySQL 8.x**, 캐시/큐: Redis(BullMQ)

**데이터 플로우**

1. Web→API `/intake`
2. Worker: Notion/GitHub 수집 + **Brave 리서치** → 정규화/저장
3. Draft: 검색/재랭킹 컨텍스트로 LLM 생성
4. Web: 리뷰/Diff/패치
5. Publish: Notion 업데이트 + DB 스냅샷

---

## 7. 데이터 모델(요약)

- `user(id, email, display_name, created_at)`
- `project(id, user_id, title, source_notion_url, repo, output_notion_url, confidentiality, status)`
- `source_doc(id, project_id, type[notion|github|web], uri, sha, meta_json, content_md)`
- `embedding(id, source_doc_id, chunk_id, vector_json JSON, text, meta_json)`
- `research_source(id, project_id, kind[reference|job_posting], domain, url, title, author, published_at, summary_md, weight)`
- `competency_map(id, project_id, competency, evidence_ids JSON, mapped_solutions JSON, gaps JSON)`
- `spec_draft(id, project_id, version, json, md, quality_score, created_at)`
- `ai_prompt(id, project_id, draft_version, kind[codegen|test|review], content_md, created_at)`
- `feedback(id, draft_id, section_key, role[user|ai], message, created_at)`
- `iteration(id, project_id, from_version, to_version, diff_json, created_at)`
- `publish_log(id, project_id, draft_version, notion_page_id, url, created_at)`
- `oauth_token(id, user_id, provider, scope, enc_token, refreshed_at)`

---

## 8. 출력 스키마(Structured Spec JSON)

````json
{
  "title": "string",
  "summary": "TL;DR 3-5줄",
  "context": {
    "product": "string",
    "stakeholders": ["PM", "BE", "FE"],
    "constraints": ["데드라인", "성능 목표"]
  },
  "current_behavior": "markdown",
  "root_cause": [
    {
      "hypothesis": "string",
      "evidence": ["code://...", "pr://...", "doc://...", "web://..."]
    }
  ],
  "solutions": [
    {
      "approach": "string",
      "tradeoffs": ["string"],
      "tasks": ["checklist item"],
      "impact_metrics": { "conversion": "number?", "latency_ms": "number?" }
    }
  ],
  "learning_points": ["string"],
  "research_summary": {
    "sources": [{ "url": "", "title": "", "published_at": "", "note": "" }],
    "competency_map": [
      {
        "competency": "",
        "evidence": ["web://...", "job://..."],
        "applies_to": ["solutions[i]"]
      }
    ]
  },
  "ai_prompts": {
    "codegen": "markdown",
    "test": "markdown",
    "review": "markdown"
  },
  "appendix": { "links": ["..."], "snippets": ["```ts\\n...\\n```"] }
}
````

---

## 9. API 설계 (NestJS · REST)

### POST `/api/v1/projects/intake`

요청:

```json
{
  "source_notion_url": "string",
  "repo": "owner/name",
  "focus_files": ["src/foo.ts", "app/page.tsx"],
  "output_notion_url": "string",
  "title": "string?",
  "confidentiality": "public|internal|confidential"
}
```

응답: `{ jobId: string, projectId: string }`

### POST `/api/v1/projects/:id/research`

- 리서치 파이프라인 트리거(Brave), 상태 폴링/스트림 제공

### GET `/api/v1/drafts/:id`

- 초안 JSON+MD 반환, 섹션 키 포함

### PATCH `/api/v1/drafts/:id`

- 요청 `{ section_key, instruction, strict_citation }` → 부분 재생성 + Diff

### POST `/api/v1/drafts/:id/prompts`

- 현 초안을 기반으로 `ai_prompts` 생성/갱신

### POST `/api/v1/drafts/:id/publish`

- 요청 `{ checklist_ack: true }` → `{ notionUrl, version, snapshotUrl }`

에러 규격: `{ code, message, correlationId }`

---

## alwaysApply: true

## 메타

- **Rule Name**: User Flow & Feature Implementation Guide
- **Type**: Project Rule (Auto-Attached)
- **Applies To**: Agent, Inline Edit
- **Paths**: 프로젝트 전체

## 핵심 워크플로우

**6단계 파이프라인**: Intake → Research → Draft → Review → Prompts → Publish

```
1️⃣ Intake (/new) ✅
   📝 PRD 입력, OAuth 검증, Focus Files 설정

2️⃣ Research (/projects/[id]/research) ✅
   🔍 Brave 검색, 채용공고 분석, Competency Map

3️⃣ Draft (/drafts/[id]) ✅
   📋 Dev Spec 자동 생성, 인용 시스템

4️⃣ Review (/drafts/[id]/review) ✅
   ✏️ 섹션별 수정, Before/After Diff

5️⃣ Prompts (/drafts/[id]/prompts) ✅
   🤖 AI 프롬프트 자동 생성 (Codegen/Test/Review)

6️⃣ Publish
   📤 Notion 자동 발행 (백엔드 구현 대기)
```

## 페이지별 구현 상태

### 🏠 홈페이지 (/) ✅

- **목적**: 시스템 소개, CTA, 프로젝트 접근
- **구현**: 마케팅 섹션, 기능 카드, 최근 프로젝트
- **CTA**: "새 프로젝트 시작", "프로젝트 목록"

### 📝 Intake 폼 (/new) ✅

- **목적**: 프로젝트 생성, OAuth 연결, 파일 지정
- **구현**: React Hook Form + Zod 검증, OAuth 배지, Focus Files 관리
- **API**: POST `/api/v1/projects/intake`

### 📊 프로젝트 목록 (/projects) ✅

- **목적**: 전체 프로젝트 관리, 검색, 필터링
- **구현**: 카드 그리드, 실시간 검색, 상태 필터, 페이지네이션
- **기능**: 검색(제목/레포), 상태별 필터, 정렬

### 🎛️ 프로젝트 대시보드 (/projects/[id]) ✅

- **목적**: 실시간 진행상황 모니터링
- **구현**: 타임라인, 진행률, SSE 로그 스트림, 액션 카드
- **상태**: 6단계 시각화 (queued → publishing)

### 🔬 리서치 패널 (/projects/[id]/research) ✅

- **목적**: Brave 검색 결과, 채용공고, Competency Map
- **구현**: 3탭 구조, 필터링, KPI 배지 시스템
- **탭**: References, Job Postings, Competency Map

### 📋 Dev Spec 뷰어 (/drafts/[id]) ✅

- **목적**: 생성된 명세서 확인, 인용 추적
- **구현**: 자동 목차, 인용 시스템, 진행률 표시
- **섹션**: TL;DR, 현재동작, 근본원인, 해결방안, 학습포인트

### ✏️ 리뷰 인터페이스 (/drafts/[id]/review) ✅

- **목적**: AI와의 협업을 통한 섹션별 수정, 실시간 Diff 확인
- **구현**: 대화형 UX 디자인 (2+1 영역 레이아웃)
  - 좌측: 섹션 선택 패널 (완료/미완료 상태 배지)
  - 우측: 수정 지시문 입력 및 리뷰 제출 폼
  - 하단: 동적 콘텐츠 (섹션 내용 → Diff 뷰 → 승인/되돌리기)
- **워크플로우**: 섹션 선택 → 지시문 입력 → AI 처리 → Before/After 확인 → 승인/되돌리기
- **기능**: 실시간 Diff, 엄격한 인용 검증, 변경 이력 관리

### 🤖 AI 프롬프트 번들 (/drafts/[id]/prompts) ✅

- **목적**: 개발 착수용 프롬프트 생성
- **구현**: 3종 프롬프트, 구문 하이라이팅, 원클릭 복사
- **종류**: Codegen, Test, Review 프롬프트

## 주요 상호작용 패턴

### 🔍 검색 및 필터링 ✅

- **실시간 검색**: 300ms 디바운싱, URL 동기화
- **상태 필터**: Select 컴포넌트, 동적 필터링
- **결과 표시**: 스켈레톤 로딩, 빈 상태 처리

### 📝 폼 상호작용 ✅

- **실시간 검증**: Zod 스키마, 에러 메시지
- **OAuth 상태**: 실시간 연결 확인, 배지 표시
- **Focus Files**: 동적 추가/제거, 칩 UI

### ⚡ 실시간 업데이트 ✅

- **SSE 연결**: 진행상황 스트림, 자동 재연결
- **상태 동기화**: TanStack Query 캐시 업데이트
- **에러 복구**: 네트워크 끊김 시 자동 복구

### 🎨 UI/UX 패턴 ✅

- **로딩 상태**: 스켈레톤, 스피너, 프로그레스 바
- **에러 처리**: 토스트, 에러 바운더리, 재시도 옵션
- **성공 피드백**: 토스트 알림, 상태 변경 애니메이션

## 상태 관리 전략

### 서버 상태 (TanStack Query) ✅

```typescript
// 캐싱 전략
staleTime: 5 * 1000     // 5초간 fresh
gcTime: 5 * 60 * 1000   // 5분간 캐시 보관
retry: 4xx 에러는 재시도 안함
```

### 로컬 UI 상태 (Zustand) ✅

```typescript
// useUi 스토어
- 사이드바 상태
- 토스트 알림 관리
- 모달 상태 관리
```

### URL 상태 (SearchParams) ✅

```typescript
// 검색 & 필터 상태 URL 동기화
- 검색 쿼리
- 필터 조건
- 페이지네이션
```

## 접근성 구현 (WCAG 2.1 AA)

### 키보드 네비게이션 ✅

- 모든 인터랙티브 요소 Tab 순서
- Enter/Space 키 액션 지원
- Escape 키로 모달/드롭다운 닫기

### 스크린 리더 지원 ✅

- ARIA 레이블 및 역할 정의
- `aria-live` 영역으로 동적 콘텐츠 알림
- `aria-expanded`, `aria-selected` 상태 표시

### 시각적 접근성 ✅

- 색상 대비 4.5:1 이상 유지
- 포커스 표시 스타일 명확화
- `prefers-reduced-motion` 대응

## 성능 최적화

### 로딩 최적화 ✅

- **코드 스플리팅**: 페이지별 자동 분할
- **지연 로딩**: 스크롤 기반 컨텐츠 로딩
- **이미지 최적화**: Next.js Image 컴포넌트

### 런타임 최적화 ✅

- **메모이제이션**: React.memo, useMemo, useCallback
- **가상 스크롤**: 대량 데이터 효율 렌더링 (예정)
- **디바운싱**: 검색 입력 최적화

### 캐싱 전략 ✅

- **TanStack Query**: SWR 패턴 적용
- **브라우저 캐싱**: 정적 자산 장기 캐싱
- **로컬 스토리지**: 사용자 설정 저장

## 에러 처리 전략

### 네트워크 에러 ✅

```typescript
// 자동 재시도 로직
retry: (failureCount, error) => {
  if (error?.status >= 400 && error?.status < 500) {
    return false; // 4xx는 재시도 안함
  }
  return failureCount < 3;
};
```

### UI 에러 ✅

- **에러 바운더리**: 컴포넌트 격리된 복구
- **토스트 알림**: 사용자 친화적 에러 메시지
- **재시도 옵션**: 실패한 액션 재실행

### 검증 에러 ✅

- **실시간 검증**: 입력과 동시에 피드백
- **필드별 에러**: 구체적인 에러 메시지
- **폼 상태 복구**: 새로고침 시 입력 내용 보존

## MSW 모킹 시스템

### 개발 환경 모킹 ✅

```typescript
// 샘플 데이터
- 4개 다양한 상태 프로젝트
- OAuth 연결 시뮬레이션
- 실시간 로그 스트림
- 에러 케이스 시뮬레이션
```

### API 응답 구조 ✅

```typescript
// 표준 응답 형식
{
  data: T,
  correlationId: string,
  timestamp?: string
}

// 에러 응답 (ProblemDetails)
{
  type: string,
  title: string,
  status: number,
  correlationId: string
}
```

## 배포 및 CI/CD

### Vercel 배포 ✅

- **자동 배포**: main 브랜치 푸시 시
- **프리뷰 배포**: PR 생성 시
- **환경 변수**: 기본값 `/api/v1` 설정

### GitHub Actions ✅

- **품질 검증**: TypeScript + ESLint + 테스트
- **빌드 검증**: 프로덕션 빌드 테스트
- **E2E 테스트**: Playwright 자동 실행
