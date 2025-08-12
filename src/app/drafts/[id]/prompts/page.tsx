import { notFound } from "next/navigation";
import { PromptBundle } from "@/components/prompts/prompt-bundle";
import { Breadcrumb } from "@/components/layout/breadcrumb";

interface PromptsPageProps {
  params: Promise<{ id: string }>;
}

export default async function PromptsPage({ params }: PromptsPageProps) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb 
        items={[
          { label: "홈", href: "/" },
          { label: "드래프트", href: "/drafts" },
          { label: `드래프트 ${id}`, href: `/drafts/${id}` },
          { label: "AI 프롬프트", href: `/drafts/${id}/prompts` }
        ]} 
      />
      
      <div className="mt-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">AI 실행 프롬프트</h1>
          <p className="text-muted-foreground">
            codegen, test, review 용도별 구조화된 프롬프트 번들
          </p>
        </div>
        
        <PromptBundle draftId={id} />
      </div>
    </div>
  );
}
