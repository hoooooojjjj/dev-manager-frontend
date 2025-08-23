'use client';

import React from 'react';
import * as S from './index.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Calendar, User, Building, CheckCircle2, Star } from 'lucide-react';
import { competencyMap, jobPostings, references, researchSummary } from './constants';

interface ResearchPanelProps {
  projectId: string;
}

export function ResearchPanel({}: ResearchPanelProps) {
  return (
    <div className={S.container}>
      {/* 리서치 요약 */}
      <Card>
        <CardContent>
          <div className={S.statsGrid}>
            <div className={S.statCenter}>
              <div className={S.statValue}>{researchSummary.totalSources}</div>
              <div className={S.statLabel}>총 소스</div>
            </div>
            <div className={S.statCenter}>
              <div className={S.statIconWrapper}>
                <span className={S.statValueGreen}>{researchSummary.authoritativeSources}</span>
                {researchSummary.authoritativeSources >= 5 && (
                  <CheckCircle2 className={S.checkIcon} />
                )}
              </div>
              <div className={S.statLabel}>References (≥5)</div>
            </div>
            <div className={S.statCenter}>
              <div className={S.statIconWrapper}>
                <span className={S.statValueBlue}>{researchSummary.jobPostings}</span>
                {researchSummary.jobPostings >= 3 && <CheckCircle2 className={S.checkIcon} />}
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

      {/* 탭 패널 */}
      <Tabs defaultValue="references" className={S.tabsWrapper}>
        <TabsList className={S.tabsGrid}>
          <TabsTrigger value="references">References</TabsTrigger>
          <TabsTrigger value="job-postings">Job Postings</TabsTrigger>
          <TabsTrigger value="competency-map">Competency Map</TabsTrigger>
        </TabsList>

        <TabsContent value="references" className={S.tabContent}>
          {references.map((ref) => (
            <Card key={ref.id} className={S.cardHover}>
              <CardHeader className={S.cardHeaderItems}>
                <div className={S.cardHeaderFlex}>
                  <div className={S.cardTitleWrapper}>
                    <CardTitle className={S.cardTitle}>{ref.title}</CardTitle>
                    <div className={S.metaWrapper}>
                      <div className={S.metaItem}>
                        <User className={S.metaIcon} />
                        {ref.author}
                      </div>
                      <div className={S.metaItem}>
                        <Calendar className={S.metaIcon} />
                        {new Date(ref.published_at).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </div>
                  <div className={S.rightActions}>
                    <Badge variant="outline">{ref.domain}</Badge>
                    <div className={S.ratingWrapper}>
                      <Star className={S.starIcon} />
                      <span className={S.ratingText}>{ref.weight.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className={S.summary}>{ref.summary}</p>
                <div className={S.bottomActions}>
                  <div className={S.badgeGroup}>
                    <Badge variant="secondary">권위도: {ref.metadata.authority_score}/10</Badge>
                    <Badge variant="secondary">최신성: {ref.metadata.recency_score}/10</Badge>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className={S.externalLinkIcon} />
                      원문 보기
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="job-postings" className={S.tabContent}>
          {jobPostings.map((job) => (
            <Card key={job.id} className={S.cardHover}>
              <CardHeader className={S.cardHeaderItems}>
                <div className={S.jobHeaderFlex}>
                  <div className={S.cardTitleWrapper}>
                    <CardTitle className={S.cardTitle}>{job.title}</CardTitle>
                    <div className={S.jobMetaWrapper}>
                      <div className={S.metaItem}>
                        <Building className={S.metaIcon} />
                        {job.company}
                      </div>
                      <div className={S.metaItem}>
                        <Calendar className={S.metaIcon} />
                        {new Date(job.published_at).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </div>
                  <Badge>{job.metadata.company_tier}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className={S.jobContent}>
                  <div className={S.requirementsSection}>
                    <h4 className={S.requirementsTitle}>요구사항</h4>
                    <div className={S.requirementsBadges}>
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className={S.bottomActions}>
                    <Badge variant="secondary">{job.metadata.salary_range}</Badge>
                    <Button variant="outline" size="sm" asChild>
                      <a href={job.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className={S.externalLinkIcon} />
                        공고 보기
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="competency-map" className={S.tabContent}>
          {competencyMap.map((comp, index) => (
            <Card key={index} className={S.cardHover}>
              <CardHeader className={S.cardHeaderItems}>
                <CardTitle className={S.cardTitle}>{comp.competency}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={S.compContent}>
                  <div className={S.compSection}>
                    <h4 className={S.compSectionTitle}>근거 소스</h4>
                    <div className={S.compBadges}>
                      {comp.evidence.map((evidence, idx) => (
                        <Badge key={idx} variant="outline">
                          {evidence.startsWith('web://') ? '📄' : '💼'}
                          {'  '}
                          {evidence.replace('web://', '').replace('job://', '')}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className={S.compSection}>
                    <h4 className={S.compSectionTitle}>적용 영역</h4>
                    <div className={S.compBadges}>
                      {comp.applies_to.map((area, idx) => (
                        <Badge key={idx} variant="secondary">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className={S.compSection}>
                    <h4 className={S.compSectionTitle}>학습 포인트</h4>
                    <ul className={S.learningPointsList}>
                      {comp.learning_points.map((point, idx) => (
                        <li key={idx} className={S.learningPoint}>
                          <span className={S.bulletPoint}>•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
