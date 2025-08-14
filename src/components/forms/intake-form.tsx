'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus, RefreshCw } from 'lucide-react';
import { IntakeSchema, type IntakeValues } from '@/lib/api/schemas';
import { post } from '@/lib/api/client';
import { useToast } from '@/lib/store/useUi';
import { useOAuthStatus, useOAuthConnect } from '@/lib/hooks/useOAuth';
import { OAuthCard } from '@/components/auth/oauth-card';
import {
  container,
  headerSection,
  headerActions,
  oauthSection,
  formSection,
  errorText,
  focusFilesGrid,
  focusFileBadge,
  focusFilesActions,
  removeButton,
  removeIcon,
  addFileButton,
  submitButton,
  loadingSpinner,
  buttonIcon,
} from './intake-form.css';

export function IntakeForm() {
  const router = useRouter();
  const { success, error } = useToast();
  const [focusFileInput, setFocusFileInput] = useState('');

  // OAuth 상태 조회
  const { data: oauthStatus, isLoading: isOAuthLoading, refetch: refetchOAuth } = useOAuthStatus();
  const connectOAuth = useOAuthConnect();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IntakeValues>({
    resolver: zodResolver(IntakeSchema),
    defaultValues: {
      confidentiality: 'public',
      focus_files: [],
    },
  });

  const focusFiles = watch('focus_files') || [];

  const addFocusFile = () => {
    if (focusFileInput.trim() && !focusFiles.includes(focusFileInput.trim())) {
      setValue('focus_files', [...focusFiles, focusFileInput.trim()]);
      setFocusFileInput('');
    }
  };

  const removeFocusFile = (index: number) => {
    setValue(
      'focus_files',
      focusFiles.filter((_, i) => i !== index)
    );
  };

  // 프로젝트 생성 mutation
  const createProject = useMutation({
    mutationFn: (data: IntakeValues) =>
      post<{ jobId: string; projectId: string }>('/projects/intake', data),
    onSuccess: (response) => {
      success('프로젝트가 생성되었습니다! 프로젝트 대시보드로 이동합니다.');
      router.push(`/projects/${response.projectId}`);
    },
    onError: (err: Error) => {
      error(err.message || '프로젝트 생성에 실패했습니다.', '프로젝트 생성 실패');
    },
  });

  const onSubmit = (data: IntakeValues) => {
    createProject.mutate(data);
  };

  const handleConnectOAuth = (provider: 'github' | 'notion') => {
    connectOAuth.mutate(provider);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={container}>
      {/* OAuth 상태 */}
      <div className={headerSection}>
        <div className={headerActions}>
          <Label>연결 상태</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => refetchOAuth()}
            disabled={isOAuthLoading}
          >
            <RefreshCw className={isOAuthLoading ? loadingSpinner : buttonIcon} />
            새로고침
          </Button>
        </div>

        <div className={oauthSection}>
          <OAuthCard
            provider="github"
            isConnected={oauthStatus?.github || false}
            isLoading={isOAuthLoading}
            onConnect={() => handleConnectOAuth('github')}
            isPending={connectOAuth.isPending}
          />

          <OAuthCard
            provider="notion"
            isConnected={oauthStatus?.notion || false}
            isLoading={isOAuthLoading}
            onConnect={() => handleConnectOAuth('notion')}
            isPending={connectOAuth.isPending}
          />
        </div>
      </div>

      {/* 소스 Notion URL */}
      <div className={formSection}>
        <Label htmlFor="source_notion_url">소스 Notion URL *</Label>
        <Input
          id="source_notion_url"
          placeholder="https://notion.so/your-page-url"
          {...register('source_notion_url')}
        />
        {errors.source_notion_url && (
          <p className={errorText}>{errors.source_notion_url.message}</p>
        )}
      </div>

      {/* GitHub 레포지토리 */}
      <div className={formSection}>
        <Label htmlFor="repo">GitHub 레포지토리 *</Label>
        <Input
          id="repo"
          placeholder="owner/repository (예: microsoft/vscode)"
          {...register('repo')}
        />
        {errors.repo && <p className={errorText}>{errors.repo.message}</p>}
      </div>

      {/* Focus Files */}
      <div className={formSection}>
        <Label>중점 분석 파일 *</Label>
        <div className={focusFilesActions}>
          <Input
            placeholder="src/components/Button.tsx"
            value={focusFileInput}
            onChange={(e) => setFocusFileInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addFocusFile();
              }
            }}
          />
          <Button type="button" onClick={addFocusFile} size="icon" variant="outline">
            <Plus className={buttonIcon} />
          </Button>
        </div>

        {focusFiles.length > 0 && (
          <div className={focusFilesGrid}>
            {focusFiles.map((file, index) => (
              <Badge key={index} variant="secondary" className={focusFileBadge}>
                {file}
                <button
                  type="button"
                  onClick={() => removeFocusFile(index)}
                  className={removeButton}
                >
                  <X className={removeIcon} />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {errors.focus_files && <p className={errorText}>{errors.focus_files.message}</p>}
      </div>

      {/* 출력 Notion URL */}
      <div className={formSection}>
        <Label htmlFor="output_notion_url">출력 Notion URL *</Label>
        <Input
          id="output_notion_url"
          placeholder="https://notion.so/output-page-url"
          {...register('output_notion_url')}
        />
        {errors.output_notion_url && (
          <p className={errorText}>{errors.output_notion_url.message}</p>
        )}
      </div>

      {/* 제목 (선택사항) */}
      <div className={formSection}>
        <Label htmlFor="title">프로젝트 제목</Label>
        <Input id="title" placeholder="프로젝트 제목을 입력하세요" {...register('title')} />
      </div>

      {/* 기밀성 */}
      <div className={formSection}>
        <Label htmlFor="confidentiality">기밀성 수준 *</Label>
        <select id="confidentiality" className={addFileButton} {...register('confidentiality')}>
          <option value="public">공개</option>
          <option value="internal">내부</option>
          <option value="confidential">기밀</option>
        </select>
      </div>

      <Button type="submit" className={submitButton} disabled={createProject.isPending}>
        {createProject.isPending ? '생성 중...' : '프로젝트 생성'}
      </Button>
    </form>
  );
}
