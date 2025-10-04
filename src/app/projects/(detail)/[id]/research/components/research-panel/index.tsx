'use client';

import React from 'react';
import * as S from './index.css';
import { Card, CardContent } from '@/components/ui/components/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { researchSummary, competencyMap } from './constants';
import { ReferencesTab } from './components/references-tab';
import { JobPostingsTab } from './components/job-postings-tab';
import { CompetencyMapTab } from './components/competency-map-tab';

interface ResearchPanelProps {
  projectId: string;
}

const TAB_CONFIG = [
  { id: 'references', label: '레퍼런스', color: 'green' as const, component: ReferencesTab },
  { id: 'job-postings', label: '채용공고', color: 'blue' as const, component: JobPostingsTab },
  {
    id: 'competency-map',
    label: '역량 매핑',
    color: 'purple' as const,
    component: CompetencyMapTab,
  },
] as const;

export function ResearchPanel({}: ResearchPanelProps) {
  return (
    <div className={S.container}>
      <ResearchSummary />

      <Tabs defaultValue="references" className={S.tabsWrapper}>
        <TabsList className={S.tabsGrid}>
          {TAB_CONFIG.map(({ id, label, color }) => (
            <TabsTrigger key={id} color={color} value={id}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TAB_CONFIG.map(({ id, component: Component }) => (
          <TabsContent key={id} value={id} className={S.tabContent}>
            <Component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export function ResearchSummary() {
  return (
    <Card>
      <CardContent className={S.cardContent}>
        <div className={S.statsGrid}>
          <div className={S.statCenter}>
            <div className={S.statValue}>{researchSummary.totalSources}</div>
            <div className={S.statLabel}>총 소스</div>
          </div>
          <div className={S.statCenter}>
            <div className={S.statIconWrapper}>
              <span className={S.statValueGreen}>{researchSummary.authoritativeSources}</span>
            </div>
            <div className={S.statLabel}>References (≥5)</div>
          </div>
          <div className={S.statCenter}>
            <div className={S.statIconWrapper}>
              <span className={S.statValueBlue}>{researchSummary.jobPostings}</span>
            </div>
            <div className={S.statLabel}>채용공고 (≥3)</div>
          </div>
          <div className={S.statCenter}>
            <div className={S.statValuePurple}>{competencyMap.length}</div>
            <div className={S.statLabel}>역량 매핑</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
