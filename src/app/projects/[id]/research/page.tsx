import { notFound } from "next/navigation";
import { ResearchPanel } from "@/components/research/research-panel";
import { Breadcrumb } from "@/components/layout/breadcrumb";

interface ResearchPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResearchPage({ params }: ResearchPageProps) {
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
          { label: `프로젝트 ${id}`, href: `/projects/${id}` },
          { label: "리서치", href: `/projects/${id}/research` }
        ]} 
      />
      
      <div className="mt-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">리서치 결과</h1>
          <p className="text-muted-foreground">
            Brave 검색을 통한 권위 소스와 대기업 채용공고 분석 결과
          </p>
        </div>
        
        <ResearchPanel projectId={id} />
      </div>
    </div>
  );
}
