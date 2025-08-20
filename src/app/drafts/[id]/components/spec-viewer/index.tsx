'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  ExternalLink,
  Code,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Target,
  Search,
  Lightbulb,
} from 'lucide-react';
import { MarkdownRenderer } from '../../../../../components/drafts/markdown-renderer';
import * as S from './index.css';
import { citations, spec, specSummary } from './constants';
import { getCitationIcon } from './utils';

interface SpecViewerProps {
  draftId: string;
}

export function SpecViewer({ draftId }: SpecViewerProps) {
  return (
    <div className={S.container}>
      {/* 헤더 */}
      <Card>
        <CardHeader>
          <div className={S.headerContainer}>
            <div className={S.headerContent}>
              <CardTitle className={S.title}>{specSummary.title}</CardTitle>
              <p className={S.summary}>{specSummary.summary}</p>
              <div className={S.badgeContainer}>
                <Badge variant="outline">v{specSummary.version}</Badge>
                <Badge variant={specSummary.quality_score >= 80 ? 'default' : 'secondary'}>
                  품질 점수: {specSummary.quality_score}%
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
              <MarkdownRenderer content={spec.tldr} showCodeHeader={false} />
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
              <MarkdownRenderer content={spec.current_behavior} showCodeHeader={false} />
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
              <MarkdownRenderer content={spec.root_cause} showCodeHeader={true} />
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
              <MarkdownRenderer content={spec.solutions} showCodeHeader={true} />
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
              <MarkdownRenderer content={spec.learning_points} showCodeHeader={false} />
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
