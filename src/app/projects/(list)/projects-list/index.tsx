'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ProjectsListHeader } from './components/projects-list-header';
import { ProjectsGrid } from './components/projects-grid';
import { ProjectsGridSkeleton } from './components/projects-grid-skeleton';
import * as S from './index.css';
import { useGetProjects } from '@/api/project/queries';

export function ProjectsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 프로젝트 목록 조회
  const { data, isLoading, error, refetch } = useGetProjects();

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
        projects={data || []}
        total={data?.length || 0}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
      />
    </div>
  );
}
