import * as S from './index.css';
import { TimelineItem } from '.';

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

export const stageClassMap = {
  completed: S.timelineStageCompleted,
  current: S.timelineStageCurrent,
  pending: S.timelineStagePending,
};

export const dotClassMap = {
  completed: S.timelineDotCompleted,
  current: S.timelineDotCurrent,
  pending: S.timelineDotPending,
};

export function resolveTimelineStatus(item: TimelineItem) {
  if (item.completed) return 'completed';
  if (item.current) return 'current';
  return 'pending';
}
