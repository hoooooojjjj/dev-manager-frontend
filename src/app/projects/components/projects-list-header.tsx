'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { Flex } from '@/components/ui/flex';
import * as S from './projects-list.css';

interface ProjectsListHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export function ProjectsListHeader({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: ProjectsListHeaderProps) {
  return (
    <div className={S.headerActions}>
      <div className={S.filtersContainer}>
        {/* 검색 */}
        <div className={S.searchContainer}>
          <Search className={S.searchIcon} />
          <Input
            placeholder="프로젝트 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={S.searchInput}
          />
        </div>

        {/* 상태 필터 */}
        <Flex align="center">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className={S.statusFilter}>
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
          <Plus className={S.addProjectIcon} />새 프로젝트
        </Link>
      </Button>
    </div>
  );
}
