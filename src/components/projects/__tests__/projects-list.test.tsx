/**
 * ProjectsList 컴포넌트 테스트
 * React Testing Library + MSW를 사용한 통합 테스트
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeAll, beforeEach, afterEach, afterAll, describe, it, expect, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

import { ProjectsList } from '../projects-list';
import { handlers } from '@/mocks/handlers';

// MSW 서버 설정
const server = setupServer(...handlers);

// 모킹
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Link 컴포넌트 모킹
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// 테스트 래퍼 컴포넌트
function TestWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

describe('ProjectsList', () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    mockPush.mockClear();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('프로젝트 목록이 올바르게 렌더링된다', async () => {
    render(
      <TestWrapper>
        <ProjectsList />
      </TestWrapper>
    );

    // 로딩 상태 확인
    expect(screen.getAllByRole('generic')).toBeTruthy();

    // 프로젝트 목록 로드 대기
    await waitFor(() => {
      expect(screen.getByText('사용자 인증 시스템 JWT 보안 강화')).toBeInTheDocument();
    });

    // 샘플 프로젝트들이 표시되는지 확인
    expect(screen.getByText('React 컴포넌트 성능 최적화')).toBeInTheDocument();
    expect(screen.getByText('GraphQL API 설계 개선')).toBeInTheDocument();
    expect(screen.getByText('TypeScript 마이그레이션 전략')).toBeInTheDocument();
  });

  it('검색 기능이 작동한다', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <ProjectsList />
      </TestWrapper>
    );

    // 프로젝트 목록 로드 대기
    await waitFor(() => {
      expect(screen.getByText('사용자 인증 시스템 JWT 보안 강화')).toBeInTheDocument();
    });

    // 검색 입력
    const searchInput = screen.getByPlaceholderText('프로젝트 검색...');
    await user.type(searchInput, 'React');

    // 검색 결과 확인
    await waitFor(() => {
      expect(screen.getByText('React 컴포넌트 성능 최적화')).toBeInTheDocument();
      expect(screen.queryByText('사용자 인증 시스템 JWT 보안 강화')).not.toBeInTheDocument();
    });
  });

  it('상태 필터가 작동한다', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <ProjectsList />
      </TestWrapper>
    );

    // 프로젝트 목록 로드 대기
    await waitFor(() => {
      expect(screen.getByText('사용자 인증 시스템 JWT 보안 강화')).toBeInTheDocument();
    });

    // 상태 필터 선택
    const statusSelect = screen.getByRole('combobox');
    await user.click(statusSelect);

    // '완료' 상태 선택
    const doneOption = screen.getByText('완료');
    await user.click(doneOption);

    // 완료 상태 프로젝트만 표시되는지 확인
    await waitFor(() => {
      expect(screen.getByText('사용자 인증 시스템 JWT 보안 강화')).toBeInTheDocument();
      expect(screen.queryByText('React 컴포넌트 성능 최적화')).not.toBeInTheDocument();
    });
  });

  it('프로젝트 상태 배지가 올바르게 표시된다', async () => {
    render(
      <TestWrapper>
        <ProjectsList />
      </TestWrapper>
    );

    // 프로젝트 목록 로드 대기
    await waitFor(() => {
      expect(screen.getByText('완료')).toBeInTheDocument();
      expect(screen.getByText('리뷰')).toBeInTheDocument();
      expect(screen.getByText('리서치 중')).toBeInTheDocument();
      expect(screen.getByText('오류')).toBeInTheDocument();
    });
  });

  it('focus files가 올바르게 표시된다', async () => {
    render(
      <TestWrapper>
        <ProjectsList />
      </TestWrapper>
    );

    // 프로젝트 목록 로드 대기
    await waitFor(() => {
      // 파일명만 표시되는지 확인 (전체 경로가 아닌)
      expect(screen.getByText('jwt.ts')).toBeInTheDocument();
      expect(screen.getByText('auth.ts')).toBeInTheDocument();
      expect(screen.getByText('DataTable.tsx')).toBeInTheDocument();
    });
  });

  it('상세보기 링크가 올바르게 설정된다', async () => {
    render(
      <TestWrapper>
        <ProjectsList />
      </TestWrapper>
    );

    // 프로젝트 목록 로드 대기
    await waitFor(() => {
      const detailLinks = screen.getAllByText('상세보기');
      expect(detailLinks[0]?.closest('a')).toHaveAttribute('href', '/projects/sample-1');
    });
  });

  it('완료된 프로젝트에 명세서 링크가 표시된다', async () => {
    render(
      <TestWrapper>
        <ProjectsList />
      </TestWrapper>
    );

    // 프로젝트 목록 로드 대기
    await waitFor(() => {
      // 완료된 프로젝트에만 명세서 링크가 있는지 확인
      const specLinks = screen.getAllByText('명세서');
      expect(specLinks).toHaveLength(1); // 완료 상태인 프로젝트 1개만
    });
  });

  it('빈 상태가 올바르게 표시된다', async () => {
    // 빈 프로젝트 목록 반환하도록 MSW 오버라이드
    server.use(
      http.get('/api/v1/projects', () => {
        return HttpResponse.json({
          data: {
            projects: [],
            total: 0,
          },
          correlationId: crypto.randomUUID(),
        });
      })
    );

    render(
      <TestWrapper>
        <ProjectsList />
      </TestWrapper>
    );

    // 빈 상태 메시지 확인
    await waitFor(() => {
      expect(screen.getByText('프로젝트가 없습니다')).toBeInTheDocument();
      expect(screen.getByText('첫 번째 프로젝트를 생성해보세요')).toBeInTheDocument();
    });
  });

  it('에러 상태가 올바르게 처리된다', async () => {
    // 에러 응답 반환하도록 MSW 오버라이드
    server.use(
      http.get('/api/v1/projects', () => {
        return HttpResponse.json(
          {
            type: 'server-error',
            title: '서버 오류',
            status: 500,
            correlationId: crypto.randomUUID(),
          },
          { status: 500 }
        );
      })
    );

    render(
      <TestWrapper>
        <ProjectsList />
      </TestWrapper>
    );

    // 에러 메시지 확인
    await waitFor(() => {
      expect(screen.getByText('프로젝트 목록을 불러오는데 실패했습니다')).toBeInTheDocument();
      expect(screen.getByText('다시 시도')).toBeInTheDocument();
    });
  });

  it('새 프로젝트 버튼이 올바른 링크를 가진다', async () => {
    render(
      <TestWrapper>
        <ProjectsList />
      </TestWrapper>
    );

    // 새 프로젝트 버튼들이 올바른 링크를 가지는지 확인
    await waitFor(() => {
      const newProjectButtons = screen.getAllByText('새 프로젝트');
      newProjectButtons.forEach(button => {
        expect(button.closest('a')).toHaveAttribute('href', '/new');
      });
    });
  });

  it('결과 요약이 올바르게 표시된다', async () => {
    render(
      <TestWrapper>
        <ProjectsList />
      </TestWrapper>
    );

    // 결과 요약 확인
    await waitFor(() => {
      expect(screen.getByText(/총 \d+개의 프로젝트 중 \d+개 표시/)).toBeInTheDocument();
    });
  });
});
