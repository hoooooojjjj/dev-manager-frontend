import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReviewInterface } from './index';

// Mock the CSS module
vi.mock('./index.css', () => ({
  container: 'container',
  sectionsContainer: 'sectionsContainer',
  sectionButton: 'sectionButton',
  sectionButtonSelected: 'sectionButtonSelected',
  sectionTitle: 'sectionTitle',
  badge: 'badge',
  reviewFormContainer: 'reviewFormContainer',
  instructionContainer: 'instructionContainer',
  minHeightTextarea: 'minHeightTextarea',
  checkboxContainer: 'checkboxContainer',
  checkboxLabel: 'checkboxLabel',
  submitButton: 'submitButton',
  buttonIcon: 'buttonIcon',
  spinningIcon: 'spinningIcon',
  emptyState: 'emptyState',
  emptyIcon: 'emptyIcon',
  fullWidthCard: 'fullWidthCard',
  diffHeader: 'diffHeader',
  historyContainer: 'historyContainer',
  historyItem: 'historyItem',
  historyHeader: 'historyHeader',
  historyMeta: 'historyMeta',
  historyTimestamp: 'historyTimestamp',
  historyActions: 'historyActions',
  historyContent: 'historyContent',
  instructionSection: 'instructionSection',
  instructionTitle: 'instructionTitle',
  instructionText: 'instructionText',
  diffGrid: 'diffGrid',
  diffSection: 'diffSection',
  beforeDiff: 'beforeDiff',
  afterDiff: 'afterDiff',
  iconDestructive: 'iconDestructive',
  iconSuccess: 'iconSuccess',
  sectionContentContainer: 'sectionContentContainer',
  sectionContent: 'sectionContent',
  sectionContentTitle: 'sectionContentTitle',
  sectionContentText: 'sectionContentText',
}));

