'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FileText, Plus } from 'lucide-react';
import type { Project } from '@/lib/api/schemas';
import { ProjectCard } from './project-card';
import * as S from './projects-list.css';

interface ProjectsGridProps {
  projects: Project[];
  total: number;
  searchQuery: string;
  statusFilter: string;
}

export function ProjectsGrid({ projects, total, searchQuery, statusFilter }: ProjectsGridProps) {
  // 빈 상태 처리
  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className={S.emptyStateContainer}>
          <FileText className={S.emptyStateIcon} />
          <h3 className={S.emptyStateTitle}>프로젝트가 없습니다</h3>
          <p className={S.emptyStateDescription}>
            {searchQuery || statusFilter !== 'all'
              ? '검색 조건에 맞는 프로젝트가 없습니다'
              : '첫 번째 프로젝트를 생성해보세요'}
          </p>
          <Button asChild>
            <Link href="/new">
              <Plus className={S.addProjectIcon} />새 프로젝트 시작
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* 결과 요약 */}
      <div className={S.resultsCounter}>
        총 {total}개의 프로젝트 중 {projects.length}개 표시
      </div>

      {/* 프로젝트 카드 그리드 */}
      <div className={S.projectGrid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

// 로딩 스켈레톤 컴포넌트
export function ProjectsGridSkeleton() {
  return (
    <div className={S.projectGrid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className={S.skeletonCard}>
          <CardHeader>
            <div className={S.skeletonHeader}></div>
            <div className={S.skeletonDescription}></div>
          </CardHeader>
          <CardContent>
            <div className={S.skeletonContent}>
              <div className={S.skeletonLine}></div>
              <div className={S.skeletonLineShort}></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
