import { notFound } from "next/navigation";
import { PromptBundle } from "@/components/prompts/prompt-bundle";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { container, contentWrapper, headerSection, title, description } from "./page.css";

interface PromptsPageProps {
  params: Promise<{ id: string }>;
}

export default async function PromptsPage({ params }: PromptsPageProps) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  return (
    <div className={container}>
      <Breadcrumb 
        items={[
          { label: "홈", href: "/" },
          { label: "드래프트", href: "/drafts" },
          { label: `드래프트 ${id}`, href: `/drafts/${id}` },
          { label: "AI 프롬프트", href: `/drafts/${id}/prompts` }
        ]} 
      />
      
      <div className={contentWrapper}>
        <div className={headerSection}>
          <h1 className={title}>AI 실행 프롬프트</h1>
          <p className={description}>
            codegen, test, review 용도별 구조화된 프롬프트 번들
          </p>
        </div>
        
        <PromptBundle draftId={id} />
      </div>
    </div>
  );
}
