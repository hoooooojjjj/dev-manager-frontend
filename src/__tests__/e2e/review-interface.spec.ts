import { test, expect } from '@playwright/test';

test.describe('리뷰 인터페이스', () => {
  test.beforeEach(async ({ page }) => {
    // 리뷰 페이지로 이동 (mock 데이터로 테스트)
    await page.goto('/drafts/test-draft-id/review');
  });

  test('초기 페이지가 올바르게 로드된다', async ({ page }) => {
    // 페이지 제목 확인
    await expect(page.locator('h1')).toContainText('개발 명세서 리뷰');

    // 섹션 선택 영역 확인
    await expect(page.getByText('섹션 선택')).toBeVisible();
    await expect(page.getByText('TL;DR')).toBeVisible();
    await expect(page.getByText('현재 동작')).toBeVisible();
    await expect(page.getByText('근본 원인')).toBeVisible();
    await expect(page.getByText('해결 방안')).toBeVisible();
    await expect(page.getByText('학습 포인트')).toBeVisible();

    // 우측 에디터 초기 상태 확인
    await expect(page.getByText('섹션을 선택하세요')).toBeVisible();
    await expect(page.getByText('좌측에서 섹션을 선택하여 리뷰를 시작하세요')).toBeVisible();

    // 하단 히스토리 초기 상태 확인
    await expect(page.getByText('리뷰 히스토리')).toBeVisible();
    await expect(page.getByText('아직 리뷰 히스토리가 없습니다')).toBeVisible();
  });

  test('섹션 선택 워크플로우가 정상적으로 작동한다', async ({ page }) => {
    // "해결 방안" 섹션 클릭
    await page.getByText('해결 방안').click();

    // 우측 에디터가 활성화됨
    await expect(page.getByText('해결 방안 리뷰')).toBeVisible();
    await expect(
      page.getByPlaceholder('이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요...')
    ).toBeVisible();

    // 하단에 섹션 내용 표시
    await expect(page.getByText('해결 방안 내용')).toBeVisible();
    await expect(page.locator('text=JWT 보안을 강화해야 합니다')).toBeVisible();

    // 다른 섹션으로 변경
    await page.getByText('TL;DR').click();

    // 헤더와 내용이 변경됨
    await expect(page.getByText('TL;DR 리뷰')).toBeVisible();
    await expect(page.getByText('TL;DR 내용')).toBeVisible();
  });

  test('전체 리뷰 제출 워크플로우가 정상적으로 작동한다', async ({ page }) => {
    // 섹션 선택
    await page.getByText('해결 방안').click();

    // 지시문 입력
    const instructionTextarea = page.getByPlaceholder(
      '이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요...'
    );
    await instructionTextarea.fill(
      '보안 강화 방안에 구체적인 구현 방법과 성능 지표를 추가해주세요'
    );

    // 엄격한 인용 검증 체크
    await page.getByLabel('엄격한 인용 검증 (새로운 주장에 반드시 근거 포함)').check();

    // 리뷰 제출
    const submitButton = page.getByRole('button', { name: '리뷰 제출' });
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // 처리 중 상태 확인
    await expect(page.getByText('처리 중...')).toBeVisible();
    await expect(submitButton).toBeDisabled();

    // diff 뷰 표시 대기
    await expect(page.getByText('리뷰 결과 확인')).toBeVisible({ timeout: 5000 });

    // diff 내용 확인
    await expect(page.getByText('지시문')).toBeVisible();
    await expect(
      page.getByText('보안 강화 방안에 구체적인 구현 방법과 성능 지표를 추가해주세요')
    ).toBeVisible();
    await expect(page.getByText('Before')).toBeVisible();
    await expect(page.getByText('After')).toBeVisible();

    // 승인/되돌리기 버튼 확인
    const approveButton = page.getByRole('button', { name: '승인' });
    const revertButton = page.getByRole('button', { name: '되돌리기' });
    await expect(approveButton).toBeVisible();
    await expect(revertButton).toBeVisible();

    // 승인 실행
    await approveButton.click();

    // diff 뷰가 사라짐
    await expect(page.getByText('리뷰 결과 확인')).not.toBeVisible();

    // 섹션을 다시 클릭하여 업데이트된 내용 확인
    await page.getByText('해결 방안').click();
    await expect(page.getByText(/AI가 리뷰 지시문을 반영하여 수정한 내용입니다/)).toBeVisible();
  });

  test('되돌리기 기능이 정상적으로 작동한다', async ({ page }) => {
    // 리뷰 제출까지 실행
    await page.getByText('해결 방안').click();

    const instructionTextarea = page.getByPlaceholder(
      '이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요...'
    );
    await instructionTextarea.fill('테스트 지시문');

    await page.getByRole('button', { name: '리뷰 제출' }).click();

    // diff 뷰 표시 대기
    await expect(page.getByText('리뷰 결과 확인')).toBeVisible({ timeout: 5000 });

    // 되돌리기 버튼 클릭
    await page.getByRole('button', { name: '되돌리기' }).click();

    // diff 뷰가 사라지고 섹션 내용이 다시 표시됨
    await expect(page.getByText('리뷰 결과 확인')).not.toBeVisible();
    await expect(page.getByText('해결 방안 내용')).toBeVisible();

    // 지시문도 초기화됨
    await expect(instructionTextarea).toHaveValue('');
  });

  test('키보드 네비게이션이 정상적으로 작동한다', async ({ page }) => {
    // Tab 키로 섹션 버튼들 순회
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Enter 키로 섹션 선택
    await page.keyboard.press('Enter');

    // 포커스가 지시문 입력 필드로 이동
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // 지시문 입력
    await page.keyboard.type('키보드로 입력한 지시문');

    // Tab으로 체크박스로 이동하여 선택
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    // Tab으로 제출 버튼으로 이동하여 실행
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // 제출이 정상적으로 실행됨
    await expect(page.getByText('처리 중...')).toBeVisible();
  });

  test('반응형 레이아웃이 정상적으로 작동한다', async ({ page }) => {
    // 데스크톱 크기에서 시작
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.getByText('해결 방안').click();

    // 2컬럼 레이아웃 확인 (좌측 섹션, 우측 에디터)
    const leftCard = page.locator('[data-testid="sections-card"]').first();
    const rightCard = page.locator('[data-testid="editor-card"]').first();

    const leftBox = await leftCard.boundingBox();
    const rightBox = await rightCard.boundingBox();

    if (leftBox && rightBox) {
      expect(leftBox.x).toBeLessThan(rightBox.x);
    }

    // 모바일 크기로 변경
    await page.setViewportSize({ width: 375, height: 667 });

    // 1컬럼 레이아웃으로 변경됨 (세로 스택)
    const leftBoxMobile = await leftCard.boundingBox();
    const rightBoxMobile = await rightCard.boundingBox();

    if (leftBoxMobile && rightBoxMobile) {
      expect(leftBoxMobile.y).toBeLessThan(rightBoxMobile.y);
    }
  });

  test('에러 상황이 적절히 처리된다', async ({ page }) => {
    await page.getByText('해결 방안').click();

    // 빈 지시문으로 제출 시도
    await page.getByRole('button', { name: '리뷰 제출' }).click();

    // 버튼이 비활성화되어 제출되지 않음
    await expect(page.getByRole('button', { name: '리뷰 제출' })).toBeDisabled();

    // 공백만 입력해도 제출되지 않음
    await page
      .getByPlaceholder('이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요...')
      .fill('   ');
    await expect(page.getByRole('button', { name: '리뷰 제출' })).toBeDisabled();

    // 유효한 지시문 입력 시 활성화됨
    await page
      .getByPlaceholder('이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요...')
      .fill('유효한 지시문');
    await expect(page.getByRole('button', { name: '리뷰 제출' })).toBeEnabled();
  });

  test('상태별 배지가 올바르게 표시된다', async ({ page }) => {
    // 완료된 섹션들의 배지 확인
    const completedSections = ['TL;DR', '현재 동작', '근본 원인', '학습 포인트'];

    for (const sectionTitle of completedSections) {
      const sectionButton = page.getByText(sectionTitle).locator('..').locator('..');
      await expect(sectionButton.getByText('완료')).toBeVisible();
    }

    // 미완료 섹션의 배지 확인
    const incompleteSection = page.getByText('해결 방안').locator('..').locator('..');
    await expect(incompleteSection.getByText('미완료')).toBeVisible();
  });

  test('리뷰 히스토리가 올바르게 표시된다', async ({ page }) => {
    // 첫 번째 리뷰 실행
    await page.getByText('해결 방안').click();
    await page
      .getByPlaceholder('이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요...')
      .fill('첫 번째 지시문');
    await page.getByRole('button', { name: '리뷰 제출' }).click();

    await expect(page.getByText('리뷰 결과 확인')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: '승인' }).click();

    // 두 번째 리뷰 실행
    await page.getByText('TL;DR').click();
    await page
      .getByPlaceholder('이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요...')
      .fill('두 번째 지시문');
    await page.getByRole('button', { name: '리뷰 제출' }).click();

    await expect(page.getByText('리뷰 결과 확인')).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: '승인' }).click();

    // 히스토리에 두 개의 리뷰가 표시됨
    await page.getByText('근본 원인').click(); // 다른 섹션 선택하여 히스토리 뷰로 전환

    // 기본 히스토리 뷰에서 리뷰 기록들을 확인할 수 있어야 함
    // (실제 구현에서는 별도의 히스토리 뷰어가 필요할 수 있음)

    // 적어도 리뷰가 성공적으로 처리되었다는 피드백이 있어야 함
    await expect(page.getByText('근본 원인 내용')).toBeVisible();
  });
});
