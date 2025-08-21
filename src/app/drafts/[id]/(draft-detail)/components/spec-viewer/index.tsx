'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle2, AlertTriangle, BookOpen, LucideIcon } from 'lucide-react';
import * as S from './index.css';
import { citations, spec, specSummary, SPEC_SECTIONS } from './constants';
import { getCitationIcon } from './utils';
import MarkdownRenderer from '../markdown-renderer';
import { Flex } from '@/components/ui/flex';

interface SpecViewerProps {
  draftId: string;
}

export function SpecViewer({ draftId }: SpecViewerProps) {
  return (
    <div className={S.container}>
      {/* 헤더 */}
      <Card className={S.headerCard}>
        <CardHeader className={S.headerContainer}>
          <div className={S.headerActions}>
            <Flex align="center">
              <span className={S.headerBadge}>개발 명세서</span>
            </Flex>
            <Flex direction="row" gap={8}>
              <Button variant="outline" asChild>
                <a href={`/drafts/${draftId}/review`}>리뷰하기</a>
              </Button>
              <Button asChild>
                <a href={`/drafts/${draftId}/prompts`}>프롬프트 생성</a>
              </Button>
            </Flex>
          </div>
          <Flex direction="row" gap={12}>
            <CardTitle className={S.title}>{specSummary.title}</CardTitle>
            <div className={S.badgeContainer}>
              <Badge variant="outline">v{specSummary.version}</Badge>
              <Badge variant={specSummary.quality_score >= 80 ? 'default' : 'secondary'}>
                품질 점수: {specSummary.quality_score}%
              </Badge>
            </div>
          </Flex>
          <p className={S.summary}>{specSummary.summary}</p>
        </CardHeader>
      </Card>

      {/* 좌측 목차 */}
      <div className={S.tocSidebar}>
        <Card className={S.tocCard}>
          <CardHeader>
            <CardTitle className={S.tocTitle}>
              <BookOpen />
              목차
            </CardTitle>
          </CardHeader>
          <CardContent>
            <nav className={S.tocContainer}>
              {specSummary.sections.map((section) => {
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
      </div>

      {/* 메인 콘텐츠 */}
      <div className={S.contentContainer}>
        {SPEC_SECTIONS.map((section) => (
          <SpecSection
            key={section.id}
            id={section.id}
            title={section.title}
            icon={section.icon}
            content={spec[section.id as keyof typeof spec]}
            showCodeHeader={section.showCodeHeader}
          />
        ))}
      </div>

      {/* 인용 목록 */}
      <div className={S.contentContainer}>
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
    </div>
  );
}

interface SpecSectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  content: string;
  showCodeHeader?: boolean;
}

export function SpecSection({
  id,
  title,
  icon: Icon,
  content,
  showCodeHeader = false,
}: SpecSectionProps) {
  return (
    <Card id={id} className={S.sectionCard}>
      <CardHeader>
        <CardTitle className={S.sectionHeader}>
          <Icon className={S.sectionIcon} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MarkdownRenderer content={content} showCodeHeader={showCodeHeader} />
      </CardContent>
    </Card>
  );
}
