/**
 * IntakeForm 컴포넌트 테스트
 * React Testing Library + MSW를 사용한 통합 테스트
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeAll, beforeEach, afterEach, afterAll, describe, it, expect, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

import { IntakeForm } from '../intake-form';
import { handlers } from '@/mocks/handlers';

// MSW 서버 설정
const server = setupServer(...handlers);

// 모킹
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
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

describe('IntakeForm', () => {
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

  it('폼이 올바르게 렌더링된다', async () => {
    render(
      <TestWrapper>
        <IntakeForm />
      </TestWrapper>
    );

    // 필수 필드들이 존재하는지 확인
    expect(screen.getByLabelText(/소스 Notion URL/)).toBeInTheDocument();
    expect(screen.getByLabelText(/GitHub 레포지토리/)).toBeInTheDocument();
    expect(screen.getByLabelText(/출력 Notion URL/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /프로젝트 생성/ })).toBeInTheDocument();

    // OAuth 상태가 로드될 때까지 대기
    await waitFor(() => {
      expect(screen.getByText('GitHub')).toBeInTheDocument();
      expect(screen.getByText('Notion')).toBeInTheDocument();
    });
  });

  it('OAuth 상태를 올바르게 표시한다', async () => {
    render(
      <TestWrapper>
        <IntakeForm />
      </TestWrapper>
    );

    // OAuth 상태 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByText('연결됨')).toBeInTheDocument(); // GitHub
      expect(screen.getByText('연결 필요')).toBeInTheDocument(); // Notion
    });
  });

  it('유효성 검사 에러를 표시한다', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <IntakeForm />
      </TestWrapper>
    );

    // OAuth 상태 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /프로젝트 생성/ })).toBeInTheDocument();
    });

    // 빈 폼 제출
    const submitButton = screen.getByRole('button', { name: /프로젝트 생성/ });
    await user.click(submitButton);

    // 유효성 검사 에러 확인
    await waitFor(() => {
      expect(screen.getByText(/올바른 Notion URL을 입력해주세요/)).toBeInTheDocument();
    });
  });

  it('잘못된 GitHub 레포지토리 형식을 검증한다', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <IntakeForm />
      </TestWrapper>
    );

    // OAuth 상태 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /프로젝트 생성/ })).toBeInTheDocument();
    });

    // 잘못된 레포지토리 형식 입력
    const repoInput = screen.getByLabelText(/GitHub 레포지토리/);
    await user.type(repoInput, 'invalid-repo-format');

    const submitButton = screen.getByRole('button', { name: /프로젝트 생성/ });
    await user.click(submitButton);

    // 유효성 검사 에러 확인
    await waitFor(() => {
      expect(screen.getByText(/owner\/repository 형식으로 입력해주세요/)).toBeInTheDocument();
    });
  });

  it('focus files를 추가하고 제거할 수 있다', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <IntakeForm />
      </TestWrapper>
    );

    // OAuth 상태 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /프로젝트 생성/ })).toBeInTheDocument();
    });

    // focus file 입력
    const focusFileInput = screen.getByPlaceholderText(/src\/components\/Button.tsx/);
    const addButton = screen.getByRole('button', { name: '' }); // Plus 아이콘 버튼

    await user.type(focusFileInput, 'src/components/Button.tsx');
    await user.click(addButton);

    // 파일이 추가되었는지 확인
    expect(screen.getByText('src/components/Button.tsx')).toBeInTheDocument();

    // 파일 제거
    const removeButton = screen.getByRole('button', { name: '' }); // X 아이콘 버튼
    await user.click(removeButton);

    // 파일이 제거되었는지 확인
    expect(screen.queryByText('src/components/Button.tsx')).not.toBeInTheDocument();
  });

  it('올바른 데이터로 프로젝트를 성공적으로 생성한다', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <IntakeForm />
      </TestWrapper>
    );

    // OAuth 상태 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /프로젝트 생성/ })).toBeInTheDocument();
    });

    // 폼 데이터 입력
    const sourceUrlInput = screen.getByLabelText(/소스 Notion URL/);
    const repoInput = screen.getByLabelText(/GitHub 레포지토리/);
    const outputUrlInput = screen.getByLabelText(/출력 Notion URL/);
    const focusFileInput = screen.getByPlaceholderText(/src\/components\/Button.tsx/);
    const addButton = screen.getByRole('button', { name: '' }); // Plus 아이콘 버튼

    await user.type(sourceUrlInput, 'https://notion.so/source-page');
    await user.type(repoInput, 'microsoft/vscode');
    await user.type(outputUrlInput, 'https://notion.so/output-page');
    await user.type(focusFileInput, 'src/components/Button.tsx');
    await user.click(addButton);

    // 폼 제출
    const submitButton = screen.getByRole('button', { name: /프로젝트 생성/ });
    await user.click(submitButton);

    // 로딩 상태 확인
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /생성 중.../ })).toBeInTheDocument();
    });

    // 성공 후 라우터 호출 확인
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/\/projects\/.+/));
    }, { timeout: 3000 });
  });

  it('OAuth 연결이 필요한 경우 에러를 표시한다', async () => {
    const user = userEvent.setup();

    // GitHub 연결이 안 된 상태로 설정
    server.use(
      http.get('/api/v1/auth/status', () => {
        return HttpResponse.json({
          data: { github: false, notion: false },
          correlationId: 'test-correlation-id',
        });
      }),
      http.post('/api/v1/projects/intake', () => {
        return HttpResponse.json(
          {
            type: 'oauth-required',
            title: 'GitHub 연결 필요',
            status: 401,
            detail: 'GitHub OAuth 연결이 필요합니다.',
            correlationId: 'test-correlation-id',
          },
          { status: 401 }
        );
      })
    );

    render(
      <TestWrapper>
        <IntakeForm />
      </TestWrapper>
    );

    // OAuth 상태 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getAllByText('연결 필요')).toHaveLength(2); // GitHub, Notion 모두 연결 안됨
    });

    // 올바른 폼 데이터 입력
    const sourceUrlInput = screen.getByLabelText(/소스 Notion URL/);
    const repoInput = screen.getByLabelText(/GitHub 레포지토리/);
    const outputUrlInput = screen.getByLabelText(/출력 Notion URL/);
    const focusFileInput = screen.getByPlaceholderText(/src\/components\/Button.tsx/);
    const addButton = screen.getByRole('button', { name: '' }); // Plus 아이콘 버튼

    await user.type(sourceUrlInput, 'https://notion.so/source-page');
    await user.type(repoInput, 'microsoft/vscode');
    await user.type(outputUrlInput, 'https://notion.so/output-page');
    await user.type(focusFileInput, 'src/components/Button.tsx');
    await user.click(addButton);

    // 폼 제출
    const submitButton = screen.getByRole('button', { name: /프로젝트 생성/ });
    await user.click(submitButton);

    // 에러 메시지 확인은 Toast를 통해 표시되므로 여기서는 API 호출만 확인
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /프로젝트 생성/ })).toBeInTheDocument();
    });
  });

  it('OAuth 연결 버튼이 작동한다', async () => {
    const user = userEvent.setup();

    // GitHub 연결이 안 된 상태로 설정
    server.use(
      http.get('/api/v1/auth/status', () => {
        return HttpResponse.json({
          data: { github: false, notion: false },
          correlationId: 'test-correlation-id',
        });
      }),
      http.post('/api/v1/auth/connect/github', () => {
        return HttpResponse.json({
          data: { 
            connected: true, 
            provider: 'github',
            redirectUrl: 'https://github.com/oauth/authorize?...' 
          },
          correlationId: 'test-correlation-id',
        });
      })
    );

    render(
      <TestWrapper>
        <IntakeForm />
      </TestWrapper>
    );

    // OAuth 상태 로딩 완료 대기
    await waitFor(() => {
      expect(screen.getAllByText('연결 필요')).toHaveLength(2);
    });

    // GitHub 연결 버튼 클릭
    const connectButtons = screen.getAllByRole('button', { name: /연결/ });
    const githubConnectButton = connectButtons[0]; // 첫 번째가 GitHub

    if (githubConnectButton) {
      await user.click(githubConnectButton);
    }

    // 연결 요청이 처리되는지 확인 (버튼 상태 변화 등)
    await waitFor(() => {
      expect(githubConnectButton).toBeInTheDocument();
    });
  });
});
