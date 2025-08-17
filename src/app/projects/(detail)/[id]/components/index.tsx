'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText, Search, GitBranch, MessageSquare, ExternalLink } from 'lucide-react';
import * as S from './index.css';

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
    <div className={S.container}>
      {/* 프로젝트 헤더 */}
      <Card>
        <CardHeader>
          <div className={S.headerContainer}>
            <div className={S.headerInfo}>
              <CardTitle className={S.projectTitle}>{project.title}</CardTitle>
              <div className={S.projectMeta}>
                <div className={S.metaItem}>
                  <Clock className="h-4 w-4" />
                  생성: {new Date(project.created_at).toLocaleDateString('ko-KR')}
                </div>
                <div className={S.metaItem}>
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
          <div className={S.progressSection}>
            {/* 진행률 */}
            <div>
              <div className={S.progressHeader}>
                <span>전체 진행률</span>
                <span>{project.progress}%</span>
              </div>
              <div className={S.progressBar}>
                <div className={S.progressFill} style={{ width: `${project.progress}%` }} />
              </div>
            </div>

            {/* 타임라인 */}
            <div className={S.timelineContainer}>
              {timeline.map((item, index) => (
                <div key={item.stage} className={S.timelineItem}>
                  <div
                    className={
                      item.completed
                        ? S.timelineStageCompleted
                        : item.current
                          ? S.timelineStageCurrent
                          : S.timelineStagePending
                    }
                  >
                    <div
                      className={
                        item.completed
                          ? S.timelineDotCompleted
                          : item.current
                            ? S.timelineDotCurrent
                            : S.timelineDotPending
                      }
                    />
                    {item.label}
                  </div>
                  {index < timeline.length - 1 && <div className={S.timelineConnector} />}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 액션 카드들 */}
      <div className={S.actionGrid}>
        <Card className={S.actionCard}>
          <CardHeader className={S.actionCardHeader}>
            <div className={S.actionCardTitle}>
              <Search className={`h-5 w-5 ${S.iconPurple}`} />
              <CardTitle className="text-lg">리서치 결과</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className={S.actionCardDescription}>
              Brave 검색을 통한 권위 소스와 채용공고 분석 결과를 확인하세요.
            </p>
            <Button variant="outline" className={S.actionButton} asChild>
              <a href={`/projects/${projectId}/research`}>
                <ExternalLink className={S.buttonIcon} />
                리서치 보기
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className={S.actionCard}>
          <CardHeader className={S.actionCardHeader}>
            <div className={S.actionCardTitle}>
              <FileText className={`h-5 w-5 ${S.iconBlue}`} />
              <CardTitle className="text-lg">개발 명세서</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className={S.actionCardDescription}>
              자동 생성된 개발 명세서를 확인하고 검토하세요.
            </p>
            <Button variant="outline" className={S.actionButton} disabled>
              <FileText className={S.buttonIcon} />
              초안 생성 중...
            </Button>
          </CardContent>
        </Card>

        <Card className={S.actionCard}>
          <CardHeader className={S.actionCardHeader}>
            <div className={S.actionCardTitle}>
              <MessageSquare className={`h-5 w-5 ${S.iconGreen}`} />
              <CardTitle className="text-lg">리뷰 & 수정</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className={S.actionCardDescription}>
              섹션별 수정 지시와 Diff 확인을 통해 명세서를 개선하세요.
            </p>
            <Button variant="outline" className={S.actionButton} disabled>
              <MessageSquare className={S.buttonIcon} />
              리뷰 시작
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 실시간 로그 */}
      <Card>
        <CardHeader>
          <CardTitle className={S.actionCardTitle}>
            <GitBranch className="h-5 w-5" />
            실시간 로그
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={S.logContainer}>
            <div className={S.logItem}>
              <div className={S.logDotBlue} />
              <div>
                <span className={S.logTime}>14:30</span>
                <span className={S.logMessage}>
                  Brave 검색 시작: &ldquo;사용자 인증 JWT 보안&rdquo;
                </span>
              </div>
            </div>
            <div className={S.logItem}>
              <div className={S.logDotGreen} />
              <div>
                <span className={S.logTime}>14:28</span>
                <span className={S.logMessage}>GitHub 레포지토리 분석 완료</span>
              </div>
            </div>
            <div className={S.logItem}>
              <div className={S.logDotGreen} />
              <div>
                <span className={S.logTime}>14:25</span>
                <span className={S.logMessage}>Notion 문서 수집 완료</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
