'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  ExternalLink,
  Code,
  GitPullRequest,
  FileIcon,
  Globe,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  container,
  headerContainer,
  headerContent,
  title,
  summary,
  badgeContainer,
  headerActions,
  mainLayout,
  tocContainer,
  tocItem,
  contentContainer,
  contentText,
  problemsContainer,
  problemsTitle,
  problemsList,
  problemItem,
  problemBullet,
  analysisContainer,
  hypothesisCard,
  hypothesisTitle,
  hypothesisDescription,
  citationContainer,
  citationBadge,
  incompleteSection,
  incompleteText,
  sectionHeader,
  warningIcon,
  citationsGrid,
  citationItem,
  citationContent,
  citationTitle,
  citationUrl,
  citationButton,
  completedIcon,
  pendingIcon,
} from './spec-viewer.css';

interface SpecViewerProps {
  draftId: string;
}

export function SpecViewer({ draftId }: SpecViewerProps) {
  // Mock 데이터
  const spec = {
    title: '사용자 인증 시스템 JWT 보안 강화',
    summary:
      '현재 사용자 인증 시스템의 JWT 구현에서 발견된 보안 취약점을 해결하고, 업계 표준에 맞는 보안 강화 방안을 적용합니다. 토큰 만료 처리, 리프레시 토큰 관리, CSRF 방어 등을 개선합니다.',
    version: 1,
    quality_score: 85,
    sections: [
      { id: 'summary', title: 'TL;DR', completed: true },
      { id: 'context', title: '컨텍스트', completed: true },
      { id: 'current_behavior', title: '현재 동작', completed: true },
      { id: 'root_cause', title: '근본 원인', completed: true },
      { id: 'solutions', title: '해결 방안', completed: false },
      { id: 'learning_points', title: '학습 포인트', completed: true },
    ],
  };

  const citations = [
    { type: 'code', url: 'auth/jwt.ts#L45-67', title: 'JWT 검증 로직' },
    { type: 'pr', url: 'owner/repo#123', title: 'JWT 보안 개선 PR' },
    { type: 'doc', url: 'https://auth0.com/jwt-guide', title: 'JWT 보안 가이드' },
    { type: 'web', url: 'https://owasp.org/jwt-security', title: 'OWASP JWT 보안' },
    { type: 'job', url: 'kakao-auth-engineer', title: '카카오 인증 엔지니어' },
  ];

  const getCitationIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <Code className="h-4 w-4" />;
      case 'pr':
        return <GitPullRequest className="h-4 w-4" />;
      case 'doc':
        return <FileIcon className="h-4 w-4" />;
      case 'web':
        return <Globe className="h-4 w-4" />;
      case 'job':
        return <Briefcase className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className={container}>
      {/* 헤더 */}
      <Card>
        <CardHeader>
          <div className={headerContainer}>
            <div className={headerContent}>
              <CardTitle className={title}>{spec.title}</CardTitle>
              <p className={summary}>{spec.summary}</p>
              <div className={badgeContainer}>
                <Badge variant="outline">v{spec.version}</Badge>
                <Badge variant={spec.quality_score >= 80 ? 'default' : 'secondary'}>
                  품질 점수: {spec.quality_score}%
                </Badge>
              </div>
            </div>
            <div className={headerActions}>
              <Button variant="outline" asChild>
                <a href={`/drafts/${draftId}/review`}>
                  <FileText className="mr-2 h-4 w-4" />
                  리뷰하기
                </a>
              </Button>
              <Button asChild>
                <a href={`/drafts/${draftId}/prompts`}>프롬프트 생성</a>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className={mainLayout}>
        {/* 좌측 목차 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">목차</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className={tocContainer}>
              {spec.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className={tocItem}>
                  <span>{section.title}</span>
                  {section.completed ? (
                    <CheckCircle2 className={`h-4 w-4 ${completedIcon}`} />
                  ) : (
                    <AlertTriangle className={`h-4 w-4 ${pendingIcon}`} />
                  )}
                </a>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* 메인 콘텐츠 */}
        <div className={contentContainer}>
          {/* TL;DR */}
          <Card id="summary">
            <CardHeader>
              <CardTitle>TL;DR</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={contentText}>
                JWT 토큰 기반 인증 시스템의 보안 취약점 해결. 주요 개선사항: (1) 토큰 만료 시간 단축
                (24시간 → 15분), (2) 리프레시 토큰 로테이션 도입, (3) CSRF 방어를 위한 SameSite 쿠키
                적용, (4) 토큰 블랙리스트 Redis 캐시 구현. 예상 개발 기간: 1.5주, 성능 영향 &lt;5ms.
              </p>
            </CardContent>
          </Card>

          {/* 현재 동작 */}
          <Card id="current_behavior">
            <CardHeader>
              <CardTitle>현재 동작</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={analysisContainer}>
                <p className={contentText}>
                  현재 인증 시스템은 JWT 액세스 토큰(24시간 만료)과 별도의 리프레시 토큰 없이
                  운영되고 있습니다.
                </p>

                <div className={problemsContainer}>
                  <h4 className={problemsTitle}>주요 문제점</h4>
                  <ul className={problemsList}>
                    <li className={problemItem}>
                      <span className={problemBullet}>•</span>긴 토큰 만료 시간으로 인한 보안 위험
                    </li>
                    <li className={problemItem}>
                      <span className={problemBullet}>•</span>
                      토큰 무효화 메커니즘 부재
                    </li>
                    <li className={problemItem}>
                      <span className={problemBullet}>•</span>
                      CSRF 공격에 취약한 쿠키 설정
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 근본 원인 */}
          <Card id="root_cause">
            <CardHeader>
              <CardTitle>근본 원인 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={analysisContainer}>
                <div className={hypothesisCard}>
                  <h4 className={hypothesisTitle}>가설 1: 초기 설계 시 보안 고려 부족</h4>
                  <p className={hypothesisDescription}>
                    빠른 프로토타이핑을 위해 단순한 JWT 구현을 선택했으나, 보안 강화 요구사항이
                    후순위로 밀림
                  </p>
                  <div className={citationContainer}>
                    <Badge variant="outline" className={citationBadge}>
                      {getCitationIcon('code')} auth/jwt.ts#L45-67
                    </Badge>
                    <Badge variant="outline" className={citationBadge}>
                      {getCitationIcon('pr')} PR #123 Initial JWT Implementation
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 해결 방안 */}
          <Card id="solutions">
            <CardHeader>
              <CardTitle className={sectionHeader}>
                해결 방안
                <AlertTriangle className={`h-5 w-5 ${warningIcon}`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={incompleteSection}>
                <p className={incompleteText}>
                  이 섹션은 아직 완료되지 않았습니다. 리뷰 단계에서 상세한 해결방안을 작성해주세요.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 인용 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>인용 소스</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={citationsGrid}>
            {citations.map((citation, index) => (
              <div key={index} className={citationItem}>
                {getCitationIcon(citation.type)}
                <div className={citationContent}>
                  <p className={citationTitle}>{citation.title}</p>
                  <p className={citationUrl}>{citation.url}</p>
                </div>
                <Button variant="ghost" size="icon" className={citationButton}>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
