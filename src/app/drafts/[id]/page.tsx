import { notFound } from "next/navigation";
import { SpecViewer } from "@/components/drafts/spec-viewer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { container, contentWrapper } from "./page.css";

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
          { label: "홈", href: "/" },
          { label: "드래프트", href: "/drafts" },
          { label: `드래프트 ${id}`, href: `/drafts/${id}` }
        ]} 
      />
      
      <div className={contentWrapper}>
        <SpecViewer draftId={id} />
      </div>
    </div>
  );
}
