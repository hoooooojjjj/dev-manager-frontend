'use client';

import React from 'react';
import * as styles from './research-panel.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Calendar, User, Building, CheckCircle2, Star } from 'lucide-react';

interface ResearchPanelProps {
  projectId: string;
}

export function ResearchPanel({}: ResearchPanelProps) {
  // Mock 데이터
  const researchSummary = {
    totalSources: 12,
    authoritativeSources: 7,
    jobPostings: 5,
    coverageScore: 85,
  };

  const references = [
    {
      id: '1',
      title: 'JWT Security Best Practices 2024',
      url: 'https://auth0.com/blog/jwt-security-best-practices',
      domain: 'auth0.com',
      author: 'Auth0 Team',
      published_at: '2024-01-10',
      summary: 'JWT 토큰의 보안 취약점과 최신 보안 가이드라인을 다룹니다.',
      weight: 0.9,
      metadata: { authority_score: 9, recency_score: 8 },
    },
    {
      id: '2',
      title: 'OAuth 2.1 Security Guidelines',
      url: 'https://datatracker.ietf.org/doc/draft-ietf-oauth-security-topics/',
      domain: 'ietf.org',
      author: 'IETF OAuth Working Group',
      published_at: '2023-12-15',
      summary: 'OAuth 2.1 스펙의 보안 권장사항과 구현 가이드입니다.',
      weight: 0.95,
      metadata: { authority_score: 10, recency_score: 7 },
    },
  ];

  const jobPostings = [
    {
      id: '1',
      title: 'Senior Frontend Engineer - Authentication',
      company: '카카오',
      url: 'https://careers.kakao.com/jobs',
      published_at: '2024-01-08',
      requirements: ['JWT 토큰 기반 인증 구현', 'OAuth 2.0/OIDC 경험', '보안 취약점 분석'],
      metadata: { company_tier: '대기업', salary_range: '7000-9000만원' },
    },
    {
      id: '2',
      title: '프론트엔드 개발자 - 보안 플랫폼',
      company: '네이버',
      url: 'https://careers.naver.com/jobs',
      published_at: '2024-01-05',
      requirements: ['인증/인가 시스템 개발', '보안 라이브러리 구축', '취약점 스캐닝'],
      metadata: { company_tier: '대기업', salary_range: '6500-8500만원' },
    },
  ];

  const competencyMap = [
    {
      competency: 'JWT 보안 구현',
      evidence: ['web://auth0.com/blog/jwt-security', 'job://카카오-auth-engineer'],
      applies_to: ['토큰 검증 로직', '리프레시 토큰 관리'],
      learning_points: ['HS256 vs RS256 선택 기준', '토큰 만료 처리 패턴'],
    },
    {
      competency: 'OAuth 2.1 구현',
      evidence: ['web://ietf.org/oauth-security', 'job://네이버-security-platform'],
      applies_to: ['PKCE 플로우', '상태 검증'],
      learning_points: ['PKCE 필수 적용', 'state 파라미터 검증'],
    },
  ];

  return (
    <div className={styles.container}>
      {/* 리서치 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className={styles.cardTitleFlex}>
            <span>리서치 커버리지</span>
            <Badge variant={researchSummary.coverageScore >= 80 ? 'default' : 'secondary'}>
              {researchSummary.coverageScore}% 달성
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.statsGrid}>
            <div className={styles.statCenter}>
              <div className={styles.statValue}>{researchSummary.totalSources}</div>
              <div className={styles.statLabel}>총 소스</div>
            </div>
            <div className={styles.statCenter}>
              <div className={styles.statIconWrapper}>
                <span className={styles.statValueGreen}>
                  {researchSummary.authoritativeSources}
                </span>
                {researchSummary.authoritativeSources >= 5 && (
                  <CheckCircle2 className={styles.checkIcon} />
                )}
              </div>
              <div className={styles.statLabel}>권위 소스 (≥5)</div>
            </div>
            <div className={styles.statCenter}>
              <div className={styles.statIconWrapper}>
                <span className={styles.statValueBlue}>
                  {researchSummary.jobPostings}
                </span>
                {researchSummary.jobPostings >= 3 && (
                  <CheckCircle2 className={styles.checkIcon} />
                )}
              </div>
              <div className={styles.statLabel}>채용공고 (≥3)</div>
            </div>
            <div className={styles.statCenter}>
              <div className={styles.statValuePurple}>{competencyMap.length}</div>
              <div className={styles.statLabel}>역량 매핑</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 탭 패널 */}
      <Tabs defaultValue="references" className={styles.tabsWrapper}>
        <TabsList className={styles.tabsGrid}>
          <TabsTrigger value="references">References</TabsTrigger>
          <TabsTrigger value="job-postings">Job Postings</TabsTrigger>
          <TabsTrigger value="competency-map">Competency Map</TabsTrigger>
        </TabsList>

        <TabsContent value="references" className={styles.tabContent}>
          {references.map((ref) => (
            <Card key={ref.id} className={styles.cardHover}>
              <CardHeader className={styles.cardHeaderItems}>
                <div className={styles.cardHeaderFlex}>
                  <div className={styles.cardTitleWrapper}>
                    <CardTitle className={styles.cardTitle}>{ref.title}</CardTitle>
                    <div className={styles.metaWrapper}>
                      <div className={styles.metaItem}>
                        <User className={styles.metaIcon} />
                        {ref.author}
                      </div>
                      <div className={styles.metaItem}>
                        <Calendar className={styles.metaIcon} />
                        {new Date(ref.published_at).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </div>
                  <div className={styles.rightActions}>
                    <Badge variant="outline">{ref.domain}</Badge>
                    <div className={styles.ratingWrapper}>
                      <Star className={styles.starIcon} />
                      <span className={styles.ratingText}>{ref.weight.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className={styles.summary}>{ref.summary}</p>
                <div className={styles.bottomActions}>
                  <div className={styles.badgeGroup}>
                    <Badge variant="secondary">권위도: {ref.metadata.authority_score}/10</Badge>
                    <Badge variant="secondary">최신성: {ref.metadata.recency_score}/10</Badge>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className={styles.externalLinkIcon} />
                      원문 보기
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="job-postings" className={styles.tabContent}>
          {jobPostings.map((job) => (
            <Card key={job.id} className={styles.cardHover}>
              <CardHeader className={styles.cardHeaderItems}>
                <div className={styles.jobHeaderFlex}>
                  <div className={styles.cardTitleWrapper}>
                    <CardTitle className={styles.cardTitle}>{job.title}</CardTitle>
                    <div className={styles.jobMetaWrapper}>
                      <div className={styles.metaItem}>
                        <Building className={styles.metaIcon} />
                        {job.company}
                      </div>
                      <div className={styles.metaItem}>
                        <Calendar className={styles.metaIcon} />
                        {new Date(job.published_at).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </div>
                  <Badge>{job.metadata.company_tier}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className={styles.jobContent}>
                  <div className={styles.requirementsSection}>
                    <h4 className={styles.requirementsTitle}>요구사항</h4>
                    <div className={styles.requirementsBadges}>
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className={styles.bottomActions}>
                    <Badge variant="secondary">{job.metadata.salary_range}</Badge>
                    <Button variant="outline" size="sm" asChild>
                      <a href={job.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className={styles.externalLinkIcon} />
                        공고 보기
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="competency-map" className={styles.tabContent}>
          {competencyMap.map((comp, index) => (
            <Card key={index} className={styles.cardHover}>
              <CardHeader className={styles.cardHeaderItems}>
                <CardTitle className={styles.cardTitle}>{comp.competency}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.compContent}>
                  <div className={styles.compSection}>
                    <h4 className={styles.compSectionTitle}>근거 소스</h4>
                    <div className={styles.compBadges}>
                      {comp.evidence.map((evidence, idx) => (
                        <Badge key={idx} variant="outline">
                          {evidence.startsWith('web://') ? '📄' : '💼'}
                          {'  '}
                          {evidence.replace('web://', '').replace('job://', '')}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className={styles.compSection}>
                    <h4 className={styles.compSectionTitle}>적용 영역</h4>
                    <div className={styles.compBadges}>
                      {comp.applies_to.map((area, idx) => (
                        <Badge key={idx} variant="secondary">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className={styles.compSection}>
                    <h4 className={styles.compSectionTitle}>학습 포인트</h4>
                    <ul className={styles.learningPointsList}>
                      {comp.learning_points.map((point, idx) => (
                        <li
                          key={idx}
                          className={styles.learningPoint}
                        >
                          <span className={styles.bulletPoint}>•</span>
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
