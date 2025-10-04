import { useState } from 'react';
import { Review } from '../types';
import { ReviewHistoryItem } from '../components/dynamic-content/components';

/**
 * 리뷰 히스토리 및 섹션별 리뷰 관리를 담당하는 커스텀 훅
 * 전체 리뷰 목록과 섹션별 리뷰 데이터를 관리합니다.
 */
export function useReviewHistory() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sectionReviews, setSectionReviews] = useState<Record<string, ReviewHistoryItem[]>>({});

  /**
   * 새로운 리뷰를 전체 리뷰 목록에 추가합니다
   * @param review - 추가할 리뷰
   */
  const addReview = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
  };

  /**
   * 특정 섹션에 대한 리뷰 아이템을 추가합니다
   * @param sectionId - 섹션 ID
   * @param reviewItem - 추가할 리뷰 아이템
   */
  const addSectionReview = (sectionId: string, reviewItem: ReviewHistoryItem) => {
    setSectionReviews((prev) => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), reviewItem],
    }));
  };

  /**
   * 섹션 리뷰의 상태를 업데이트합니다
   * @param sectionId - 섹션 ID
   * @param reviewId - 리뷰 ID
   * @param status - 새로운 상태 ('applied' | 'reverted')
   */
  const updateSectionReviewStatus = (
    sectionId: string,
    reviewId: string,
    status: 'applied' | 'reverted'
  ) => {
    setSectionReviews((prev) => ({
      ...prev,
      [sectionId]: (prev[sectionId] || []).map((review) =>
        review.id === reviewId ? { ...review, status } : review
      ),
    }));
  };

  /**
   * 특정 섹션의 모든 리뷰를 가져옵니다
   * @param sectionId - 섹션 ID
   * @returns 섹션에 속한 리뷰 목록
   */
  const getSectionReviews = (sectionId: string) => {
    return sectionReviews[sectionId] || [];
  };

  /**
   * 섹션에서 특정 ID를 가진 리뷰를 찾습니다
   * @param sectionId - 섹션 ID
   * @param reviewId - 리뷰 ID
   * @returns 찾은 리뷰 또는 undefined
   */
  const getReviewById = (sectionId: string, reviewId: string) => {
    return getSectionReviews(sectionId).find((review) => review.id === reviewId);
  };

  return {
    reviews,
    sectionReviews,
    addReview,
    addSectionReview,
    updateSectionReviewStatus,
    getSectionReviews,
    getReviewById,
  };
}
