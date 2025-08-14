'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageSquare, Send, CheckCircle2, XCircle, RotateCcw, Clock } from 'lucide-react';
import {
  container,
  fullWidthCard,
  sectionsContainer,
  sectionButton,
  sectionButtonSelected,
  sectionTitle,
  reviewFormContainer,
  instructionContainer,
  minHeightTextarea,
  checkboxContainer,
  checkboxLabel,
  submitButton,
  buttonIcon,
  spinningIcon,
  historyContainer,
  historyItem,
  historyHeader,
  historyMeta,
  historyTimestamp,
  historyActions,
  historyContent,
  instructionSection,
  instructionTitle,
  instructionText,
  diffGrid,
  diffSection,
  diffHeader,
  beforeDiff,
  afterDiff,
  iconDestructive,
  iconSuccess,
} from './review-interface.css';

interface ReviewInterfaceProps {
  draftId: string;
}

export function ReviewInterface({}: ReviewInterfaceProps) {
  const [selectedSection, setSelectedSection] = useState('solutions');
  const [instruction, setInstruction] = useState('');
  const [strictCitation, setStrictCitation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const sections = [
    { id: 'summary', title: 'TL;DR', status: 'completed' },
    { id: 'current_behavior', title: '현재 동작', status: 'completed' },
    { id: 'root_cause', title: '근본 원인', status: 'completed' },
    { id: 'solutions', title: '해결 방안', status: 'needs_work' },
    { id: 'learning_points', title: '학습 포인트', status: 'completed' },
  ];

  const reviewHistory = [
    {
      id: '1',
      section: 'solutions',
      instruction: '보안 강화 방안에 구체적인 구현 방법과 성능 지표를 추가해주세요',
      status: 'completed',
      timestamp: '2024-01-15T15:30:00Z',
      before: 'JWT 보안을 강화해야 합니다.',
      after:
        'JWT 보안 강화를 위해 다음 방안을 구현합니다:\n1. 토큰 만료 시간을 24시간에서 15분으로 단축\n2. 리프레시 토큰 로테이션 구현 (Redis 기반)\n3. 성능 영향: 토큰 검증 < 5ms',
    },
  ];

  const handleSubmitReview = async () => {
    if (!instruction.trim()) return;

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setInstruction('');
    }, 3000);
  };

  return (
    <div className={container}>
      {/* 좌측: 섹션 선택 */}
      <Card>
        <CardHeader>
          <CardTitle>섹션 선택</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={sectionsContainer}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={selectedSection === section.id ? sectionButtonSelected : sectionButton}
              >
                <span className={sectionTitle}>{section.title}</span>
                <Badge
                  variant={
                    section.status === 'completed'
                      ? 'default'
                      : section.status === 'needs_work'
                        ? 'secondary'
                        : 'outline'
                  }
                >
                  {section.status === 'completed' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                  {section.status === 'needs_work' && <Clock className="mr-1 h-3 w-3" />}
                  {section.status === 'completed' ? '완료' : '작업 필요'}
                </Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 중앙: 리뷰 폼 */}
      <Card>
        <CardHeader>
          <CardTitle className={diffHeader}>
            <MessageSquare className="h-5 w-5" />
            {sections.find((s) => s.id === selectedSection)?.title} 리뷰
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={reviewFormContainer}>
            {/* 지시문 입력 */}
            <div className={instructionContainer}>
              <Label htmlFor="instruction">수정 지시문</Label>
              <Textarea
                id="instruction"
                placeholder="이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요..."
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className={minHeightTextarea}
              />
            </div>

            {/* 옵션 */}
            <div className={checkboxContainer}>
              <Checkbox
                id="strict_citation"
                checked={strictCitation}
                onCheckedChange={(checked) => setStrictCitation(checked as boolean)}
              />
              <Label htmlFor="strict_citation" className={checkboxLabel}>
                엄격한 인용 검증 (새로운 주장에 반드시 근거 포함)
              </Label>
            </div>

            {/* 제출 버튼 */}
            <Button
              onClick={handleSubmitReview}
              disabled={!instruction.trim() || isProcessing}
              className={submitButton}
            >
              {isProcessing ? (
                <>
                  <Clock className={spinningIcon} />
                  처리 중...
                </>
              ) : (
                <>
                  <Send className={buttonIcon} />
                  리뷰 제출
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 하단: 리뷰 히스토리 */}
      <Card className={fullWidthCard}>
        <CardHeader>
          <CardTitle>리뷰 히스토리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={historyContainer}>
            {reviewHistory.map((review) => (
              <div key={review.id} className={historyItem}>
                <div className={historyHeader}>
                  <div className={historyMeta}>
                    <Badge variant="outline">
                      {sections.find((s) => s.id === review.section)?.title}
                    </Badge>
                    <span className={historyTimestamp}>
                      {new Date(review.timestamp).toLocaleString('ko-KR')}
                    </span>
                  </div>
                  <div className={historyActions}>
                    <Button variant="outline" size="sm">
                      <RotateCcw className={buttonIcon} />
                      되돌리기
                    </Button>
                    <Button variant="outline" size="sm">
                      <CheckCircle2 className={buttonIcon} />
                      승인
                    </Button>
                  </div>
                </div>

                <div className={historyContent}>
                  <div className={instructionSection}>
                    <h4 className={instructionTitle}>지시문</h4>
                    <p className={instructionText}>{review.instruction}</p>
                  </div>

                  <div className={diffGrid}>
                    <div className={diffSection}>
                      <h4 className={diffHeader}>
                        <XCircle className={`h-4 w-4 ${iconDestructive}`} />
                        Before
                      </h4>
                      <div className={beforeDiff}>{review.before}</div>
                    </div>

                    <div className={diffSection}>
                      <h4 className={diffHeader}>
                        <CheckCircle2 className={`h-4 w-4 ${iconSuccess}`} />
                        After
                      </h4>
                      <div className={afterDiff}>{review.after}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
