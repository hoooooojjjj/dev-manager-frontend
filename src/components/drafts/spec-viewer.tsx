"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  ExternalLink, 
  Code, 
  GitPullRequest, 
  FileIcon, 
  Globe,
  Briefcase,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

interface SpecViewerProps {
  draftId: string;
}

export function SpecViewer({ draftId }: SpecViewerProps) {
  // Mock 데이터
  const spec = {
    title: "사용자 인증 시스템 JWT 보안 강화",
    summary: "현재 사용자 인증 시스템의 JWT 구현에서 발견된 보안 취약점을 해결하고, 업계 표준에 맞는 보안 강화 방안을 적용합니다. 토큰 만료 처리, 리프레시 토큰 관리, CSRF 방어 등을 개선합니다.",
    version: 1,
    quality_score: 85,
    sections: [
      { id: "summary", title: "TL;DR", completed: true },
      { id: "context", title: "컨텍스트", completed: true },
      { id: "current_behavior", title: "현재 동작", completed: true },
      { id: "root_cause", title: "근본 원인", completed: true },
      { id: "solutions", title: "해결 방안", completed: false },
      { id: "learning_points", title: "학습 포인트", completed: true },
    ]
  };

  const citations = [
    { type: "code", url: "auth/jwt.ts#L45-67", title: "JWT 검증 로직" },
    { type: "pr", url: "owner/repo#123", title: "JWT 보안 개선 PR" },
    { type: "doc", url: "https://auth0.com/jwt-guide", title: "JWT 보안 가이드" },
    { type: "web", url: "https://owasp.org/jwt-security", title: "OWASP JWT 보안" },
    { type: "job", url: "kakao-auth-engineer", title: "카카오 인증 엔지니어" },
  ];

  const getCitationIcon = (type: string) => {
    switch (type) {
      case "code": return <Code className="h-4 w-4" />;
      case "pr": return <GitPullRequest className="h-4 w-4" />;
      case "doc": return <FileIcon className="h-4 w-4" />;
      case "web": return <Globe className="h-4 w-4" />;
      case "job": return <Briefcase className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 헤더 */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{spec.title}</CardTitle>
              <p className="text-muted-foreground">{spec.summary}</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="outline">v{spec.version}</Badge>
                <Badge variant={spec.quality_score >= 80 ? "default" : "secondary"}>
                  품질 점수: {spec.quality_score}%
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a href={`/drafts/${draftId}/review`}>
                  <FileText className="h-4 w-4 mr-2" />
                  리뷰하기
                </a>
              </Button>
              <Button asChild>
                <a href={`/drafts/${draftId}/prompts`}>
                  프롬프트 생성
                </a>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 좌측 목차 */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">목차</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-2">
              {spec.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center justify-between p-2 text-sm rounded-md hover:bg-muted transition-colors"
                >
                  <span>{section.title}</span>
                  {section.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  )}
                </a>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-3 space-y-6">
          {/* TL;DR */}
          <Card id="summary">
            <CardHeader>
              <CardTitle>TL;DR</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                JWT 토큰 기반 인증 시스템의 보안 취약점 해결. 주요 개선사항: 
                (1) 토큰 만료 시간 단축 (24시간 → 15분), 
                (2) 리프레시 토큰 로테이션 도입, 
                (3) CSRF 방어를 위한 SameSite 쿠키 적용,
                (4) 토큰 블랙리스트 Redis 캐시 구현.
                예상 개발 기간: 1.5주, 성능 영향 &lt;5ms.
              </p>
            </CardContent>
          </Card>

          {/* 현재 동작 */}
          <Card id="current_behavior">
            <CardHeader>
              <CardTitle>현재 동작</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  현재 인증 시스템은 JWT 액세스 토큰(24시간 만료)과 별도의 리프레시 토큰 없이 운영되고 있습니다.
                </p>
                
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">주요 문제점</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      긴 토큰 만료 시간으로 인한 보안 위험
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      토큰 무효화 메커니즘 부재
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      CSRF 공격에 취약한 쿠키 설정
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 근본 원인 */}
          <Card id="root_cause">
            <CardHeader>
              <CardTitle>근본 원인 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-medium">가설 1: 초기 설계 시 보안 고려 부족</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    빠른 프로토타이핑을 위해 단순한 JWT 구현을 선택했으나, 보안 강화 요구사항이 후순위로 밀림
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {getCitationIcon("code")} auth/jwt.ts#L45-67
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {getCitationIcon("pr")} PR #123 Initial JWT Implementation
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 해결 방안 */}
          <Card id="solutions">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                해결 방안
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-sm text-yellow-800">
                  이 섹션은 아직 완료되지 않았습니다. 리뷰 단계에서 상세한 해결방안을 작성해주세요.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 인용 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>인용 소스</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {citations.map((citation, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 border rounded-md hover:bg-muted transition-colors"
              >
                {getCitationIcon(citation.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{citation.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{citation.url}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