describe('ReviewInterface', () => {
  const mockDraftId = 'test-draft-id';
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('초기 상태에서 올바르게 렌더링된다', () => {
    render(<ReviewInterface draftId={mockDraftId} />);

    // 섹션 선택 영역 확인
    expect(screen.getByText('섹션 선택')).toBeInTheDocument();
    expect(screen.getByText('TL;DR')).toBeInTheDocument();
    expect(screen.getByText('현재 동작')).toBeInTheDocument();
    expect(screen.getByText('근본 원인')).toBeInTheDocument();
    expect(screen.getByText('해결 방안')).toBeInTheDocument();
    expect(screen.getByText('학습 포인트')).toBeInTheDocument();

    // 우측 에디터 영역 - 초기 상태
    expect(screen.getByText('섹션을 선택하세요')).toBeInTheDocument();
    expect(screen.getByText('좌측에서 섹션을 선택하여 리뷰를 시작하세요')).toBeInTheDocument();

    // 하단 영역 - 초기 상태 (리뷰 히스토리)
    expect(screen.getByText('리뷰 히스토리')).toBeInTheDocument();
    expect(screen.getByText('아직 리뷰 히스토리가 없습니다')).toBeInTheDocument();
  });

  it('섹션을 선택하면 해당 섹션의 내용이 하단에 표시된다', async () => {
    render(<ReviewInterface draftId={mockDraftId} />);

    // "해결 방안" 섹션 클릭
    const solutionsButton = screen.getByText('해결 방안').closest('button');
    expect(solutionsButton).toBeInTheDocument();

    await user.click(solutionsButton!);

    // 우측 에디터가 활성화됨
    expect(screen.getByText('해결 방안 리뷰')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요...')
    ).toBeInTheDocument();

    // 하단에 섹션 내용 표시됨
    expect(screen.getByText('해결 방안 내용')).toBeInTheDocument();
    expect(screen.getByText(/JWT 보안을 강화해야 합니다/)).toBeInTheDocument();

    // 선택된 버튼 스타일이 적용됨
    expect(solutionsButton).toHaveClass('sectionButtonSelected');
  });

  it('리뷰 제출 시 diff 뷰가 표시된다', async () => {
    render(<ReviewInterface draftId={mockDraftId} />);

    // 섹션 선택
    const solutionsButton = screen.getByText('해결 방안').closest('button');
    await user.click(solutionsButton!);

    // 지시문 입력
    const textarea = screen.getByPlaceholderText(
      '이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요...'
    );
    await user.type(textarea, '보안 강화 방안에 구체적인 구현 방법을 추가해주세요');

    // 리뷰 제출
    const submitButton = screen.getByRole('button', { name: /리뷰 제출/ });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    // 처리 중 상태 확인
    expect(screen.getByText('처리 중...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // diff 뷰가 표시될 때까지 대기
    await waitFor(
      () => {
        expect(screen.getByText('리뷰 결과 확인')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // diff 내용 확인
    expect(screen.getByText('지시문')).toBeInTheDocument();
    expect(
      screen.getByText('보안 강화 방안에 구체적인 구현 방법을 추가해주세요')
    ).toBeInTheDocument();
    expect(screen.getByText('Before')).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();

    // 승인/되돌리기 버튼 확인
    expect(screen.getByRole('button', { name: /승인/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /되돌리기/ })).toBeInTheDocument();
  });

  it('승인 버튼 클릭 시 변경사항이 적용되고 히스토리에 추가된다', async () => {
    render(<ReviewInterface draftId={mockDraftId} />);

    // 섹션 선택하고 리뷰 제출
    const solutionsButton = screen.getByText('해결 방안').closest('button');
    await user.click(solutionsButton!);

    const textarea = screen.getByPlaceholderText(
      '이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요...'
    );
    await user.type(textarea, '테스트 지시문');

    const submitButton = screen.getByRole('button', { name: /리뷰 제출/ });
    await user.click(submitButton);

    // diff 뷰 표시 대기
    await waitFor(
      () => {
        expect(screen.getByText('리뷰 결과 확인')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // 승인 버튼 클릭
    const approveButton = screen.getByRole('button', { name: /승인/ });
    await user.click(approveButton);

    // diff 뷰가 사라지고 히스토리로 이동
    await waitFor(() => {
      expect(screen.queryByText('리뷰 결과 확인')).not.toBeInTheDocument();
    });

    // 섹션을 다시 클릭하여 업데이트된 내용 확인
    await user.click(solutionsButton!);

    // 업데이트된 내용이 표시되는지 확인 (AI가 수정한 내용)
    expect(screen.getByText(/AI가 리뷰 지시문을 반영하여 수정한 내용입니다/)).toBeInTheDocument();
  });

  it('되돌리기 버튼 클릭 시 diff 뷰가 닫힌다', async () => {
    render(<ReviewInterface draftId={mockDraftId} />);

    // 섹션 선택하고 리뷰 제출
    const solutionsButton = screen.getByText('해결 방안').closest('button');
    await user.click(solutionsButton!);

    const textarea = screen.getByPlaceholderText(
      '이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요...'
    );
    await user.type(textarea, '테스트 지시문');

    const submitButton = screen.getByRole('button', { name: /리뷰 제출/ });
    await user.click(submitButton);

    // diff 뷰 표시 대기
    await waitFor(
      () => {
        expect(screen.getByText('리뷰 결과 확인')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // 되돌리기 버튼 클릭
    const revertButton = screen.getByRole('button', { name: /되돌리기/ });
    await user.click(revertButton);

    // diff 뷰가 사라지고 섹션 내용이 다시 표시됨
    expect(screen.queryByText('리뷰 결과 확인')).not.toBeInTheDocument();
    expect(screen.getByText('해결 방안 내용')).toBeInTheDocument();
  });

  it('엄격한 인용 검증 체크박스가 동작한다', async () => {
    render(<ReviewInterface draftId={mockDraftId} />);

    // 섹션 선택
    const solutionsButton = screen.getByText('해결 방안').closest('button');
    await user.click(solutionsButton!);

    // 체크박스 찾기
    const checkbox = screen.getByLabelText('엄격한 인용 검증 (새로운 주장에 반드시 근거 포함)');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // 체크박스 클릭
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    // 다시 클릭하여 해제
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('지시문이 없으면 제출 버튼이 비활성화된다', async () => {
    render(<ReviewInterface draftId={mockDraftId} />);

    // 섹션 선택
    const solutionsButton = screen.getByText('해결 방안').closest('button');
    await user.click(solutionsButton!);

    const submitButton = screen.getByRole('button', { name: /리뷰 제출/ });

    // 초기 상태에서는 비활성화
    expect(submitButton).toBeDisabled();

    // 지시문 입력
    const textarea = screen.getByPlaceholderText(
      '이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요...'
    );
    await user.type(textarea, '테스트 지시문');

    // 활성화됨
    expect(submitButton).toBeEnabled();

    // 지시문 삭제
    await user.clear(textarea);

    // 다시 비활성화
    expect(submitButton).toBeDisabled();
  });

  it('상태별 배지가 올바르게 표시된다', () => {
    render(<ReviewInterface draftId={mockDraftId} />);

    // 완료된 섹션들
    const completedSections = ['TL;DR', '현재 동작', '근본 원인', '학습 포인트'];
    completedSections.forEach((sectionTitle) => {
      const sectionButton = screen.getByText(sectionTitle).closest('button');
      expect(sectionButton).toBeInTheDocument();
      expect(sectionButton!.textContent).toContain('완료');
    });

    // 미완료 섹션
    const incompleteSection = screen.getByText('해결 방안').closest('button');
    expect(incompleteSection).toBeInTheDocument();
    expect(incompleteSection!.textContent).toContain('미완료');
  });
});
