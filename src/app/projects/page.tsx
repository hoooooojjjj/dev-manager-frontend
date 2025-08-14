import { ProjectsList } from "@/components/projects/projects-list";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { container, contentWrapper, headerSection, title, description } from "./page.css";

export default function ProjectsPage() {
  return (
    <div className={container}>
      <Breadcrumb 
        items={[
          { label: "홈", href: "/" },
          { label: "프로젝트 목록", href: "/projects" }
        ]} 
      />
      
      <div className={contentWrapper}>
        <div className={headerSection}>
          <h1 className={title}>프로젝트 목록</h1>
          <p className={description}>
            생성된 모든 프로젝트를 확인하고 관리하세요
          </p>
        </div>
        
        <ProjectsList />
      </div>
    </div>
  );
}
