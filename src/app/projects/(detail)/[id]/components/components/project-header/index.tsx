'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Clock } from 'lucide-react';
import * as S from './index.css';
import { Flex } from '@/components/ui/Flex';
import { dotClassMap, getStatusLabel, resolveTimelineStatus, stageClassMap } from './util';

export interface TimelineItem {
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

export function ProjectHeader({ project, timeline }: ProjectHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className={S.headerContainer}>
          <Flex direction="col" gap={8}>
            <CardTitle className={S.projectTitle}>{project.title}</CardTitle>
            <div className={S.projectMeta}>
              <Flex align="center" gap={6}>
                <Clock size={16} />
                생성: {new Date(project.created_at).toLocaleDateString('ko-KR')}
              </Flex>
              <Flex align="center" gap={6}>
                <Clock size={16} />
                수정: {new Date(project.updated_at).toLocaleDateString('ko-KR')}
              </Flex>
              <Badge variant="outline">{getStatusLabel(project.status)}</Badge>
            </div>
          </Flex>
        </div>
      </CardHeader>
      <CardContent>
        <div className={S.progressSection}>
          {/* 진행률 */}
          <Flex direction="col" gap={8}>
            <div className={S.progressHeader}>
              <span>전체 진행률</span>
              <span>{project.progress}%</span>
            </div>
            <div className={S.progressBar}>
              <div className={S.progressFill} style={{ width: `${project.progress}%` }} />
            </div>
          </Flex>

          {/* 타임라인 */}
          <div className={S.timelineContainer}>
            {timeline.map((item, index) => (
              <div key={item.stage} className={S.timelineItem}>
                <div className={stageClassMap[resolveTimelineStatus(item)]}>
                  <div className={dotClassMap[resolveTimelineStatus(item)]} />
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
