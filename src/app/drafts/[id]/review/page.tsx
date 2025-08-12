import { notFound } from "next/navigation";
import { ReviewInterface } from "@/components/drafts/review-interface";
import { Breadcrumb } from "@/components/layout/breadcrumb";

interface ReviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
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
          { label: "리뷰", href: `/drafts/${id}/review` }
        ]} 
      />
      
      <div className="mt-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">개발 명세서 리뷰</h1>
          <p className="text-muted-foreground">
            섹션별 수정 지시와 Diff 확인을 통해 명세서를 개선하세요
          </p>
        </div>
        
        <ReviewInterface draftId={id} />
      </div>
    </div>
  );
}
