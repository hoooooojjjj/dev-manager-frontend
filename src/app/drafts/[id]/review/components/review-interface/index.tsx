'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Clock,
  History,
} from 'lucide-react';
import * as S from './index.css';
import { Flex } from '@/components/ui/flex';

interface ReviewInterfaceProps {
  draftId: string;
}

interface Section {
  id: string;
  title: string;
  content: string;
  status: 'completed' | 'needs_work';
}

interface Review {
  id: string;
  sectionId: string;
  sectionTitle: string;
  originalContent: string;
  reviewPrompt: string;
  revisedContent: string;
  timestamp: string;
}

export function ReviewInterface({}: ReviewInterfaceProps) {
  // 섹션 데이터 (실제로는 API에서 가져올 내용)
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'summary',
      title: 'TL;DR',
      content:
        'AI가 생성한 개발 명세서의 핵심 내용을 요약했습니다. 현재 인증 시스템의 보안 취약점을 해결하고 성능을 개선하는 방안을 제시합니다.',
      status: 'completed',
    },
    {
      id: 'current_behavior',
      title: '현재 동작',
      content:
        '현재 JWT 토큰 기반 인증 시스템이 24시간 만료 시간으로 설정되어 있으며, 리프레시 로직이 없어 보안상 위험이 있습니다.',
      status: 'completed',
    },
    {
      id: 'root_cause',
      title: '근본 원인',
      content:
        '장기간 유효한 JWT 토큰과 토큰 탈취 시 무력화 방법 부재가 주요 보안 취약점의 근본 원인입니다.',
      status: 'completed',
    },
    {
      id: 'solutions',
      title: '해결 방안',
      content: 'JWT 보안을 강화해야 합니다. 토큰 만료 시간 단축과 리프레시 토큰 구현이 필요합니다.',
      status: 'needs_work',
    },
    {
      id: 'learning_points',
      title: '학습 포인트',
      content:
        '보안과 사용자 경험의 균형을 맞추는 것이 핵심입니다. 단기 토큰 + 자동 갱신으로 두 마리 토끼를 잡을 수 있습니다.',
      status: 'completed',
    },
  ]);

  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [instruction, setInstruction] = useState('');
  const [strictCitation, setStrictCitation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showDiff, setShowDiff] = useState(false);
  const [pendingReview, setPendingReview] = useState<Review | null>(null);

  const handleSectionClick = (section: Section) => {
    setSelectedSection(section);
    setShowDiff(false);
    setInstruction('');
    setPendingReview(null);
  };

  const handleSubmitReview = async () => {
    if (!selectedSection || !instruction.trim()) return;

    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `${selectedSection.content}\n\n(AI가 리뷰 지시문을 반영하여 수정한 내용입니다: "${instruction}")`;

      const newPendingReview: Review = {
        id: Date.now().toString(),
        sectionId: selectedSection.id,
        sectionTitle: selectedSection.title,
        originalContent: selectedSection.content,
        reviewPrompt: instruction,
        revisedContent: aiResponse,
        timestamp: new Date().toISOString(),
      };

      setPendingReview(newPendingReview);
      setShowDiff(true);
      setIsProcessing(false);
    }, 2000);
  };

  const handleApproveReview = () => {
    if (!pendingReview) return;

    // Update the section with revised content
    const updatedSections = sections.map((section) =>
      section.id === pendingReview.sectionId
        ? { ...section, content: pendingReview.revisedContent }
        : section
    );

    // Add to review history
    setReviews([pendingReview, ...reviews]);
    setSections(updatedSections);
    setShowDiff(false);
    setPendingReview(null);
    setInstruction('');
  };

  const handleRevertReview = () => {
    setShowDiff(false);
    setPendingReview(null);
  };

  return (
    <div className={S.container}>
      {/* 좌측: 섹션 선택 */}
      <Card>
        <CardHeader>
          <CardTitle>섹션 선택</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={S.sectionsContainer}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section)}
                className={
                  selectedSection?.id === section.id ? S.sectionButtonSelected : S.sectionButton
                }
              >
                <span className={S.sectionTitle}>{section.title}</span>
                <Badge
                  variant={
                    section.status === 'completed'
                      ? 'default'
                      : section.status === 'needs_work'
                        ? 'secondary'
                        : 'outline'
                  }
                  className={S.badge}
                >
                  <Flex justify="center" gap={4}>
                    {section.status === 'completed' && <CheckCircle2 size={14} />}
                    {section.status === 'needs_work' && <Clock size={14} />}
                    {section.status === 'completed' ? '완료' : '미완료'}
                  </Flex>
                </Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 우측: 리뷰 에디터 */}
      <Card>
        <CardHeader>
          <CardTitle className={S.diffHeader}>
            <MessageSquare className="h-5 w-5" />
            {selectedSection ? `${selectedSection.title} 리뷰` : '섹션을 선택하세요'}
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
                  onChange={(e) => setInstruction(e.target.value)}
                  className={S.minHeightTextarea}
                />
              </div>

              {/* 옵션 */}
              <div className={S.checkboxContainer}>
                <Checkbox
                  id="strict_citation"
                  checked={strictCitation}
                  onCheckedChange={(checked) => setStrictCitation(checked as boolean)}
                />
                <Label htmlFor="strict_citation" className={S.checkboxLabel}>
                  엄격한 인용 검증 (새로운 주장에 반드시 근거 포함)
                </Label>
              </div>

              {/* 제출 버튼 */}
              <Button
                onClick={handleSubmitReview}
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

      {/* 하단: 동적 콘텐츠 영역 */}
      <Card className={S.fullWidthCard}>
        <CardHeader>
          <CardTitle>
            <History className="mr-2 h-5 w-5" />
            {showDiff && pendingReview
              ? '리뷰 결과 확인'
              : selectedSection
                ? `${selectedSection.title} 내용`
                : '리뷰 히스토리'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showDiff && pendingReview ? (
            /* Diff 뷰 */
            <div className={S.historyContainer}>
              <div className={S.historyItem}>
                <div className={S.historyHeader}>
                  <div className={S.historyMeta}>
                    <Badge variant="outline">{pendingReview.sectionTitle}</Badge>
                    <span className={S.historyTimestamp}>검토 중</span>
                  </div>
                  <div className={S.historyActions}>
                    <Button variant="outline" size="sm" onClick={handleRevertReview}>
                      <RotateCcw className={S.buttonIcon} />
                      되돌리기
                    </Button>
                    <Button variant="default" size="sm" onClick={handleApproveReview}>
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
          ) : selectedSection && !showDiff ? (
            /* 섹션 내용 뷰 */
            <div className={S.sectionContentContainer}>
              <div className={S.sectionContent}>
                <h3 className={S.sectionContentTitle}>{selectedSection.title} 현재 내용</h3>
                <div className={S.sectionContentText}>{selectedSection.content}</div>
              </div>
            </div>
          ) : reviews.length > 0 ? (
            /* 리뷰 히스토리 */
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
          ) : (
            /* 빈 상태 */
            <div className={S.emptyState}>
              <History className={S.emptyIcon} />
              <p>아직 리뷰 히스토리가 없습니다</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
