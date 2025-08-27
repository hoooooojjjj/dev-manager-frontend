import { useState } from 'react';
import { Review } from '../types';

/**
 * Diff 뷰 모드 및 대기 중인 리뷰 상태를 관리하는 커스텀 훅
 * Before/After 비교 화면과 승인 대기 중인 리뷰를 처리합니다.
 */
export function useDiffView() {
  const [showDiff, setShowDiff] = useState(false);
  const [pendingReview, setPendingReview] = useState<Review | null>(null);

  /**
   * 리뷰 Diff를 보여줍니다
   * @param review - 표시할 리뷰 데이터
   */
  const showReviewDiff = (review: Review) => {
    setPendingReview(review);
    setShowDiff(true);
  };

  /**
   * Diff 뷰를 숨기고 대기 중인 리뷰를 쳐리합니다
   */
  const hideDiff = () => {
    setShowDiff(false);
    setPendingReview(null);
  };

  /**
   * 대기 중인 리뷰만 쳐리합니다 (Diff 뷰는 유지)
   */
  const clearPendingReview = () => {
    setPendingReview(null);
  };

  return {
    showDiff,
    pendingReview,
    showReviewDiff,
    hideDiff,
    clearPendingReview,
  };
}