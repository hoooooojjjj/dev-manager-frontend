'use client';

import { CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';
import { specSummary } from '../../constants';
import { Flex } from '@/components/ui/Flex';
import * as S from './index.css';

export function TableOfContents() {
  return (
    <div className={S.container}>
      <div className={S.header}>
        <BookOpen className={S.headerIcon} />
        <h3 className={S.title}>목차</h3>
      </div>

      <nav className={S.tocNav}>
        {specSummary.sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <a key={section.id} href={`#${section.id}`} className={S.tocItem}>
              <div className={S.tocItemContent}>
                <IconComponent className={S.sectionIcon} />
                <Flex direction="col" gap={2}>
                  <span className={S.tocItemTitle}>{section.title}</span>
                  <span className={S.tocItemDescription}>{section.description}</span>
                </Flex>
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
    </div>
  );
}
