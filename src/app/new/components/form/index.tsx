'use client';

import { useState } from 'react';
import { FieldErrors, useForm, UseFormSetValue } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import { X, Plus } from 'lucide-react';
import * as S from './index.css';
import { addArrayItem, ArrayFieldName, removeArrayItem } from './utils';
import { vars } from '@/styles/theme.css';
import { useCreateProject } from '@/api/project/mutations';
import { IntakeSchema, IntakeValues } from '@/api/project/requests.dto';

export function IntakeForm() {
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
      <ArrayFormSection
        label="소스 Notion URL"
        values={notionUrls}
        setValue={setValue}
        fieldName="notionUrls"
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        errors={errors}
      />

      {/* GitHub 레포지토리 */}
      <ArrayFormSection
        label="GitHub 레포지토리"
        values={repos}
        setValue={setValue}
        fieldName="repos"
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        errors={errors}
      />

      {/* Focus Files */}
      <ArrayFormSection
        label="중점 분석 파일"
        values={focusFiles}
        setValue={setValue}
        fieldName="focusFiles"
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        errors={errors}
      />

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

interface ArrayFormSectionProps {
  label: string;
  values: IntakeValues['notionUrls'] | IntakeValues['repos'] | IntakeValues['focusFiles'];
  setValue: UseFormSetValue<IntakeValues>;
  fieldName: ArrayFieldName;
  addArrayItem: (
    input: string,
    currentArray: string[],
    fieldName: ArrayFieldName,
    setValue: UseFormSetValue<IntakeValues>,
    setInput: (value: string) => void
  ) => void;
  removeArrayItem: (
    index: number,
    currentArray: string[],
    fieldName: ArrayFieldName,
    setValue: UseFormSetValue<IntakeValues>
  ) => void;
  errors: FieldErrors<IntakeValues>;
}

const ArrayFormSection = ({
  label,
  values,
  setValue,
  fieldName,
  addArrayItem,
  removeArrayItem,
  errors,
}: ArrayFormSectionProps) => {
  const [inputs, setInputs] = useState('');

  return (
    <div className={S.formSection}>
      <Label>{label} *</Label>
      <div className={S.focusFilesActions}>
        <Input
          placeholder="src/components/Button.tsx"
          value={inputs}
          onChange={(e) => setInputs(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addArrayItem(inputs, values, fieldName, setValue, setInputs);
            }
          }}
        />
        <Button
          type="button"
          onClick={() => addArrayItem(inputs, values, fieldName, setValue, setInputs)}
          size="icon"
          variant="outline"
        >
          <Plus className={S.buttonIcon} />
        </Button>
      </div>

      {values.length > 0 && (
        <div className={S.focusFilesGrid}>
          {values.map((file, index) => (
            <Badge key={index} variant="secondary" className={S.focusFileBadge}>
              {file}
              <Button
                type="button"
                onClick={() => removeArrayItem(index, values, fieldName, setValue)}
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
  );
};
