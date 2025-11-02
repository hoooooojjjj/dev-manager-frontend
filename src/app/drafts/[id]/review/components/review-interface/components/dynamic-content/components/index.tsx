'use client';

import { useState } from 'react';
import {
  ChevronDown,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  History,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import * as S from './index.css';

export interface ReviewHistoryItem {
  id: string;
  sectionId: string;
  sectionTitle: string;
  originalContent: string;
  reviewPrompt: string;
  revisedContent: string;
  timestamp: string;
  status: 'applied' | 'pending' | 'reverted';
}

interface ReviewHistoryProps {
  reviews: ReviewHistoryItem[];
  sectionTitle?: string;
  onRevert?: (reviewId: string) => void;
  onReapply?: (reviewId: string) => void;
}

interface ReviewCardProps {
  review: ReviewHistoryItem;
  index: number;
  onRevert?: ((reviewId: string) => void) | undefined;
  onReapply?: ((reviewId: string) => void) | undefined;
}

function ReviewCard({ review, index, onRevert, onReapply }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength: number = 60) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const getStatusIcon = () => {
    switch (review.status) {
      case 'applied':
        return <CheckCircle2 size={14} className={S.appliedStatus} />;
      case 'pending':
        return <Clock size={14} className={S.pendingStatus} />;
      case 'reverted':
        return <XCircle size={14} className={S.revertedStatus} />;
    }
  };

  const getStatusText = () => {
    switch (review.status) {
      case 'applied':
        return '적용됨';
      case 'pending':
        return '대기중';
      case 'reverted':
        return '되돌림';
    }
  };

  return (
    <div className={isExpanded ? S.reviewCardExpanded : S.reviewCard}>
      {/* 카드 헤더 */}
      <div className={S.cardHeader} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={S.headerLeft}>
          <div className={S.reviewNumber}>{index + 1}</div>

          <div className={S.reviewSummary}>
            <div className={S.summaryTitle}>{truncateText(review.reviewPrompt)}</div>
            <div className={S.summaryMeta}>
              <span>{formatTimestamp(review.timestamp)}</span>
              <ArrowRight size={12} />
              <div className={S.statusBadge}>
                {getStatusIcon()}
                <span>{getStatusText()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={S.headerRight}>
          <ChevronDown size={20} className={isExpanded ? S.expandIconRotated : S.expandIcon} />
        </div>
      </div>

      {/* 카드 콘텐츠 */}
      {isExpanded && (
        <div className={S.cardContent}>
          {/* 지시문 */}
          <div className={S.instructionSection}>
            <h4 className={S.sectionTitle}>
              <MessageSquare size={16} />
              지시문
            </h4>
            <div className={S.instructionText}>{review.reviewPrompt}</div>
          </div>

          {/* Before/After Diff */}
          <div className={S.diffContainer}>
            <div className={S.diffSection}>
              <h4 className={S.beforeHeader}>
                <XCircle size={16} />
                Before
              </h4>
              <div className={S.beforeContent}>{review.originalContent}</div>
            </div>

            <div className={S.diffSection}>
              <h4 className={S.afterHeader}>
                <CheckCircle2 size={16} />
                After
              </h4>
              <div className={S.afterContent}>{review.revisedContent}</div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className={S.actionsContainer}>
            <Badge variant="outline" className={S.statusBadge}>
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </Badge>

            <div className={S.actionButtons}>
              {review.status === 'applied' && onRevert && (
                <Button variant="outline" size="sm" onClick={() => onRevert(review.id)}>
                  <RotateCcw size={14} />
                  되돌리기
                </Button>
              )}
              {review.status === 'reverted' && onReapply && (
                <Button variant="outline" size="sm" onClick={() => onReapply(review.id)}>
                  <CheckCircle2 size={14} />
                  재적용
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ReviewHistory({ reviews, sectionTitle, onRevert, onReapply }: ReviewHistoryProps) {
  if (reviews.length === 0) {
    return (
      <div className={S.emptyState}>
        <History className={S.emptyIcon} />
        <p>
          {sectionTitle
            ? `${sectionTitle} 섹션의 리뷰 히스토리가 없습니다`
            : '아직 리뷰 히스토리가 없습니다'}
        </p>
        <p>AI와 함께 명세서를 개선해보세요.</p>
      </div>
    );
  }

  // 최신 리뷰부터 표시 (역순 정렬)
  const sortedReviews = [...reviews].reverse();

  return (
    <div className={S.historyContainer}>
      {sortedReviews.map((review, index) => (
        <ReviewCard
          key={review.id}
          review={review}
          index={sortedReviews.length - index - 1} // 역순이므로 번호 조정
          onRevert={onRevert}
          onReapply={onReapply}
        />
      ))}
    </div>
  );
}
