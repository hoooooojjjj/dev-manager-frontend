import { notFound } from "next/navigation";
import { ProjectDashboard } from "@/components/projects/project-dashboard";
import { Breadcrumb } from "@/components/layout/breadcrumb";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb 
        items={[
          { label: "홈", href: "/" },
          { label: "프로젝트", href: "/projects" },
          { label: `프로젝트 ${id}`, href: `/projects/${id}` }
        ]} 
      />
      
      <div className="mt-6">
        <ProjectDashboard projectId={id} />
      </div>
    </div>
  );
}
