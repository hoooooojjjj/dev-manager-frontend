"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Github, FileText } from "lucide-react";
import { IntakeSchema, type IntakeValues } from "@/lib/api/schemas";
import { post } from "@/lib/api/client";
import { useToast } from "@/lib/store/useUi";

interface OAuthStatus {
  github: boolean;
  notion: boolean;
}

export function IntakeForm() {
  const router = useRouter();
  const { success, error } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusFileInput, setFocusFileInput] = useState("");
  
  // Mock OAuth 상태 (실제로는 API에서 가져옴)
  const [oauthStatus] = useState<OAuthStatus>({
    github: true,
    notion: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IntakeValues>({
    resolver: zodResolver(IntakeSchema),
    defaultValues: {
      confidentiality: "public",
      focus_files: [],
    },
  });

  const focusFiles = watch("focus_files") || [];

  const addFocusFile = () => {
    if (focusFileInput.trim() && !focusFiles.includes(focusFileInput.trim())) {
      setValue("focus_files", [...focusFiles, focusFileInput.trim()]);
      setFocusFileInput("");
    }
  };

  const removeFocusFile = (index: number) => {
    setValue("focus_files", focusFiles.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: IntakeValues) => {
    try {
      setIsSubmitting(true);
      
      const response = await post<{ jobId: string; projectId: string }>(
        "/projects/intake",
        data
      );

      success("프로젝트가 생성되었습니다!");
      router.push(`/projects/${response.projectId}`);
    } catch (err: any) {
      error(err.message || "프로젝트 생성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* OAuth 상태 */}
      <div className="space-y-3">
        <Label>연결 상태</Label>
        <div className="flex gap-3">
          <Card className="flex-1">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <span className="text-sm font-medium">GitHub</span>
              </div>
              <Badge variant={oauthStatus.github ? "default" : "secondary"}>
                {oauthStatus.github ? "연결됨" : "연결 필요"}
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="flex-1">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Notion</span>
              </div>
              <Badge variant={oauthStatus.notion ? "default" : "secondary"}>
                {oauthStatus.notion ? "연결됨" : "연결 필요"}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 소스 Notion URL */}
      <div className="space-y-2">
        <Label htmlFor="source_notion_url">소스 Notion URL *</Label>
        <Input
          id="source_notion_url"
          placeholder="https://notion.so/your-page-url"
          {...register("source_notion_url")}
        />
        {errors.source_notion_url && (
          <p className="text-sm text-destructive">{errors.source_notion_url.message}</p>
        )}
      </div>

      {/* GitHub 레포지토리 */}
      <div className="space-y-2">
        <Label htmlFor="repo">GitHub 레포지토리 *</Label>
        <Input
          id="repo"
          placeholder="owner/repository (예: microsoft/vscode)"
          {...register("repo")}
        />
        {errors.repo && (
          <p className="text-sm text-destructive">{errors.repo.message}</p>
        )}
      </div>

      {/* Focus Files */}
      <div className="space-y-2">
        <Label>중점 분석 파일 *</Label>
        <div className="flex gap-2">
          <Input
            placeholder="src/components/Button.tsx"
            value={focusFileInput}
            onChange={(e) => setFocusFileInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addFocusFile();
              }
            }}
          />
          <Button type="button" onClick={addFocusFile} size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {focusFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {focusFiles.map((file, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {file}
                <button
                  type="button"
                  onClick={() => removeFocusFile(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        
        {errors.focus_files && (
          <p className="text-sm text-destructive">{errors.focus_files.message}</p>
        )}
      </div>

      {/* 출력 Notion URL */}
      <div className="space-y-2">
        <Label htmlFor="output_notion_url">출력 Notion URL *</Label>
        <Input
          id="output_notion_url"
          placeholder="https://notion.so/output-page-url"
          {...register("output_notion_url")}
        />
        {errors.output_notion_url && (
          <p className="text-sm text-destructive">{errors.output_notion_url.message}</p>
        )}
      </div>

      {/* 제목 (선택사항) */}
      <div className="space-y-2">
        <Label htmlFor="title">프로젝트 제목</Label>
        <Input
          id="title"
          placeholder="프로젝트 제목을 입력하세요"
          {...register("title")}
        />
      </div>

      {/* 기밀성 */}
      <div className="space-y-2">
        <Label htmlFor="confidentiality">기밀성 수준 *</Label>
        <select
          id="confidentiality"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          {...register("confidentiality")}
        >
          <option value="public">공개</option>
          <option value="internal">내부</option>
          <option value="confidential">기밀</option>
        </select>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "생성 중..." : "프로젝트 생성"}
      </Button>
    </form>
  );
}
