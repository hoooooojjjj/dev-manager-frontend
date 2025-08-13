'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText, Search, GitBranch, MessageSquare, ExternalLink } from 'lucide-react';

interface ProjectDashboardProps {
  projectId: string;
}

export function ProjectDashboard({ projectId }: ProjectDashboardProps) {
  // Mock 데이터 (실제로는 API에서 가져옴)
  const project = {
    id: projectId,
    title: '사용자 인증 시스템 개선',
    status: 'researching' as const,
    progress: 45,
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-15T14:30:00Z',
  };

  const timeline = [
    { stage: 'queued', label: '대기', completed: true },
    { stage: 'collecting', label: '수집', completed: true },
    { stage: 'researching', label: '리서치', completed: false, current: true },
    { stage: 'drafting', label: '초안 생성', completed: false },
    { stage: 'review', label: '리뷰', completed: false },
    { stage: 'publishing', label: '발행', completed: false },
  ];

  return (
    <div className="space-y-6">
      {/* 프로젝트 헤더 */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between max-md:w-full max-md:flex-col max-md:justify-start max-md:gap-2">
            <div>
              <CardTitle className="text-center text-2xl">{project.title}</CardTitle>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground max-md:flex-col max-md:items-start max-md:gap-2">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  생성: {new Date(project.created_at).toLocaleDateString('ko-KR')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  수정: {new Date(project.updated_at).toLocaleDateString('ko-KR')}
                </div>
                <Badge variant="secondary">
                  {project.status === 'researching' ? '리서치 중' : project.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 진행률 */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>전체 진행률</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* 타임라인 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {timeline.map((item, index) => (
                <div key={item.stage} className="flex items-center gap-2 whitespace-nowrap">
                  <div
                    className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs ${
                      item.completed
                        ? 'bg-green-100 text-green-800'
                        : item.current
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        item.completed
                          ? 'bg-green-600'
                          : item.current
                            ? 'bg-blue-600'
                            : 'bg-gray-400'
                      }`}
                    />
                    {item.label}
                  </div>
                  {index < timeline.length - 1 && <div className="h-px w-4 bg-border" />}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 액션 카드들 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg">리서치 결과</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              Brave 검색을 통한 권위 소스와 채용공고 분석 결과를 확인하세요.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href={`/projects/${projectId}/research`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                리서치 보기
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">개발 명세서</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              자동 생성된 개발 명세서를 확인하고 검토하세요.
            </p>
            <Button variant="outline" className="w-full" disabled>
              <FileText className="mr-2 h-4 w-4" />
              초안 생성 중...
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">리뷰 & 수정</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-center text-sm text-muted-foreground">
              섹션별 수정 지시와 Diff 확인을 통해 명세서를 개선하세요.
            </p>
            <Button variant="outline" className="w-full" disabled>
              <MessageSquare className="mr-2 h-4 w-4" />
              리뷰 시작
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 실시간 로그 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            실시간 로그
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-60 space-y-2 overflow-y-auto">
            <div className="flex items-start gap-2 text-sm">
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
              <div>
                <span className="text-muted-foreground">14:30</span>
                <span className="ml-2">Brave 검색 시작: &ldquo;사용자 인증 JWT 보안&rdquo;</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
              <div>
                <span className="text-muted-foreground">14:28</span>
                <span className="ml-2">GitHub 레포지토리 분석 완료</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
              <div>
                <span className="text-muted-foreground">14:25</span>
                <span className="ml-2">Notion 문서 수집 완료</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
