import { z } from 'zod';

export const ProjectStatusSchema = z.enum(['processing', 'completed', 'error']);

export const ProjectSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  title: z.string(),
  notion_url: z.string().url(),
  repo: z.string(),
  focus_files: z.array(z.string()),
  output_notion_url: z.string().url(),
  status: ProjectStatusSchema,
  created_at: z.string(),
  updated_at: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;
