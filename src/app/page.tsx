import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, GitBranch, Search, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Dev Manager
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            PRD에서 개발 명세서, AI 실행 프롬프트까지 자동 생성하는 
            <br />
            개발 착수 전 단계 관리 시스템
          </p>
        </div>

        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/new">
              <FileText className="mr-2 h-4 w-4" />
              새 프로젝트 시작
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">
              프로젝트 목록
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full max-w-6xl">
          <Card>
            <CardHeader>
              <Search className="h-8 w-8 text-primary mb-2" />
              <CardTitle>리서치 기반</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                최근 12개월 권위 소스와 대기업 채용공고를 분석하여 Competency Map 생성
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <GitBranch className="h-8 w-8 text-primary mb-2" />
              <CardTitle>GitHub 통합</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                focus_files 기반 코드 분석과 PR/커밋 히스토리 자동 수집
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>근거 기반 명세</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                모든 해결방안에 인용 포함. 추정 금지, 정량 데이터 우선
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>AI 프롬프트 생성</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                codegen, test, review 프롬프트를 구조화하여 자동 생성
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
