import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OAuthCard } from '../oauth-card';

describe('OAuthCard', () => {
  const mockOnConnect = vi.fn();

  beforeEach(() => {
    mockOnConnect.mockClear();
  });

  it('GitHub OAuth 카드가 올바르게 렌더링됩니다', () => {
    render(
      <OAuthCard
        provider="github"
        isConnected={false}
        onConnect={mockOnConnect}
      />
    );

    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('연결 필요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '연결' })).toBeInTheDocument();
  });

  it('Notion OAuth 카드가 올바르게 렌더링됩니다', () => {
    render(
      <OAuthCard
        provider="notion"
        isConnected={false}
        onConnect={mockOnConnect}
      />
    );

    expect(screen.getByText('Notion')).toBeInTheDocument();
    expect(screen.getByText('연결 필요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '연결' })).toBeInTheDocument();
  });

  it('연결된 상태를 올바르게 표시합니다', () => {
    render(
      <OAuthCard
        provider="github"
        isConnected={true}
        onConnect={mockOnConnect}
      />
    );

    expect(screen.getByText('연결됨')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '연결' })).not.toBeInTheDocument();
  });

  it('로딩 상태를 올바르게 표시합니다', () => {
    render(
      <OAuthCard
        provider="github"
        isConnected={false}
        isLoading={true}
        onConnect={mockOnConnect}
      />
    );

    expect(screen.getByText('확인 중...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '연결' })).toBeDisabled();
  });

  it('연결 버튼 클릭 시 onConnect가 호출됩니다', () => {
    render(
      <OAuthCard
        provider="github"
        isConnected={false}
        onConnect={mockOnConnect}
      />
    );

    const connectButton = screen.getByRole('button', { name: '연결' });
    fireEvent.click(connectButton);

    expect(mockOnConnect).toHaveBeenCalledTimes(1);
  });

  it('isPending 상태에서 버튼이 비활성화됩니다', () => {
    render(
      <OAuthCard
        provider="github"
        isConnected={false}
        onConnect={mockOnConnect}
        isPending={true}
      />
    );

    const connectButton = screen.getByRole('button', { name: '연결' });
    expect(connectButton).toBeDisabled();
  });

  it('커스텀 className이 적용됩니다', () => {
    const { container } = render(
      <OAuthCard
        provider="github"
        isConnected={false}
        onConnect={mockOnConnect}
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
