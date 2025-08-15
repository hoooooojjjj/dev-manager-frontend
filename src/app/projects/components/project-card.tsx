'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, FileText, GitBranch } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/format';
import type { Project } from '@/lib/api/schemas';
import { Flex } from '@/components/ui/flex';
import * as S from './projects-list.css';

interface ProjectCardProps {
  project: Project;
}

function getStatusColor(status: string): string {
  return S.statusColors[status as keyof typeof S.statusColors] || S.statusColors.idle;
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

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className={S.projectCard}>
      <CardHeader className={S.cardHeader}>
        <CardTitle className={S.cardTitle}>{project.title}</CardTitle>
        <div className={S.badgeContainer}>
          <Badge variant="secondary" className={getStatusColor(project.status)}>
            {getStatusLabel(project.status)}
          </Badge>
          <Badge variant="outline" className={S.badgeOutline}>
            {project.confidentiality}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className={S.container}>
        {/* 프로젝트 정보 */}
        <div className={S.projectInfo}>
          <div className={S.infoRow}>
            <GitBranch className={S.infoIcon} />
            <span className={S.infoText}>{project.repo}</span>
          </div>
          <div className={S.infoRow}>
            <Calendar className={S.infoIcon} />
            <span>생성: {formatRelativeTime(project.created_at)}</span>
          </div>
        </div>

        {/* Focus Files */}
        <Flex direction="col" align="start" gap={8}>
          <div className={S.focusFilesSection}>
            Focus Files ({project.focus_files.length})
          </div>
          <div className={S.focusFilesList}>
            {project.focus_files.slice(0, 2).map((file, index) => (
              <Badge key={index} variant="outline" className={S.focusFileBadge}>
                {file.split('/').pop()}
              </Badge>
            ))}
            {project.focus_files.length > 2 && (
              <Badge variant="outline" className={S.focusFileBadge}>
                +{project.focus_files.length - 2}
              </Badge>
            )}
          </div>
        </Flex>

        {/* 액션 버튼 */}
        <div className={S.actionButtons}>
          <Button asChild size="sm" className={S.primaryButton}>
            <Link href={`/projects/${project.id}`}>
              <ExternalLink className={S.buttonIcon} />
              상세보기
            </Link>
          </Button>

          {project.status === 'done' && (
            <Button asChild variant="outline" size="sm">
              <Link href={`/drafts/${project.id}`}>
                <FileText className={S.buttonIcon} />
                명세서
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
