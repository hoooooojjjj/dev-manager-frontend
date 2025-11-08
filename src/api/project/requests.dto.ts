import { z } from 'zod';

export const IntakeSchema = z.object({
  title: z.string(),
  notionUrls: z
    .array(
      z
        .string()
        .url({ message: '올바른 Notion URL을 입력해주세요' })
        .refine((url) => url.includes('notion.so') || url.includes('notion.com'), {
          message: 'Notion URL이어야 합니다',
        })
    )
    .min(1, { message: '최소 1개의 Notion URL을 지정해주세요' })
    .max(10, { message: '최대 10개까지 지정 가능합니다' }),
  repos: z
    .array(
      z.string().regex(/^[\w.-]+\/[\w.-]+$/, {
        message: 'owner/repository 형식으로 입력해주세요 (예: microsoft/vscode)',
      })
    )
    .min(1, { message: '최소 1개의 레포지토리를 지정해주세요' })
    .max(10, { message: '최대 10개까지 지정 가능합니다' }),
  focusFiles: z
    .array(z.string().min(1, '파일 경로를 입력해주세요'))
    .min(1, { message: '최소 1개의 파일을 지정해주세요' })
    .max(20, { message: '최대 20개까지 지정 가능합니다' }),
  outputNotionUrl: z
    .string()
    .url({ message: '올바른 Notion URL을 입력해주세요' })
    .refine((url) => url.includes('notion.so') || url.includes('notion.com'), {
      message: 'Notion URL이어야 합니다',
    }),
});

export type IntakeValues = z.infer<typeof IntakeSchema>;
