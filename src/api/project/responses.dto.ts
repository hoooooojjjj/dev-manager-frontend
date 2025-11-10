import { z } from 'zod';

export const ProjectStatusSchema = z.enum([
  'intake',
  'research',
  'draft',
  'review',
  'prompts',
  'completed',
  'error',
]);

export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export const ProjectSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  notionUrls: z.array(z.string().url()),
  repos: z.array(z.string()),
  focusFiles: z.array(z.string()),
  outputNotionUrl: z.string().url(),
  status: ProjectStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
