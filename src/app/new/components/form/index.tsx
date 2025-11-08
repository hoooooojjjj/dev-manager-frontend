'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { X, Plus } from 'lucide-react';
import * as S from './index.css';
import { addFocusFile, removeFocusFile } from './utils';
import { vars } from '@/styles/theme.css';
import { useCreateProject } from '@/api/project/mutations';
import { IntakeSchema, IntakeValues } from '@/api/project/requests.dto';

export function IntakeForm() {
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
      focus_files: [],
    },
  });

  const focusFiles = watch('focus_files') || [];

  const { mutate: createProject, isPending } = useCreateProject();

  const onSubmit = (data: IntakeValues) => {
    createProject(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={S.container}>
      {/* 소스 Notion URL */}
      <div className={S.formSection}>
        <Label htmlFor="notion_url">소스 Notion URL *</Label>
        <Input
          id="notion_url"
          placeholder="https://notion.so/your-page-url"
          {...register('notion_url')}
        />
        {errors.notion_url && <p className={S.errorText}>{errors.notion_url.message}</p>}
      </div>

      {/* GitHub 레포지토리 */}
      <div className={S.formSection}>
        <Label htmlFor="repo">GitHub 레포지토리 *</Label>
        <Input
          id="repo"
          placeholder="owner/repository (예: microsoft/vscode)"
          {...register('repo')}
        />
        {errors.repo && <p className={S.errorText}>{errors.repo.message}</p>}
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

        {errors.focus_files && <p className={S.errorText}>{errors.focus_files.message}</p>}
      </div>

      {/* 출력 Notion URL */}
      <div className={S.formSection}>
        <Label htmlFor="output_notion_url">출력 Notion URL *</Label>
        <Input
          id="output_notion_url"
          placeholder="https://notion.so/output-page-url"
          {...register('output_notion_url')}
        />
        {errors.output_notion_url && (
          <p className={S.errorText}>{errors.output_notion_url.message}</p>
        )}
      </div>

      {/* 제목 (선택사항) */}
      <div className={S.formSection}>
        <Label htmlFor="title">프로젝트 제목</Label>
        <Input id="title" placeholder="프로젝트 제목을 입력하세요" {...register('title')} />
      </div>

      <Button type="submit" className={S.submitButton} disabled={isPending}>
        {isPending ? '생성 중...' : '프로젝트 생성'}
      </Button>
    </form>
  );
}
