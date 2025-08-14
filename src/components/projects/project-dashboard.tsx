'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText, Search, GitBranch, MessageSquare, ExternalLink } from 'lucide-react';
import {
  container,
  headerContainer,
  headerInfo,
  projectTitle,
  projectMeta,
  metaItem,
  progressSection,
  progressHeader,
  progressBar,
  progressFill,
  timelineContainer,
  timelineItem,
  timelineStageCompleted,
  timelineStageCurrent,
  timelineStagePending,
  timelineDotCompleted,
  timelineDotCurrent,
  timelineDotPending,
  timelineConnector,
  actionGrid,
  actionCard,
  actionCardHeader,
  actionCardTitle,
  actionCardDescription,
  actionButton,
  buttonIcon,
  logContainer,
  logItem,
  logDotBlue,
  logDotGreen,
  logTime,
  logMessage,
  iconPurple,
  iconBlue,
  iconGreen,
} from './project-dashboard.css';

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
    <div className={container}>
      {/* 프로젝트 헤더 */}
      <Card>
        <CardHeader>
          <div className={headerContainer}>
            <div className={headerInfo}>
              <CardTitle className={projectTitle}>{project.title}</CardTitle>
              <div className={projectMeta}>
                <div className={metaItem}>
                  <Clock className="h-4 w-4" />
                  생성: {new Date(project.created_at).toLocaleDateString('ko-KR')}
                </div>
                <div className={metaItem}>
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
          <div className={progressSection}>
            {/* 진행률 */}
            <div>
              <div className={progressHeader}>
                <span>전체 진행률</span>
                <span>{project.progress}%</span>
              </div>
              <div className={progressBar}>
                <div
                  className={progressFill}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* 타임라인 */}
            <div className={timelineContainer}>
              {timeline.map((item, index) => (
                <div key={item.stage} className={timelineItem}>
                  <div
                    className={
                      item.completed
                        ? timelineStageCompleted
                        : item.current
                          ? timelineStageCurrent
                          : timelineStagePending
                    }
                  >
                    <div
                      className={
                        item.completed
                          ? timelineDotCompleted
                          : item.current
                            ? timelineDotCurrent
                            : timelineDotPending
                      }
                    />
                    {item.label}
                  </div>
                  {index < timeline.length - 1 && <div className={timelineConnector} />}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 액션 카드들 */}
      <div className={actionGrid}>
        <Card className={actionCard}>
          <CardHeader className={actionCardHeader}>
            <div className={actionCardTitle}>
              <Search className={`h-5 w-5 ${iconPurple}`} />
              <CardTitle className="text-lg">리서치 결과</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className={actionCardDescription}>
              Brave 검색을 통한 권위 소스와 채용공고 분석 결과를 확인하세요.
            </p>
            <Button variant="outline" className={actionButton} asChild>
              <a href={`/projects/${projectId}/research`}>
                <ExternalLink className={buttonIcon} />
                리서치 보기
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className={actionCard}>
          <CardHeader className={actionCardHeader}>
            <div className={actionCardTitle}>
              <FileText className={`h-5 w-5 ${iconBlue}`} />
              <CardTitle className="text-lg">개발 명세서</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className={actionCardDescription}>
              자동 생성된 개발 명세서를 확인하고 검토하세요.
            </p>
            <Button variant="outline" className={actionButton} disabled>
              <FileText className={buttonIcon} />
              초안 생성 중...
            </Button>
          </CardContent>
        </Card>

        <Card className={actionCard}>
          <CardHeader className={actionCardHeader}>
            <div className={actionCardTitle}>
              <MessageSquare className={`h-5 w-5 ${iconGreen}`} />
              <CardTitle className="text-lg">리뷰 & 수정</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className={actionCardDescription}>
              섹션별 수정 지시와 Diff 확인을 통해 명세서를 개선하세요.
            </p>
            <Button variant="outline" className={actionButton} disabled>
              <MessageSquare className={buttonIcon} />
              리뷰 시작
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 실시간 로그 */}
      <Card>
        <CardHeader>
          <CardTitle className={actionCardTitle}>
            <GitBranch className="h-5 w-5" />
            실시간 로그
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={logContainer}>
            <div className={logItem}>
              <div className={logDotBlue} />
              <div>
                <span className={logTime}>14:30</span>
                <span className={logMessage}>Brave 검색 시작: &ldquo;사용자 인증 JWT 보안&rdquo;</span>
              </div>
            </div>
            <div className={logItem}>
              <div className={logDotGreen} />
              <div>
                <span className={logTime}>14:28</span>
                <span className={logMessage}>GitHub 레포지토리 분석 완료</span>
              </div>
            </div>
            <div className={logItem}>
              <div className={logDotGreen} />
              <div>
                <span className={logTime}>14:25</span>
                <span className={logMessage}>Notion 문서 수집 완료</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
