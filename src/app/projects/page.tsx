import { ProjectsList } from "@/components/projects/projects-list";
import { Breadcrumb } from "@/components/layout/breadcrumb";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb 
        items={[
          { label: "홈", href: "/" },
          { label: "프로젝트 목록", href: "/projects" }
        ]} 
      />
      
      <div className="mt-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">프로젝트 목록</h1>
          <p className="text-muted-foreground">
            생성된 모든 프로젝트를 확인하고 관리하세요
          </p>
        </div>
        
        <ProjectsList />
      </div>
    </div>
  );
}
