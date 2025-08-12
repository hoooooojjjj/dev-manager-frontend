"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus,
  Search,
  Calendar,
  ExternalLink,
  FileText,
  GitBranch
} from "lucide-react";
import { get } from "@/lib/api/client";
import { formatRelativeTime, getStatusColor } from "@/lib/utils/format";
import type { Project } from "@/lib/api/schemas";

interface ProjectsListResponse {
  projects: Project[];
  total: number;
}

export function ProjectsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // 프로젝트 목록 조회
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects', { search: searchQuery, status: statusFilter }],
    queryFn: () => get<ProjectsListResponse>('/projects', {
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
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-destructive mb-2">프로젝트 목록을 불러오는데 실패했습니다</div>
            <Button variant="outline" onClick={() => window.location.reload()}>
              다시 시도
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 액션 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* 검색 */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="프로젝트 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          {/* 상태 필터 */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
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
        </div>
        
        {/* 새 프로젝트 버튼 */}
        <Button asChild>
          <Link href="/new">
            <Plus className="h-4 w-4 mr-2" />
            새 프로젝트
          </Link>
        </Button>
      </div>

      {/* 프로젝트 목록 */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">프로젝트가 없습니다</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchQuery || statusFilter !== 'all' 
                ? "검색 조건에 맞는 프로젝트가 없습니다" 
                : "첫 번째 프로젝트를 생성해보세요"}
            </p>
            <Button asChild>
              <Link href="/new">
                <Plus className="h-4 w-4 mr-2" />
                새 프로젝트 시작
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* 결과 요약 */}
          <div className="text-sm text-muted-foreground">
            총 {data?.total || 0}개의 프로젝트 중 {filteredProjects.length}개 표시
          </div>
          
          {/* 프로젝트 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2 mb-2">
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="secondary" 
                          className={getStatusColor(project.status)}
                        >
                          {getStatusLabel(project.status)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {project.confidentiality}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* 프로젝트 정보 */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GitBranch className="h-4 w-4" />
                      <span className="truncate">{project.repo}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>생성: {formatRelativeTime(project.created_at)}</span>
                    </div>
                  </div>

                  {/* Focus Files */}
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      Focus Files ({project.focus_files.length})
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.focus_files.slice(0, 2).map((file, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {file.split('/').pop()}
                        </Badge>
                      ))}
                      {project.focus_files.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.focus_files.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-2 pt-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/projects/${project.id}`}>
                        <ExternalLink className="h-3 w-3 mr-1" />
                        상세보기
                      </Link>
                    </Button>
                    
                    {project.status === 'done' && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/drafts/${project.id}`}>
                          <FileText className="h-3 w-3 mr-1" />
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
