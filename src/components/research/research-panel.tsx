'use client';

import React from 'react';
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
    <div className="space-y-6">
      {/* 리서치 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <span>리서치 커버리지</span>
            <Badge variant={researchSummary.coverageScore >= 80 ? 'default' : 'secondary'}>
              {researchSummary.coverageScore}% 달성
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{researchSummary.totalSources}</div>
              <div className="text-sm text-muted-foreground">총 소스</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl font-bold text-green-600">
                  {researchSummary.authoritativeSources}
                </span>
                {researchSummary.authoritativeSources >= 5 && (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                )}
              </div>
              <div className="text-sm text-muted-foreground">권위 소스 (≥5)</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl font-bold text-blue-600">
                  {researchSummary.jobPostings}
                </span>
                {researchSummary.jobPostings >= 3 && (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                )}
              </div>
              <div className="text-sm text-muted-foreground">채용공고 (≥3)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{competencyMap.length}</div>
              <div className="text-sm text-muted-foreground">역량 매핑</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 탭 패널 */}
      <Tabs defaultValue="references" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="references">References</TabsTrigger>
          <TabsTrigger value="job-postings">Job Postings</TabsTrigger>
          <TabsTrigger value="competency-map">Competency Map</TabsTrigger>
        </TabsList>

        <TabsContent value="references" className="space-y-4">
          {references.map((ref) => (
            <Card key={ref.id} className="transition-shadow hover:shadow-md">
              <CardHeader className="items-start pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{ref.title}</CardTitle>
                    <div className="mt-2 flex w-full items-center gap-4 text-sm text-muted-foreground max-md:flex-col max-md:items-start max-md:gap-2">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {ref.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(ref.published_at).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{ref.domain}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{ref.weight.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{ref.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="secondary">권위도: {ref.metadata.authority_score}/10</Badge>
                    <Badge variant="secondary">최신성: {ref.metadata.recency_score}/10</Badge>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      원문 보기
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="job-postings" className="space-y-4">
          {jobPostings.map((job) => (
            <Card key={job.id} className="transition-shadow hover:shadow-md">
              <CardHeader className="items-start pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(job.published_at).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                  </div>
                  <Badge>{job.metadata.company_tier}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">요구사항</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{job.metadata.salary_range}</Badge>
                    <Button variant="outline" size="sm" asChild>
                      <a href={job.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        공고 보기
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="competency-map" className="space-y-4">
          {competencyMap.map((comp, index) => (
            <Card key={index} className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{comp.competency}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">근거 소스</h4>
                    <div className="flex flex-wrap gap-2">
                      {comp.evidence.map((evidence, idx) => (
                        <Badge key={idx} variant="outline">
                          {evidence.startsWith('web://') ? '📄' : '💼'}
                          {'  '}
                          {evidence.replace('web://', '').replace('job://', '')}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium">적용 영역</h4>
                    <div className="flex flex-wrap gap-2">
                      {comp.applies_to.map((area, idx) => (
                        <Badge key={idx} variant="secondary">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium">학습 포인트</h4>
                    <ul className="space-y-1">
                      {comp.learning_points.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-primary">•</span>
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
