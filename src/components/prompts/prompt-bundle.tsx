"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy, 
  Check, 
  Code, 
  TestTube, 
  MessageSquare,
  Download,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/lib/store/useUi";

interface PromptBundleProps {
  draftId: string;
}

export function PromptBundle({ draftId }: PromptBundleProps) {
  const { success } = useToast();
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const prompts = {
    codegen: `[system]
너는 Next.js 14, TypeScript, JWT 보안 전문가다. 접근성과 타입 안정성을 우선한다.

[context]
프로젝트: 사용자 인증 시스템 JWT 보안 강화
요구사항: 토큰 만료 시간 단축(15분), 리프레시 토큰 로테이션, CSRF 방어
제약: Asia/Seoul 시간대, Redis 사용, 성능 < 5ms

[user]
다음 요구사항에 맞춰 JWT 보안 강화 코드를 구현해줘:
- 토큰 만료 시간을 15분으로 설정
- 리프레시 토큰 로테이션 로직 구현
- SameSite 쿠키 적용
- Redis 기반 토큰 블랙리스트

출력: 변경된 파일 목록과 각 파일의 전체 코드.`,

    test: `[system]
너는 JWT 보안 테스트 전문가다. 보안 취약점과 엣지 케이스를 철저히 검증한다.

[context]
테스트 대상: JWT 보안 강화 구현
주요 테스트 시나리오: 토큰 만료, 리프레시 로테이션, CSRF 방어
도구: Jest, Supertest, Redis Mock

[user]
다음 시나리오에 대한 통합 테스트를 작성해줘:
1. 토큰 만료 시 자동 갱신 플로우
2. 리프레시 토큰 탈취 시 무효화
3. CSRF 공격 방어 검증
4. 성능 벤치마크 (응답시간 < 5ms)

출력: 테스트 파일과 실행 가능한 테스트 케이스.`,

    review: `[system]
너는 시니어 보안 아키텍트다. 코드 리뷰 시 보안성, 성능, 유지보수성을 종합 평가한다.

[context]
리뷰 대상: JWT 보안 강화 PR
보안 기준: OWASP Top 10, JWT 보안 가이드라인
성능 기준: 토큰 검증 < 5ms, Redis 연결 < 3ms

[user]
다음 JWT 보안 구현을 리뷰해줘:
{code_snippet}

리뷰 관점:
1. 보안 취약점 분석
2. 성능 최적화 포인트
3. 코드 품질 개선사항
4. 운영 관점 고려사항

출력: 구체적인 개선사항과 우선순위.`
  };

  const variables = {
    codegen: [
      { name: "{project_context}", value: "사용자 인증 시스템 JWT 보안 강화" },
      { name: "{constraints}", value: "Asia/Seoul, Redis, 성능 < 5ms" },
      { name: "{requirements}", value: "토큰 만료 15분, 리프레시 로테이션" }
    ],
    test: [
      { name: "{test_scenarios}", value: "토큰 만료, 리프레시 로테이션, CSRF 방어" },
      { name: "{performance_target}", value: "응답시간 < 5ms" }
    ],
    review: [
      { name: "{code_snippet}", value: "실제 구현된 JWT 코드 스니펫" },
      { name: "{security_criteria}", value: "OWASP Top 10, JWT 가이드라인" }
    ]
  };

  const copyToClipboard = async (text: string, promptType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(promptType);
      success("프롬프트가 클립보드에 복사되었습니다!");
      
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getPromptIcon = (type: string) => {
    switch (type) {
      case "codegen": return <Code className="h-4 w-4" />;
      case "test": return <TestTube className="h-4 w-4" />;
      case "review": return <MessageSquare className="h-4 w-4" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  const getPromptTitle = (type: string) => {
    switch (type) {
      case "codegen": return "코드 생성";
      case "test": return "테스트 작성";
      case "review": return "코드 리뷰";
      default: return type;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 헤더 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">AI 실행 프롬프트 번들</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                재생성
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                다운로드
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            개발 명세서를 기반으로 생성된 구조화된 AI 프롬프트입니다.
          </p>
        </CardHeader>
      </Card>

      {/* 프롬프트 탭 */}
      <Tabs defaultValue="codegen" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="codegen" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            코드 생성
          </TabsTrigger>
          <TabsTrigger value="test" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            테스트 작성
          </TabsTrigger>
          <TabsTrigger value="review" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            코드 리뷰
          </TabsTrigger>
        </TabsList>

        {Object.entries(prompts).map(([type, prompt]) => (
          <TabsContent key={type} value={type} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getPromptIcon(type)}
                    {getPromptTitle(type)} 프롬프트
                  </CardTitle>
                  <Button
                    onClick={() => copyToClipboard(prompt, type)}
                    variant="outline"
                    className="gap-2"
                  >
                    {copiedPrompt === type ? (
                      <>
                        <Check className="h-4 w-4" />
                        복사됨
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        복사
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                    {prompt}
                  </pre>
                  
                  {/* 변수 목록 */}
                  <div>
                    <h4 className="font-medium mb-3">사용된 변수</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {variables[type as keyof typeof variables]?.map((variable, index) => (
                        <div key={index} className="border rounded-md p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs font-mono">
                              {variable.name}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {variable.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* 사용 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>사용 가이드</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Code className="h-4 w-4 text-blue-600" />
                  코드 생성
                </h4>
                <p className="text-sm text-muted-foreground">
                  Claude, GPT-4 등에서 전체 파일 코드를 생성할 때 사용하세요. 
                  컨텍스트와 제약사항이 포함되어 있습니다.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <TestTube className="h-4 w-4 text-green-600" />
                  테스트 작성
                </h4>
                <p className="text-sm text-muted-foreground">
                  보안 테스트와 성능 벤치마크 코드를 생성할 때 사용하세요.
                  엣지 케이스까지 포함됩니다.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                  코드 리뷰
                </h4>
                <p className="text-sm text-muted-foreground">
                  구현된 코드의 보안성과 품질을 검토할 때 사용하세요.
                  구체적인 개선사항을 제안합니다.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-medium text-blue-900 mb-1">💡 팁</h4>
              <p className="text-sm text-blue-800">
                변수는 실제 값으로 교체한 후 사용하세요. 프롬프트 엔진의 특성에 맞게 
                시스템 메시지와 사용자 메시지를 구분하여 입력하시기 바랍니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
