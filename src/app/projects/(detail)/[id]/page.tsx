import { notFound } from 'next/navigation';
import { ProjectDashboard } from '@/app/projects/(detail)/[id]/components';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { container, contentWrapper } from './page.css';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
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
        ]}
      />

      <div className={contentWrapper}>
        <ProjectDashboard projectId={id} />
      </div>
    </div>
  );
}
