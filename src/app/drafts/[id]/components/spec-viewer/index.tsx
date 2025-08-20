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
  BookOpen,
  Target,
  Search,
  Lightbulb,
} from 'lucide-react';
import { MarkdownRenderer } from '../../../../../components/drafts/markdown-renderer';
import * as S from './index.css';

interface SpecViewerProps {
  draftId: string;
}

export function SpecViewer({ draftId }: SpecViewerProps) {
  // Mock 데이터 - AI 개발 명세서 형식
  const spec = {
    title: '내일배움캠프 허브 페이지 트랙 추천 시스템 개선',
    summary:
      '사용자 세그먼트 기반 맞춤형 트랙 큐레이션 시스템을 구현하여 신규 사용자의 트랙 선택 가이드를 제공하고 전환율을 개선합니다. 키워드 매핑과 세그먼트별 콘텐츠 분류를 통해 개인화된 부트캠프 추천 경험을 제공합니다.',
    version: 1,
    quality_score: 92,
    sections: [
      {
        id: 'tldr',
        title: 'TL;DR',
        completed: true,
        icon: Target,
        description: '프로젝트 요약 및 핵심 성과 지표',
      },
      {
        id: 'current_behavior',
        title: '현상 (Current Behavior)',
        completed: true,
        icon: Search,
        description: '사용자가 경험하는 현재 문제 상황',
      },
      {
        id: 'root_cause',
        title: '원인 분석 (Root Cause Analysis)',
        completed: true,
        icon: AlertTriangle,
        description: '기술적 관점에서의 근본 원인 분석',
      },
      {
        id: 'solutions',
        title: '해결 방안 (Proposed Solution)',
        completed: true,
        icon: Code,
        description: '구체적인 구현 방안 및 코드 예시',
      },
      {
        id: 'learning_points',
        title: '학습 포인트 (Learning Takeaways)',
        completed: true,
        icon: Lightbulb,
        description: '개발자 역량 향상 및 커리어 가이드',
      },
    ],
  };

  const citations = [
    {
      type: 'web',
      url: 'https://react.dev/learn/typescript',
      title: 'React TypeScript 공식 가이드',
    },
    {
      type: 'web',
      url: 'https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html',
      title: 'TypeScript 리터럴 타입',
    },
    { type: 'job', url: 'naver-frontend-developer', title: '네이버 프론트엔드 개발자' },
    { type: 'job', url: 'kakao-ux-engineer', title: '카카오 UX 엔지니어' },
    { type: 'job', url: 'line-react-developer', title: '라인 React 개발자' },
  ];

  const getCitationIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <Code />;
      case 'pr':
        return <GitPullRequest />;
      case 'doc':
        return <FileIcon />;
      case 'web':
        return <Globe />;
      case 'job':
        return <Briefcase />;
      default:
        return <FileText />;
    }
  };

  return (
    <div className={S.container}>
      {/* 헤더 */}
      <Card>
        <CardHeader>
          <div className={S.headerContainer}>
            <div className={S.headerContent}>
              <CardTitle className={S.title}>{spec.title}</CardTitle>
              <p className={S.summary}>{spec.summary}</p>
              <div className={S.badgeContainer}>
                <Badge variant="outline">v{spec.version}</Badge>
                <Badge variant={spec.quality_score >= 80 ? 'default' : 'secondary'}>
                  품질 점수: {spec.quality_score}%
                </Badge>
              </div>
            </div>
            <div className={S.headerActions}>
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

      <div className={S.mainLayout}>
        {/* 좌측 목차 */}
        <Card>
          <CardHeader>
            <CardTitle>
              <BookOpen />
              목차
            </CardTitle>
          </CardHeader>
          <CardContent>
            <nav className={S.tocContainer}>
              {spec.sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <a key={section.id} href={`#${section.id}`} className={S.tocItem}>
                    <div className={S.tocItemContent}>
                      <IconComponent className={S.sectionIcon} />
                      <div className={S.tocItemDetails}>
                        <span className={S.tocItemTitle}>{section.title}</span>
                        <span className={S.tocItemDescription}>{section.description}</span>
                      </div>
                    </div>
                    {section.completed ? (
                      <CheckCircle2 className={`${S.statusIcon} ${S.completedIcon}`} />
                    ) : (
                      <AlertTriangle className={`${S.statusIcon} ${S.pendingIcon}`} />
                    )}
                  </a>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* 메인 콘텐츠 */}
        <div className={S.contentContainer}>
          {/* TL;DR */}
          <Card id="tldr">
            <CardHeader>
              <CardTitle className={S.sectionHeader}>
                <Target className={S.sectionIcon} />
                TL;DR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownRenderer
                content="세그먼트 기반 트랙 큐레이션 시스템 구현으로 신규 사용자 전환율 개선. 주요 개선사항: (1) 사용자 세그먼트별 맞춤형 트랙 분류, (2) 키워드 기반 트랙 매핑 시스템, (3) 세그먼트 탭 UI 구현. 예상 개발 기간: 2주, 전환율 목표: 15% 향상."
                showCodeHeader={false}
              />
            </CardContent>
          </Card>

          {/* 현상 */}
          <Card id="current_behavior">
            <CardHeader>
              <CardTitle className={S.sectionHeader}>
                <Search className={S.sectionIcon} />
                현상 (Current Behavior)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownRenderer
                content={`내일배움캠프 허브 페이지에 유입된 신규 사용자들은 마감 임박 프로그램 외에 어떤 트랙을 선택해야 할지, 무엇을 기준으로 판단해야 할지에 대한 명확한 가이드를 받지 못하고 있습니다. 

현재 트랙 카드 구성은 단순히 '마감 임박', '개발 관련', '비개발 관련'으로만 분류되어 있어 사용자 개인의 관심사, 경력 목표, 기술적 관심도에 맞는 맞춤형 정보를 제공하지 못하고 있습니다. 

이로 인해, 트랙에 관심은 있으나 적절한 전환 동기 없이 많은 사용자들이 트랙 상세 페이지(PV)로 전환되지 않고 이탈하고 있는 실정입니다.`}
                showCodeHeader={false}
              />
            </CardContent>
          </Card>

          {/* 원인 분석 */}
          <Card id="root_cause">
            <CardHeader>
              <CardTitle className={S.sectionHeader}>
                <AlertTriangle className={S.sectionIcon} />
                원인 분석 (Root Cause Analysis)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownRenderer
                content={`현재 구현된 컴포넌트(\`src/app/pages/Herb/v2/components/NBBootcampsWithBoosting/template.tsx\`)는 트랙 카드를 단순히 세 가지 카테고리(부스팅/개발/비개발)로만 분류하여 제공하고 있습니다.

## 주요 기술적 원인

1. **트랙 정렬 및 필터링 로직이 사용자 맥락을 고려하지 않음**: logic.ts의 sortRoundsByBoostingStatus 함수는 단순히 부스팅 상태(마감 임박/얼리버드/일반)와 개발/비개발 여부에 따라서만 트랙을 분류

2. **섹션 제목과 가이드 문구가 단순함**: copy.ts의 sectionTitles 객체에 정의된 섹션 제목들이 사용자 목표나 관심사에 맞는 맥락 정보를 제공하지 않음

3. **사용자 세그먼트 기반 추천 부재**: 현재 코드는 사용자의 직업, 관심사, 경력 목표 등 세그먼트 정보를 활용한 맞춤형 트랙 추천 기능이 없음`}
                showCodeHeader={true}
              />
            </CardContent>
          </Card>

          {/* 해결 방안 */}
          <Card id="solutions">
            <CardHeader>
              <CardTitle className={S.sectionHeader}>
                <Code className={S.sectionIcon} />
                해결 방안 (Proposed Solution)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownRenderer
                content={`프로젝트 브리핑의 실험 설계 중 C안(마감 임박 + 세그먼트 기반 트랙 탐색)을 중심으로 키워드 기반 트랙 큐레이션 기능을 구현하여 사용자에게 맞춤형 가이드를 제공하는 방안을 제안합니다.

## 1. 세그먼트 기반 트랙 분류 시스템 구현

새로운 세그먼트 관련 타입과 상수를 logic.ts에 추가합니다:

\`\`\`typescript
// 새로운 세그먼트 타입 정의
export type UserSegment = typeof USER_SEGMENTS[number];
export const USER_SEGMENTS = [
  '신입 취업 준비생',
  '경력 전환 희망자',
  '실무 역량 강화'
] as const;

// 관심 분야 타입 정의
export type InterestArea = typeof INTEREST_AREAS[number];
export const INTEREST_AREAS = [
  '프론트엔드',
  '백엔드',
  'AI/ML',
  '모바일',
  '디자인/마케팅'
] as const;
\`\`\`

## 2. 키워드 기반 세그먼트 매핑 함수 구현

\`\`\`typescript
// 세그먼트-키워드 매핑
const SEGMENT_KEYWORDS = {
  '신입 취업 준비생': ['취업', '신입', '포트폴리오', '코딩테스트', '기초'],
  '경력 전환 희망자': ['전환', '이직', '실무', '프로젝트', '경력'],
  '실무 역량 강화': ['고급', '심화', '실무', '프로젝트', '현업']
};

// 트랙-키워드 매핑 함수
export function mapTrackToKeywords(track: TrackType): string[] {
  const trackKeywords: Record<TrackType, string[]> = {
    [FRONTEND]: ['React', 'JavaScript', 'TypeScript', '웹개발', 'UI/UX'],
    [BACKEND]: ['서버', '클라우드', 'DB', 'API', '아키텍처'],
    [AI]: ['인공지능', '머신러닝', '데이터', '알고리즘', 'Python'],
  };
  
  return trackKeywords[track] || [];
}
\`\`\`

## 3. 세그먼트 기반 트랙 추천 컴포넌트 구현

\`\`\`tsx
import { useState } from 'react';
import { USER_SEGMENTS, UserSegment } from '../logic';

export default function BootCampCardSection({ boostingState, sortedTrackRounds }: Props) {
  const [activeSegment, setActiveSegment] = useState<UserSegment>(USER_SEGMENTS[0]);
  
  const filteredTrackRounds = getFilteredTrackRoundsBySegment(sortedTrackRounds, activeSegment);
  
  return (
    <S.Background>
      <S.SegmentTabs>
        {USER_SEGMENTS.map(segment => (
          <S.SegmentTab 
            key={segment}
            isActive={segment === activeSegment}
            onClick={() => setActiveSegment(segment)}
          >
            {segment}
          </S.SegmentTab>
        ))}
      </S.SegmentTabs>
      
      <CardSection
        sectionType={BOOSTING}
        boostingState={boostingState}
        rounds={filteredTrackRounds[BOOSTING]}
      />
    </S.Background>
  );
}
\`\`\`

## 트레이드오프 및 고려사항

- **성능**: 세그먼트 기반 필터링으로 추가 계산이 필요하나, 메모이제이션으로 최적화 가능
- **유지보수성**: 키워드와 세그먼트 정의를 별도 파일로 분리하여 마케팅 팀이 쉽게 업데이트 가능
- **개발자 경험**: TypeScript 타입 정의로 코드 안정성 확보 및 향후 확장성 고려`}
                showCodeHeader={true}
              />
            </CardContent>
          </Card>

          {/* 학습 포인트 */}
          <Card id="learning_points">
            <CardHeader>
              <CardTitle className={S.sectionHeader}>
                <Lightbulb className={S.sectionIcon} />
                학습 포인트 (Learning Takeaways)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownRenderer
                content={`## 1. 세그먼트 기반 개인화 추천 구현 역량

- **사용자 세그먼트 정의와 콘텐츠 큐레이션 전략 수립**: 사용자 페르소나별 콘텐츠 큐레이션 방법론과 추천 시스템의 기본 원리 학습
- **맞춤형 UI/UX 설계**: 세그먼트별 콘텐츠 탭 구성과 시각적 요소를 통한 사용자 맥락 맞춤 UI/UX 설계 능력 향상

## 2. 리액트와 타입스크립트 고급 패턴 활용

- **React 상태 관리 및 컴포넌트 설계**: 세그먼트 상태를 효율적으로 관리하고 컴포넌트 간 데이터 흐름 설계 역량
- **타입스크립트 리터럴 유니온 타입 자동 생성 패턴**: \`typeof ARRAY[number]\`와 \`as const\` 조합을 활용한 최신 TS 패턴 마스터링
- **타입 안전성과 개발자 경험 동시 개선**: IDE 자동 완성 최대 활용 및 컴파일 타임 오류 포착 방법 학습

## 3. 데이터 기반 개발 사고 방식

- **A/B 테스트 기반 개발**: 프로젝트 브리핑에서 설계된 여러 안을 구현하고 테스트하는 데이터 기반 의사결정 방법
- **성과 측정 및 분석**: 구현한 기능의 전환율, 클릭률 등 성과 지표 측정 및 분석 방법 습득

## 4. 대기업 개발자 채용 시장에서 경쟁력 확보 방안

이 프로젝트를 통해 한국 대기업들이 찾는 핵심 역량인 **'사용자 경험 최적화'**, **'데이터 기반 의사결정'**, **'컴포넌트 기반 UI 설계'** 능력을 증명할 수 있습니다.

- **포트폴리오 강화**: '사용자 중심 문제 해결 능력'과 '비즈니스 임팩트 창출 경험' 강조
- **AI 및 데이터 활용 역량**: 향후 더 정교한 추천 알고리즘 구현으로 AI 역량 확장 가능
- **실무 중심 역량**: 현재 대기업 채용에서 중요시되는 사용자 경험과 비즈니스 가치 창출 능력 강화

이 프로젝트를 통해 최신 프론트엔드 기술과 사용자 중심 개발 방법론을 모두 경험할 수 있으며, 개인화 추천 시스템 설계 및 구현을 통해 현업에서 필요로 하는 역량을 키울 수 있습니다.`}
                showCodeHeader={false}
              />
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
          <div className={S.citationsGrid}>
            {citations.map((citation, index) => (
              <div key={index} className={S.citationItem}>
                {getCitationIcon(citation.type)}
                <div className={S.citationContent}>
                  <p className={S.citationTitle}>{citation.title}</p>
                  <p className={S.citationUrl}>{citation.url}</p>
                </div>
                <Button variant="ghost" size="icon" className={S.citationButton}>
                  <ExternalLink />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
