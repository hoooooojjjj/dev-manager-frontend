'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Calendar, ExternalLink, FileText, GitBranch } from 'lucide-react';
import { get } from '@/lib/api/client';
import { formatRelativeTime, getStatusColor } from '@/lib/utils/format';
import type { Project } from '@/lib/api/schemas';
import {
  container,
  headerActions,
  filtersContainer,
  searchContainer,
  searchIcon,
  searchInput,
  projectGrid,
  skeletonCard,
  skeletonHeader,
  skeletonDescription,
  skeletonContent,
  skeletonLine,
  skeletonLineShort,
  emptyStateContainer,
  emptyStateIcon,
  emptyStateTitle,
  emptyStateDescription,
  resultsCounter,
  projectCard,
  cardHeader,
  cardHeaderContent,
  cardHeaderLeft,
  cardTitle,
  badgeContainer,
  badgeOutline,
  projectInfo,
  infoRow,
  infoIcon,
  infoText,
  focusFilesSection,
  focusFilesList,
  focusFileBadge,
  actionButtons,
  primaryButton,
  buttonIcon,
  errorContainer,
  errorContent,
  errorMessage,
  addProjectIcon,
} from './projects-list.css';
import { Flex } from '../ui/flex';

interface ProjectsListResponse {
  projects: Project[];
  total: number;
}

export function ProjectsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 프로젝트 목록 조회
  const { data, isLoading, error } = useQuery({
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

  const getStatusLabel = (status: string) => {
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
  };

  if (error) {
    return (
      <Card>
        <CardContent className={errorContainer}>
          <div className={errorContent}>
            <div className={errorMessage}>프로젝트 목록을 불러오는데 실패했습니다</div>
            <Button variant="outline" onClick={() => window.location.reload()}>
              다시 시도
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={container}>
      {/* 헤더 액션 */}
      <div className={headerActions}>
        <div className={filtersContainer}>
          {/* 검색 */}
          <div className={searchContainer}>
            <Search className={searchIcon} />
            <Input
              placeholder="프로젝트 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={searchInput}
            />
          </div>

          {/* 상태 필터 */}
          <Flex align="center">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className={statusFilter}>
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="done">완료</SelectItem>
                <SelectItem value="review">리뷰</SelectItem>
                <SelectItem value="drafting">초안 생성 중</SelectItem>
                <SelectItem value="researching">리서치 중</SelectItem>
                <SelectItem value="error">오류</SelectItem>
              </SelectContent>
            </Select>
          </Flex>
        </div>

        {/* 새 프로젝트 버튼 */}
        <Button asChild style={{ paddingBottom: '4px', paddingTop: '4px' }}>
          <Link href="/new">
            <Plus className={addProjectIcon} />새 프로젝트
          </Link>
        </Button>
      </div>

      {/* 프로젝트 목록 */}
      {isLoading ? (
        <div className={projectGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className={skeletonCard}>
              <CardHeader>
                <div className={skeletonHeader}></div>
                <div className={skeletonDescription}></div>
              </CardHeader>
              <CardContent>
                <div className={skeletonContent}>
                  <div className={skeletonLine}></div>
                  <div className={skeletonLineShort}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card>
          <CardContent className={emptyStateContainer}>
            <FileText className={emptyStateIcon} />
            <h3 className={emptyStateTitle}>프로젝트가 없습니다</h3>
            <p className={emptyStateDescription}>
              {searchQuery || statusFilter !== 'all'
                ? '검색 조건에 맞는 프로젝트가 없습니다'
                : '첫 번째 프로젝트를 생성해보세요'}
            </p>
            <Button asChild>
              <Link href="/new">
                <Plus className={addProjectIcon} />새 프로젝트 시작
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* 결과 요약 */}
          <div className={resultsCounter}>
            총 {data?.total || 0}개의 프로젝트 중 {filteredProjects.length}개 표시
          </div>

          {/* 프로젝트 카드 그리드 */}
          <div className={projectGrid}>
            {filteredProjects.map((project) => (
              <Card key={project.id} className={projectCard}>
                <CardHeader className={cardHeader}>
                  <div className={cardHeaderContent}>
                    <div className={cardHeaderLeft}>
                      <CardTitle className={cardTitle}>{project.title}</CardTitle>
                      <div className={badgeContainer}>
                        <Badge variant="secondary" className={getStatusColor(project.status)}>
                          {getStatusLabel(project.status)}
                        </Badge>
                        <Badge variant="outline" className={badgeOutline}>
                          {project.confidentiality}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className={container}>
                  {/* 프로젝트 정보 */}
                  <div className={projectInfo}>
                    <div className={infoRow}>
                      <GitBranch className={infoIcon} />
                      <span className={infoText}>{project.repo}</span>
                    </div>
                    <div className={infoRow}>
                      <Calendar className={infoIcon} />
                      <span>생성: {formatRelativeTime(project.created_at)}</span>
                    </div>
                  </div>

                  {/* Focus Files */}
                  <div>
                    <div className={focusFilesSection}>
                      Focus Files ({project.focus_files.length})
                    </div>
                    <div className={focusFilesList}>
                      {project.focus_files.slice(0, 2).map((file, index) => (
                        <Badge key={index} variant="outline" className={focusFileBadge}>
                          {file.split('/').pop()}
                        </Badge>
                      ))}
                      {project.focus_files.length > 2 && (
                        <Badge variant="outline" className={focusFileBadge}>
                          +{project.focus_files.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className={actionButtons}>
                    <Button asChild size="sm" className={primaryButton}>
                      <Link href={`/projects/${project.id}`}>
                        <ExternalLink className={buttonIcon} />
                        상세보기
                      </Link>
                    </Button>

                    {project.status === 'done' && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/drafts/${project.id}`}>
                          <FileText className={buttonIcon} />
                          명세서
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
