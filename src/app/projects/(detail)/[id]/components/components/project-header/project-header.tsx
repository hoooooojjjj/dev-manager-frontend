'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import * as S from './project-header.css';

interface TimelineItem {
  stage: string;
  label: string;
  completed: boolean;
  current?: boolean;
}

interface ProjectHeaderProps {
  project: {
    id: string;
    title: string;
    status: string;
    progress: number;
    created_at: string;
    updated_at: string;
  };
  timeline: TimelineItem[];
}

function getStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    idle: '대기',
    submitting: '제출 중',
    queued: '대기열',
    collecting: '수집 중',
    researching: '리서치 중',
    drafting: '초안 생성 중',
    review: '리뷰',
    publishing: '발행 중',
    done: '완료',
    error: '오류',
  };
  return statusLabels[status] || status;
}

export function ProjectHeader({ project, timeline }: ProjectHeaderProps) {
  return (
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
              <Badge variant="secondary">{getStatusLabel(project.status)}</Badge>
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
  );
}
