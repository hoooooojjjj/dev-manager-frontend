/**
 * MSW API 핸들러
 * 백엔드가 준비되기 전까지 사용할 모킹 API
 */

import { http, HttpResponse } from 'msw';
import type { 
  IntakeValues, 
  Project, 
  ResearchSource, 
  CompetencyMap 
} from '@/lib/api/schemas';

// Mock 데이터
const mockProjects: Project[] = [];
const mockResearchSources: ResearchSource[] = [];
const mockCompetencyMaps: CompetencyMap[] = [];

// OAuth 상태 모킹
let mockOAuthStatus = {
  github: true,
  notion: false,
};

export const handlers = [
  // OAuth 상태 조회
  http.get('/api/v1/auth/status', () => {
    return HttpResponse.json({
      data: mockOAuthStatus,
      correlationId: crypto.randomUUID(),
    });
  }),

  // OAuth 연결
  http.post('/api/v1/auth/connect/:provider', ({ params }) => {
    const provider = params.provider as string;
    
    if (provider === 'github' || provider === 'notion') {
      mockOAuthStatus = {
        ...mockOAuthStatus,
        [provider]: true,
      };
      
      return HttpResponse.json({
        data: { 
          connected: true, 
          provider,
          redirectUrl: `https://${provider}.com/oauth/authorize?...` 
        },
        correlationId: crypto.randomUUID(),
      });
    }

    return HttpResponse.json(
      {
        type: 'invalid-provider',
        title: '지원하지 않는 OAuth 제공자',
        status: 400,
        detail: `${provider}는 지원하지 않는 OAuth 제공자입니다.`,
        correlationId: crypto.randomUUID(),
      },
      { status: 400 }
    );
  }),

  // 프로젝트 생성 (Intake)
  http.post('/api/v1/projects/intake', async ({ request }) => {
    const body = await request.json() as IntakeValues;
    
    // 입력 검증
    if (!body.source_notion_url || !body.repo || !body.focus_files?.length) {
      return HttpResponse.json(
        {
          type: 'validation-error',
          title: '입력 데이터 오류',
          status: 422,
          detail: '필수 필드가 누락되었습니다.',
          correlationId: crypto.randomUUID(),
        },
        { status: 422 }
      );
    }

    // GitHub 레포지토리 형식 검증
    if (!/^[\w.-]+\/[\w.-]+$/.test(body.repo)) {
      return HttpResponse.json(
        {
          type: 'invalid-repo',
          title: '잘못된 GitHub 레포지토리',
          status: 422,
          detail: 'owner/repository 형식으로 입력해주세요.',
          correlationId: crypto.randomUUID(),
        },
        { status: 422 }
      );
    }

    // OAuth 연결 상태 확인
    if (!mockOAuthStatus.github) {
      return HttpResponse.json(
        {
          type: 'oauth-required',
          title: 'GitHub 연결 필요',
          status: 401,
          detail: 'GitHub OAuth 연결이 필요합니다.',
          correlationId: crypto.randomUUID(),
        },
        { status: 401 }
      );
    }

    // 새 프로젝트 생성
    const projectId = crypto.randomUUID();
    const jobId = crypto.randomUUID();
    
    const newProject: Project = {
      id: projectId,
      user_id: 'mock-user-id',
      title: body.title || `${body.repo} 개선 프로젝트`,
      source_notion_url: body.source_notion_url,
      repo: body.repo,
      focus_files: body.focus_files,
      output_notion_url: body.output_notion_url,
      confidentiality: body.confidentiality,
      status: 'queued',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockProjects.push(newProject);

    // 프로젝트 생성 후 자동으로 상태 변경 시뮬레이션
    setTimeout(() => {
      const project = mockProjects.find(p => p.id === projectId);
      if (project) {
        project.status = 'collecting';
        project.updated_at = new Date().toISOString();
      }
    }, 2000);

    setTimeout(() => {
      const project = mockProjects.find(p => p.id === projectId);
      if (project) {
        project.status = 'researching';
        project.updated_at = new Date().toISOString();
      }
    }, 5000);

    return HttpResponse.json({
      data: { jobId, projectId },
      correlationId: crypto.randomUUID(),
    });
  }),

  // 프로젝트 상태 조회
  http.get('/api/v1/projects/:id/status', ({ params }) => {
    const projectId = params.id as string;
    const project = mockProjects.find(p => p.id === projectId);

    if (!project) {
      return HttpResponse.json(
        {
          type: 'project-not-found',
          title: '프로젝트를 찾을 수 없음',
          status: 404,
          detail: `프로젝트 ${projectId}를 찾을 수 없습니다.`,
          correlationId: crypto.randomUUID(),
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      data: project,
      correlationId: crypto.randomUUID(),
    });
  }),

  // 프로젝트 리서치 결과 조회
  http.get('/api/v1/projects/:id/research', ({ params }) => {
    const projectId = params.id as string;
    const project = mockProjects.find(p => p.id === projectId);

    if (!project) {
      return HttpResponse.json(
        {
          type: 'project-not-found',
          title: '프로젝트를 찾을 수 없음',
          status: 404,
          correlationId: crypto.randomUUID(),
        },
        { status: 404 }
      );
    }

    // Mock 리서치 데이터 생성
    const mockResearch = {
      sources: [
        {
          id: '1',
          project_id: projectId,
          kind: 'reference' as const,
          domain: 'auth0.com',
          url: 'https://auth0.com/blog/jwt-security-best-practices',
          title: 'JWT Security Best Practices 2024',
          author: 'Auth0 Team',
          published_at: '2024-01-10T00:00:00Z',
          summary_md: 'JWT 토큰의 보안 취약점과 최신 보안 가이드라인을 다룹니다.',
          weight: 0.9,
          metadata: { authority_score: 9, recency_score: 8 }
        },
        {
          id: '2',
          project_id: projectId,
          kind: 'job_posting' as const,
          domain: 'careers.kakao.com',
          url: 'https://careers.kakao.com/jobs',
          title: 'Senior Frontend Engineer - Authentication',
          author: '카카오',
          published_at: '2024-01-08T00:00:00Z',
          summary_md: 'JWT 토큰 기반 인증 구현, OAuth 2.0/OIDC 경험 요구',
          weight: 0.8,
          metadata: { company_tier: '대기업', salary_range: '7000-9000만원' }
        }
      ],
      competency_map: [
        {
          id: '1',
          project_id: projectId,
          competency: 'JWT 보안 구현',
          evidence_ids: ['1', '2'],
          mapped_solutions: ['토큰 검증 로직', '리프레시 토큰 관리'],
          gaps: [],
          learning_points: ['HS256 vs RS256 선택 기준', '토큰 만료 처리 패턴']
        }
      ],
      summary: {
        totalSources: 2,
        authoritativeSources: 1,
        jobPostings: 1,
        coverageScore: 85,
      }
    };

    return HttpResponse.json({
      data: mockResearch,
      correlationId: crypto.randomUUID(),
    });
  }),

  // 드래프트 조회
  http.get('/api/v1/drafts/:id', ({ params }) => {
    const draftId = params.id as string;

    const mockDraft = {
      id: draftId,
      project_id: 'mock-project-id',
      version: 1,
      title: '사용자 인증 시스템 JWT 보안 강화',
      summary: '현재 사용자 인증 시스템의 JWT 구현에서 발견된 보안 취약점을 해결하고, 업계 표준에 맞는 보안 강화 방안을 적용합니다.',
      current_behavior: '현재 인증 시스템은 JWT 액세스 토큰(24시간 만료)과 별도의 리프레시 토큰 없이 운영되고 있습니다.',
      root_cause: [
        {
          hypothesis: '초기 설계 시 보안 고려 부족',
          evidence: ['code://auth/jwt.ts#L45-67', 'pr://owner/repo#123']
        }
      ],
      solutions: [],
      learning_points: ['JWT 토큰 보안 모범 사례', 'OAuth 2.1 보안 가이드라인'],
      quality_score: 75,
      json: {},
      md: '',
      created_at: new Date().toISOString(),
    };

    return HttpResponse.json({
      data: mockDraft,
      correlationId: crypto.randomUUID(),
    });
  }),

  // 백그라운드 작업을 위한 지연 응답 시뮬레이션
  http.get('/api/v1/projects/:id/events', () => {
    // SSE는 별도 구현 필요
    return HttpResponse.json({
      data: { message: 'SSE endpoint - 브라우저에서 EventSource로 연결하세요' },
      correlationId: crypto.randomUUID(),
    });
  }),
];

// 개발용 유틸리티 함수들
export const mockUtils = {
  // OAuth 상태 변경
  setOAuthStatus: (status: Partial<typeof mockOAuthStatus>) => {
    mockOAuthStatus = { ...mockOAuthStatus, ...status };
  },
  
  // 프로젝트 상태 변경
  updateProjectStatus: (projectId: string, status: Project['status']) => {
    const project = mockProjects.find(p => p.id === projectId);
    if (project) {
      project.status = status;
      project.updated_at = new Date().toISOString();
    }
  },
  
  // 모든 모킹 데이터 초기화
  reset: () => {
    mockProjects.length = 0;
    mockResearchSources.length = 0;
    mockCompetencyMaps.length = 0;
    mockOAuthStatus = { github: true, notion: false };
  },
};
