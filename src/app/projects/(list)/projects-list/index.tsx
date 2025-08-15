'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { get } from '@/lib/api/client';
import type { Project } from '@/lib/api/schemas';
import { ProjectsListHeader } from './components/projects-list-header';
import { ProjectsGrid } from './components/projects-grid';
import { ProjectsGridSkeleton } from './components/projects-grid-skeleton';
import * as S from './index.css';

interface ProjectsListResponse {
  projects: Project[];
  total: number;
}

export function ProjectsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 프로젝트 목록 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['projects', { search: searchQuery, status: statusFilter }],
    queryFn: () =>
      get<ProjectsListResponse>('/projects', {
        search: searchQuery || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      }),
    staleTime: 30 * 1000, // 30초
  });

  // 필터링된 프로젝트 목록
  const filteredProjects = data?.projects || [];

  // Early return for error state
  if (error) {
    return (
      <div className={S.container}>
        <Card>
          <CardContent className={S.errorContainer}>
            <div className={S.errorContent}>
              <div className={S.errorMessage}>프로젝트 목록을 불러오는데 실패했습니다</div>
              <Button variant="outline" onClick={() => refetch()}>
                다시 시도
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Early return for loading state
  if (isLoading) {
    return (
      <div className={S.container}>
        <ProjectsListHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        <ProjectsGridSkeleton />
      </div>
    );
  }

  return (
    <div className={S.container}>
      <ProjectsListHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <ProjectsGrid
        projects={filteredProjects}
        total={data?.total || 0}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
      />
    </div>
  );
}
