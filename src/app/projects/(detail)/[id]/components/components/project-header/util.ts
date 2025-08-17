export function getStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    idle: '대기',
    submitting: '제출 중',
    queued: '대기열',
    collecting: '수집 중',
    researching: '리서치 중',
    drafting: '초안 생성 중',
    review: '리뷰',
    publishing: '발행 중',
    done: '완료',
    error: '오류',
  };
  return statusLabels[status] || status;
}
