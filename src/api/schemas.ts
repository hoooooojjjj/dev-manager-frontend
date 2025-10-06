/**
 * Zod 스키마 정의
 * 프론트엔드에서 사용하는 모든 데이터 타입과 폼 검증
 */

import { z } from 'zod';

// ============================================================================
// 기본 공통 스키마
// ============================================================================

export const ConfidentialitySchema = z.enum(['public', 'internal', 'confidential']);

export const ProjectStatusSchema = z.enum([
  'idle',
  'submitting',
  'queued',
  'collecting',
  'researching',
  'drafting',
  'review',
  'publishing',
  'done',
  'error',
]);

// ============================================================================
// 프로젝트 스키마
// ============================================================================

export const ProjectSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  title: z.string(),
  source_notion_url: z.string().url(),
  repo: z.string(),
  focus_files: z.array(z.string()),
  output_notion_url: z.string().url(),
  confidentiality: ConfidentialitySchema,
  status: ProjectStatusSchema,
  created_at: z.string(),
  updated_at: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;

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

// ============================================================================
// Dev Spec 스키마
// ============================================================================

export const RootCauseSchema = z.object({
  hypothesis: z.string(),
  evidence: z.array(z.string()),
});

export const SolutionSchema = z.object({
  approach: z.string(),
  tradeoffs: z.array(z.string()),
  tasks: z.array(z.string()),
  impact_metrics: z
    .object({
      conversion: z.number().optional(),
      latency_ms: z.number().optional(),
      user_satisfaction: z.number().optional(),
    })
    .optional(),
});

export const ResearchSummarySchema = z.object({
  sources: z.array(
    z.object({
      url: z.string(),
      title: z.string(),
      published_at: z.string().nullable(),
      note: z.string(),
    })
  ),
  competency_map: z.array(
    z.object({
      competency: z.string(),
      evidence: z.array(z.string()),
      applies_to: z.array(z.string()),
    })
  ),
});

export const SpecSchema = z.object({
  title: z.string(),
  summary: z.string(),
  context: z.object({
    product: z.string(),
    stakeholders: z.array(z.string()),
    constraints: z.array(z.string()),
  }),
  current_behavior: z.string(),
  root_cause: z.array(RootCauseSchema),
  solutions: z.array(SolutionSchema),
  learning_points: z.array(z.string()),
  research_summary: ResearchSummarySchema,
  ai_prompts: z.object({
    codegen: z.string(),
    test: z.string(),
    review: z.string(),
  }),
  appendix: z.object({
    links: z.array(z.string()),
    snippets: z.array(z.string()),
  }),
});

export type Spec = z.infer<typeof SpecSchema>;

// ============================================================================
// 리뷰 스키마
// ============================================================================

export const ReviewRequestSchema = z.object({
  section_key: z.string(),
  instruction: z.string().min(10, '최소 10자 이상 입력해주세요'),
  strict_citation: z.boolean().default(false),
});

export type ReviewRequest = z.infer<typeof ReviewRequestSchema>;

export const DiffEntrySchema = z.object({
  before: z.string(),
  after: z.string(),
  section_key: z.string(),
  timestamp: z.string(),
});

export type DiffEntry = z.infer<typeof DiffEntrySchema>;

// ============================================================================
// 에러 스키마
// ============================================================================

export const ApiErrorSchema = z.object({
  type: z.string().optional(),
  title: z.string(),
  status: z.number(),
  detail: z.string().optional(),
  instance: z.string().optional(),
  correlationId: z.string().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;
