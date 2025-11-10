import { ProjectStatus, ProjectStatusSchema } from '@/api/project/responses.dto';

export function getStatusLabel(status: ProjectStatus): string {
  const statusLabels: Record<ProjectStatus, string> = {
    [ProjectStatusSchema.enum.intake]: '프로젝트 생성',
    [ProjectStatusSchema.enum.research]: '리서치 중',
    [ProjectStatusSchema.enum.draft]: '초안 생성 중',
    [ProjectStatusSchema.enum.review]: '리뷰',
    [ProjectStatusSchema.enum.prompts]: '프롬프트 생성 중',
    [ProjectStatusSchema.enum.completed]: '완료',
    [ProjectStatusSchema.enum.error]: '오류',
  };
  return statusLabels[status] || '';
}
