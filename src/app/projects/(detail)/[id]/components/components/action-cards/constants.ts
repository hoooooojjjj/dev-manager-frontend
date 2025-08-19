import { Search, FileText, ExternalLink } from 'lucide-react';

export const getActionCardsData = (projectId: string, projectStatus: string) => {
  return [
    {
      title: '리서치 결과',
      description: '검색을 통한 권위 소스와 채용공고 분석 결과를 확인하세요.',
      icon: Search,
      iconColorClass: 'purple' as const,
      buttonText: '리서치 보기',
      buttonIcon: ExternalLink,
      href: `/projects/${projectId}/research`,
      disabled: false,
    },
    {
      title: '개발 명세서',
      description: '자동 생성된 개발 명세서를 확인하고 검토하세요.',
      icon: FileText,
      iconColorClass: 'blue' as const,
      buttonText: projectStatus === 'done' ? '명세서 보기' : '초안 생성 중...',
      buttonIcon: FileText,
      href: projectStatus === 'done' ? `/drafts/${projectId}` : undefined,
      disabled: projectStatus !== 'done',
    },
  ];
};
