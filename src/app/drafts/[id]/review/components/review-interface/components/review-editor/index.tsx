'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/components/Button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageSquare, Send, Clock } from 'lucide-react';
import { Section } from '../../types';
import * as S from './index.css';

/**
 * 리뷰 에디터 컴포넌트 Props
 */
interface ReviewEditorProps {
  /** 선택된 섹션 (리뷰 대상) */
  selectedSection: Section | null;
  /** 사용자 수정 지시문 */
  instruction: string;
  /** 엄격한 인용 검증 옵션 */
  strictCitation: boolean;
  /** AI 처리 중 여부 */
  isProcessing: boolean;
  /** 지시문 변경 시 호출되는 콜백 */
  onInstructionChange: (value: string) => void;
  /** 엄격한 인용 옵션 단께 시 호출되는 콜백 */
  onStrictCitationChange: (checked: boolean) => void;
  /** 리뷰 제출 시 호출되는 콜백 */
  onSubmitReview: () => void;
}

/**
 * 사용자가 리뷰 지시문을 입력하고 AI 리뷰를 요청하는 컴포넌트
 *
 * 수정 지시문 입력, 엄격한 인용 검증 옵션 선택,
 * 그리고 리뷰 제출 기능을 제공합니다.
 *
 * @param props - ReviewEditorProps
 */
export function ReviewEditor({
  selectedSection,
  instruction,
  strictCitation,
  isProcessing,
  onInstructionChange,
  onStrictCitationChange,
  onSubmitReview,
}: ReviewEditorProps) {
  return (
    <Card className={S.card}>
      <CardHeader>
        <CardTitle className={S.diffHeader}>
          <h3 style={{ margin: '0' }}>
            {selectedSection ? `${selectedSection.title} 리뷰` : '섹션을 선택하세요'}
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedSection ? (
          <div className={S.reviewFormContainer}>
            {/* 지시문 입력 */}
            <div className={S.instructionContainer}>
              <Label htmlFor="instruction">수정 지시문</Label>
              <Textarea
                id="instruction"
                placeholder="이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요..."
                value={instruction}
                onChange={(e) => onInstructionChange(e.target.value)}
                className={S.minHeightTextarea}
              />
            </div>

            {/* 옵션 */}
            <div className={S.checkboxContainer}>
              <Checkbox
                id="strict_citation"
                checked={strictCitation}
                onCheckedChange={(checked) => onStrictCitationChange(checked as boolean)}
              />
              <Label htmlFor="strict_citation" className={S.checkboxLabel}>
                엄격한 인용 검증 (새로운 주장에 반드시 근거 포함)
              </Label>
            </div>

            {/* 제출 버튼 */}
            <Button
              onClick={onSubmitReview}
              disabled={!instruction.trim() || isProcessing}
              className={S.submitButton}
            >
              {isProcessing ? (
                <>
                  <Clock className={S.spinningIcon} />
                  처리 중...
                </>
              ) : (
                <>
                  <Send className={S.buttonIcon} />
                  리뷰 제출
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className={S.emptyState}>
            <MessageSquare className={S.emptyIcon} />
            <p>좌측에서 섹션을 선택하여 리뷰를 시작하세요</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
