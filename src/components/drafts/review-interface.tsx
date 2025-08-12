'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageSquare, Send, CheckCircle2, XCircle, RotateCcw, Clock } from 'lucide-react';

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
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
      {/* 좌측: 섹션 선택 */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>섹션 선택</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`flex w-full items-center justify-between rounded-md border p-3 text-left transition-colors ${
                  selectedSection === section.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <span className="font-medium">{section.title}</span>
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
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {sections.find((s) => s.id === selectedSection)?.title} 리뷰
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 지시문 입력 */}
            <div className="space-y-2">
              <Label htmlFor="instruction">수정 지시문</Label>
              <Textarea
                id="instruction"
                placeholder="이 섹션에서 수정하고 싶은 내용을 구체적으로 설명해주세요..."
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            {/* 옵션 */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="strict_citation"
                checked={strictCitation}
                onCheckedChange={(checked) => setStrictCitation(checked as boolean)}
              />
              <Label htmlFor="strict_citation" className="text-sm">
                엄격한 인용 검증 (새로운 주장에 반드시 근거 포함)
              </Label>
            </div>

            {/* 제출 버튼 */}
            <Button
              onClick={handleSubmitReview}
              disabled={!instruction.trim() || isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  처리 중...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  리뷰 제출
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 하단: 리뷰 히스토리 */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>리뷰 히스토리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewHistory.map((review) => (
              <div key={review.id} className="rounded-lg border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {sections.find((s) => s.id === review.section)?.title}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.timestamp).toLocaleString('ko-KR')}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      되돌리기
                    </Button>
                    <Button variant="outline" size="sm">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      승인
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="mb-1 text-sm font-medium">지시문</h4>
                    <p className="rounded bg-muted p-2 text-sm text-muted-foreground">
                      {review.instruction}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <XCircle className="h-4 w-4 text-destructive" />
                        Before
                      </h4>
                      <div className="rounded border border-red-200 bg-red-50 p-3 text-sm">
                        {review.before}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        After
                      </h4>
                      <div className="rounded border border-green-200 bg-green-50 p-3 text-sm">
                        {review.after}
                      </div>
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
