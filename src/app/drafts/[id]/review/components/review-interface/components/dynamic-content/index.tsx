'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RotateCcw, History } from 'lucide-react';
import { Flex } from '@/components/ui/flex';
import { Section, Review } from '../../types';
import { ReviewHistory, type ReviewHistoryItem } from '../review-history';
import * as S from './index.css';

/**
 * 동적 콘텐츠 컴포넌트 Props
 */
interface DynamicContentProps {
  /** 선택된 섹션 */
  selectedSection: Section | null;
  /** Diff 뷰 보여준 여부 */
  showDiff: boolean;
  /** 승인 대기 중인 리뷰 */
  pendingReview: Review | null;
  /** 전체 리뷰 목록 */
  reviews: Review[];
  /** 섹션별 리뷰 히스토리 */
  sectionReviews: Record<string, ReviewHistoryItem[]>;
  /** 리뷰 승인 콜백 */
  onApproveReview: () => void;
  /** 리뷰 거부 콜백 */
  onRevertReview: () => void;
  /** 히스토리 리뷰 되돌리기 콜백 */
  onRevertHistoryItem: (reviewId: string) => void;
  /** 히스토리 리뷰 재적용 콜백 */
  onReapplyReview: (reviewId: string) => void;
}

/**
 * 리뷰 인터페이스의 메인 콘텐츠 영역
 * 
 * 상황에 따라 다른 콘텐츠를 동적으로 표시합니다:
 * - Before/After Diff 보기 (pendingReview가 있고 showDiff가 true인 경우)
 * - 선택된 섹션의 현재 내용 보기
 * - 전체 리뷰 히스토리 보기
 * - 빈 상태 메시지
 * 
 * @param props - DynamicContentProps
 */
export function DynamicContent({
  selectedSection,
  showDiff,
  pendingReview,
  reviews,
  sectionReviews,
  onApproveReview,
  onRevertReview,
  onRevertHistoryItem,
  onReapplyReview,
}: DynamicContentProps) {
  const renderDiffView = () => {
    if (!pendingReview) return null;

    return (
      <div className={S.historyContainer}>
        <div className={S.historyItem}>
          <div className={S.historyHeader}>
            <div className={S.historyMeta}>
              <Badge variant="outline">{pendingReview.sectionTitle}</Badge>
              <span className={S.historyTimestamp}>검토 중</span>
            </div>
            <div className={S.historyActions}>
              <Button variant="outline" size="sm" onClick={onRevertReview}>
                <RotateCcw className={S.buttonIcon} />
                되돌리기
              </Button>
              <Button variant="default" size="sm" onClick={onApproveReview}>
                <CheckCircle2 className={S.buttonIcon} />
                승인
              </Button>
            </div>
          </div>

          <div className={S.historyContent}>
            <div className={S.instructionSection}>
              <h4 className={S.instructionTitle}>지시문</h4>
              <p className={S.instructionText}>{pendingReview.reviewPrompt}</p>
            </div>

            <div className={S.diffGrid}>
              <div className={S.diffSection}>
                <h4 className={S.diffHeader}>
                  <XCircle className={`h-4 w-4 ${S.iconDestructive}`} />
                  Before
                </h4>
                <div className={S.beforeDiff}>{pendingReview.originalContent}</div>
              </div>

              <div className={S.diffSection}>
                <h4 className={S.diffHeader}>
                  <CheckCircle2 className={`h-4 w-4 ${S.iconSuccess}`} />
                  After
                </h4>
                <div className={S.afterDiff}>{pendingReview.revisedContent}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSectionContent = () => {
    if (!selectedSection) return null;

    return (
      <div className={S.sectionContentContainer}>
        <div className={S.sectionContent}>
          <h3 className={S.sectionContentTitle}>{selectedSection.title} 현재 내용</h3>
          <div className={S.sectionContentText}>{selectedSection.content}</div>
        </div>
      </div>
    );
  };

  const renderReviewHistory = () => {
    if (reviews.length === 0) return null;

    return (
      <div className={S.historyContainer}>
        {reviews.map((review) => (
          <div key={review.id} className={S.historyItem}>
            <div className={S.historyHeader}>
              <div className={S.historyMeta}>
                <Badge variant="outline">{review.sectionTitle}</Badge>
                <span className={S.historyTimestamp}>
                  {new Date(review.timestamp).toLocaleString('ko-KR')}
                </span>
              </div>
            </div>

            <div className={S.historyContent}>
              <div className={S.instructionSection}>
                <h4 className={S.instructionTitle}>지시문</h4>
                <p className={S.instructionText}>{review.reviewPrompt}</p>
              </div>

              <div className={S.diffGrid}>
                <div className={S.diffSection}>
                  <h4 className={S.diffHeader}>
                    <XCircle className={`h-4 w-4 ${S.iconDestructive}`} />
                    Before
                  </h4>
                  <div className={S.beforeDiff}>{review.originalContent}</div>
                </div>

                <div className={S.diffSection}>
                  <h4 className={S.diffHeader}>
                    <CheckCircle2 className={`h-4 w-4 ${S.iconSuccess}`} />
                    After
                  </h4>
                  <div className={S.afterDiff}>{review.revisedContent}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderEmptyState = () => (
    <div className={S.emptyState}>
      <History className={S.emptyIcon} />
      <p>아직 리뷰 히스토리가 없습니다</p>
    </div>
  );

  const getTitle = () => {
    if (showDiff && pendingReview) return '리뷰 결과 확인';
    if (selectedSection) return `${selectedSection.title} 내용`;
    return '리뷰 히스토리';
  };

  const renderContent = () => {
    if (showDiff && pendingReview) return renderDiffView();
    if (selectedSection && !showDiff) return renderSectionContent();
    if (reviews.length > 0) return renderReviewHistory();
    return renderEmptyState();
  };

  return (
    <>
      {/* 메인 동적 콘텐츠 영역 */}
      <Card className={S.fullWidthCard}>
        <CardHeader>
          <CardTitle>
            <Flex justify="center" gap={4} align="center">
              <History className="h-5 w-5" />
              {getTitle()}
            </Flex>
          </CardTitle>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>

      {/* 섹션별 리뷰 히스토리 */}
      {selectedSection && (sectionReviews[selectedSection.id]?.length ?? 0) > 0 && (
        <Card className={S.fullWidthCard}>
          <CardHeader>
            <CardTitle>
              <History className="h-5 w-5" />
              {selectedSection.title} 리뷰 히스토리
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ReviewHistory
              reviews={sectionReviews[selectedSection.id] || []}
              sectionTitle={selectedSection.title}
              onRevert={onRevertHistoryItem}
              onReapply={onReapplyReview}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}