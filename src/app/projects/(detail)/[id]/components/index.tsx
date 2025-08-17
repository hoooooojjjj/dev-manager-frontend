'use client';

import { ProjectHeader } from './components/project-header';
import { ActionCards } from './components/action-cards/action-cards';
import { RealtimeLog } from './components/realtime-log/realtime-log';
import { Flex } from '@/components/ui/flex';

interface ProjectDashboardProps {
  projectId: string;
}

export function ProjectDashboard({ projectId }: ProjectDashboardProps) {
  // Mock 데이터 (실제로는 API에서 가져옴)
  const project = {
    id: projectId,
    title: '사용자 인증 시스템 개선',
    status: 'researching' as const,
    progress: 45,
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-15T14:30:00Z',
  };

  const timeline = [
    { stage: 'queued', label: '대기', completed: true },
    { stage: 'collecting', label: '수집', completed: true },
    { stage: 'researching', label: '리서치', completed: false, current: true },
    { stage: 'drafting', label: '초안 생성', completed: false },
    { stage: 'review', label: '리뷰', completed: false },
    { stage: 'publishing', label: '발행', completed: false },
  ];

  const logs = [
    {
      time: '14:30',
      message: 'Brave 검색 시작: "사용자 인증 JWT 보안"',
      type: 'info' as const,
    },
    {
      time: '14:28',
      message: 'GitHub 레포지토리 분석 완료',
      type: 'success' as const,
    },
    {
      time: '14:25',
      message: 'Notion 문서 수집 완료',
      type: 'success' as const,
    },
  ];

  return (
    <Flex direction="col" gap={16}>
      <ProjectHeader project={project} timeline={timeline} />
      <ActionCards projectId={projectId} projectStatus={project.status} />
      <RealtimeLog logs={logs} />
    </Flex>
  );
}
