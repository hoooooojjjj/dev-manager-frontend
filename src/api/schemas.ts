/**
 * Zod 스키마 정의
 * 프론트엔드에서 사용하는 모든 데이터 타입과 폼 검증
 */

import { z } from 'zod';

// ============================================================================
// 리서치 스키마
// ============================================================================

export const ResearchSourceSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  kind: z.enum(['reference', 'job_posting']),
  domain: z.string(),
  url: z.string().url(),
  title: z.string(),
  author: z.string().nullable(),
  published_at: z.string().nullable(),
  summary_md: z.string(),
  weight: z.number().default(1),
  metadata: z.record(z.unknown()).optional(),
});

export type ResearchSource = z.infer<typeof ResearchSourceSchema>;

export const CompetencyMapSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  competency: z.string(),
  evidence_ids: z.array(z.string()),
  mapped_solutions: z.array(z.string()),
  gaps: z.array(z.string()).default([]),
  learning_points: z.array(z.string()).default([]),
});

export type CompetencyMap = z.infer<typeof CompetencyMapSchema>;
