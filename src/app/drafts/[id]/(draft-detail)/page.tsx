import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/components/Breadcrumb';
import { container, contentWrapper } from './page.css';
import { SpecViewer } from './components/spec-viewer';

interface DraftPageProps {
  params: Promise<{ id: string }>;
}

export default async function DraftPage({ params }: DraftPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className={container}>
      <Breadcrumb
        items={[
          { label: '홈', href: '/' },
          { label: '프로젝트 목록', href: '/projects' },
          { label: `프로젝트 ${id}`, href: `/projects/${id}` },
          { label: `드래프트 ${id}`, href: `/drafts/${id}` },
        ]}
      />

      <div className={contentWrapper}>
        <SpecViewer draftId={id} />
      </div>
    </div>
  );
}
