import { notFound } from 'next/navigation';
import { ResearchPanel } from '@/app/projects/(detail)/[id]/research/components/research-panel';
import { Breadcrumb } from '@/components/layout/breadcrumb';
import * as S from './page.css';

interface ResearchPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResearchPage({ params }: ResearchPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className={S.container}>
      <Breadcrumb
        items={[
          { label: '홈', href: '/' },
          { label: '프로젝트', href: '/projects' },
          { label: `프로젝트 ${id}`, href: `/projects/${id}` },
          { label: '리서치', href: `/projects/${id}/research` },
        ]}
      />

      <div className={S.contentWrapper}>
        <div className={S.headerSection}>
          <h1 className={S.title}>리서치 결과</h1>
          <p className={S.description}>Brave 검색을 통한 레퍼런스와 대기업 채용공고 분석 결과</p>
        </div>

        <ResearchPanel projectId={id} />
      </div>
    </div>
  );
}
