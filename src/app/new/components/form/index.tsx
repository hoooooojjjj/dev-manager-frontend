'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import { X, Plus } from 'lucide-react';
import * as S from './index.css';
import {
  addFocusFile,
  removeFocusFile,
  addNotionUrl,
  removeNotionUrl,
  addRepo,
  removeRepo,
} from './utils';
import { vars } from '@/styles/theme.css';
import { useCreateProject } from '@/api/project/mutations';
import { IntakeSchema, IntakeValues } from '@/api/project/requests.dto';

export function IntakeForm() {
  const [notionUrlInput, setNotionUrlInput] = useState('');
  const [repoInput, setRepoInput] = useState('');
  const [focusFileInput, setFocusFileInput] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IntakeValues>({
    resolver: zodResolver(IntakeSchema),
    defaultValues: {
      notionUrls: [],
      repos: [],
      focusFiles: [],
    },
  });

  const notionUrls = watch('notionUrls') || [];
  const repos = watch('repos') || [];
  const focusFiles = watch('focusFiles') || [];

  const { mutate: createProject, isPending } = useCreateProject();

  const onSubmit = (data: IntakeValues) => {
    createProject(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={S.container}>
      {/* 소스 Notion URL */}
      <div className={S.formSection}>
        <Label>소스 Notion URL *</Label>
        <div className={S.focusFilesActions}>
          <Input
            placeholder="https://notion.so/your-page-url"
            value={notionUrlInput}
            onChange={(e) => setNotionUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addNotionUrl(notionUrlInput, notionUrls, setValue, setNotionUrlInput);
              }
            }}
          />
          <Button
            type="button"
            onClick={() => addNotionUrl(notionUrlInput, notionUrls, setValue, setNotionUrlInput)}
            size="icon"
            variant="outline"
          >
            <Plus className={S.buttonIcon} />
          </Button>
        </div>

        {notionUrls.length > 0 && (
          <div className={S.focusFilesGrid}>
            {notionUrls.map((url, index) => (
              <Badge key={index} variant="secondary" className={S.focusFileBadge}>
                {url}
                <Button
                  type="button"
                  onClick={() => removeNotionUrl(index, notionUrls, setValue)}
                  className={S.removeButton}
                  size="icon"
                  variant="ghost"
                >
                  <X className={S.removeIcon} color={vars.colors.primary} />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {errors.notionUrls && <p className={S.errorText}>{errors.notionUrls.message}</p>}
      </div>

      {/* GitHub 레포지토리 */}
      <div className={S.formSection}>
        <Label>GitHub 레포지토리 *</Label>
        <div className={S.focusFilesActions}>
          <Input
            placeholder="owner/repository (예: microsoft/vscode)"
            value={repoInput}
            onChange={(e) => setRepoInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addRepo(repoInput, repos, setValue, setRepoInput);
              }
            }}
          />
          <Button
            type="button"
            onClick={() => addRepo(repoInput, repos, setValue, setRepoInput)}
            size="icon"
            variant="outline"
          >
            <Plus className={S.buttonIcon} />
          </Button>
        </div>

        {repos.length > 0 && (
          <div className={S.focusFilesGrid}>
            {repos.map((repo, index) => (
              <Badge key={index} variant="secondary" className={S.focusFileBadge}>
                {repo}
                <Button
                  type="button"
                  onClick={() => removeRepo(index, repos, setValue)}
                  className={S.removeButton}
                  size="icon"
                  variant="ghost"
                >
                  <X className={S.removeIcon} color={vars.colors.primary} />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {errors.repos && <p className={S.errorText}>{errors.repos.message}</p>}
      </div>

      {/* Focus Files */}
      <div className={S.formSection}>
        <Label>중점 분석 파일 *</Label>
        <div className={S.focusFilesActions}>
          <Input
            placeholder="src/components/Button.tsx"
            value={focusFileInput}
            onChange={(e) => setFocusFileInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addFocusFile(focusFileInput, focusFiles, setValue, setFocusFileInput);
              }
            }}
          />
          <Button
            type="button"
            onClick={() => addFocusFile(focusFileInput, focusFiles, setValue, setFocusFileInput)}
            size="icon"
            variant="outline"
          >
            <Plus className={S.buttonIcon} />
          </Button>
        </div>

        {focusFiles.length > 0 && (
          <div className={S.focusFilesGrid}>
            {focusFiles.map((file, index) => (
              <Badge key={index} variant="secondary" className={S.focusFileBadge}>
                {file}
                <Button
                  type="button"
                  onClick={() => removeFocusFile(index, focusFiles, setValue)}
                  className={S.removeButton}
                  size="icon"
                  variant="ghost"
                >
                  <X className={S.removeIcon} color={vars.colors.primary} />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {errors.focusFiles && <p className={S.errorText}>{errors.focusFiles.message}</p>}
      </div>

      {/* 출력 Notion URL */}
      <div className={S.formSection}>
        <Label htmlFor="outputNotionUrl">출력 Notion URL *</Label>
        <Input
          id="outputNotionUrl"
          placeholder="https://notion.so/output-page-url"
          {...register('outputNotionUrl')}
        />
        {errors.outputNotionUrl && <p className={S.errorText}>{errors.outputNotionUrl.message}</p>}
      </div>

      {/* 제목 */}
      <div className={S.formSection}>
        <Label htmlFor="title">프로젝트 제목 *</Label>
        <Input id="title" placeholder="프로젝트 제목을 입력하세요" {...register('title')} />
        {errors.title && <p className={S.errorText}>{errors.title.message}</p>}
      </div>

      <Button type="submit" className={S.submitButton} disabled={isPending}>
        {isPending ? '생성 중...' : '프로젝트 생성'}
      </Button>
    </form>
  );
}
