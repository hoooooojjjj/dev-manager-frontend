'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, ExternalLink, FileText, GitBranch } from 'lucide-react';
import { formatRelativeTime } from '@/utils/format';
import { ProjectStatus, ProjectStatusSchema, type Project } from '@/api/project/responses.dto';
import { Flex } from '@/components/ui/Flex';
import * as S from './index.css';
import { getStatusLabel } from './contanst';

interface ProjectCardProps {
  project: Project;
}

function getStatusColor(status: ProjectStatus): string {
  return S.statusColors[status] || S.statusColors[ProjectStatusSchema.enum.intake];
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className={S.projectCard}>
      <CardHeader className={S.cardHeader}>
        <Flex gap={10}>
          <CardTitle className={S.cardTitle}>{project.title}</CardTitle>
          <div className={S.infoRow}>{formatRelativeTime(project.createdAt)}</div>
        </Flex>
        <div className={S.badgeContainer}>
          <Badge variant="secondary" className={getStatusColor(project.status)}>
            {getStatusLabel(project.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className={S.container}>
        {/* 프로젝트 정보 */}
        <div className={S.projectInfo}>
          <div className={S.infoRow}>
            <GitBranch className={S.infoIcon} />
            <Flex direction="col" gap={4} className={S.infoText}>
              {project.repos.map((repo) => (
                <Link key={repo} href={repo} className={S.infoLink} target="_blank">
                  {repo.split('/').pop()}
                </Link>
              ))}
            </Flex>
          </div>
        </div>

        {/* Focus Files */}
        <Flex direction="col" align="start" gap={8}>
          <div className={S.focusFilesSection}>Focus Files ({project.focusFiles.length})</div>
          <div className={S.focusFilesList}>
            {project.focusFiles.slice(0, 2).map((file, index) => (
              <Badge key={index} variant="outline" className={S.focusFileBadge}>
                {file}
              </Badge>
            ))}
            {project.focusFiles.length > 2 && (
              <Badge variant="outline" className={S.focusFileBadge}>
                +{project.focusFiles.length - 2}
              </Badge>
            )}
          </div>
        </Flex>

        {/* 소스 Notion URLs */}
        <Flex direction="col" align="start" gap={8}>
          <div className={S.focusFilesSection}>PRD ({project.notionUrls.length})</div>
          <Flex direction="col" gap={4} className={S.infoText}>
            {project.notionUrls.map((url) => (
              <Link key={url} href={url} className={S.infoLink} target="_blank">
                {url}
              </Link>
            ))}
          </Flex>
        </Flex>

        {/* 액션 버튼 */}
        <div className={S.actionButtons}>
          <Button asChild size="sm" className={S.primaryButton}>
            <Link href={`/projects/${project.id}`}>
              <ExternalLink className={S.buttonIcon} />
              상세보기
            </Link>
          </Button>

          {project.status === 'completed' && (
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
