import { IntakeForm } from "@/components/forms/intake-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProjectPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">새 프로젝트 생성</h1>
          <p className="text-muted-foreground mt-2">
            Notion PRD와 GitHub 리포지토리 정보를 입력하여 개발 명세서 생성을 시작하세요
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>프로젝트 정보</CardTitle>
            <CardDescription>
              모든 필드는 필수입니다. OAuth 연결 상태를 확인해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IntakeForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
