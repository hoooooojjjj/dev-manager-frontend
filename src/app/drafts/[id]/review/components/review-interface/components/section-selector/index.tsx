'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/components/Card';
import { Badge } from '@/components/ui/components/Badge';
import { CheckCircle2, Clock } from 'lucide-react';
import { Flex } from '@/components/ui/components/Flex';
import { Section } from '../../types';
import * as S from './index.css';

/**
 * 섹션 선택기 컴포넌트 Props
 */
interface SectionSelectorProps {
  /** 리뷰 가능한 섹션 목록 */
  sections: Section[];
  /** 현재 선택된 섹션 */
  selectedSection: Section | null;
  /** 섹션 선택 시 호출되는 콜백 함수 */
  onSectionSelect: (section: Section) => void;
}

/**
 * 리뷰할 섹션을 선택하는 사이드바 컴포넌트
 *
 * 각 섹션의 완료/미완료 상태를 보여주고,
 * 사용자가 리뷰하고자 하는 섹션을 선택할 수 있도록 합니다.
 *
 * @param props - SectionSelectorProps
 */
export function SectionSelector({
  sections,
  selectedSection,
  onSectionSelect,
}: SectionSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>섹션 선택</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={S.sectionsContainer}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionSelect(section)}
              className={
                selectedSection?.id === section.id ? S.sectionButtonSelected : S.sectionButton
              }
            >
              <span className={S.sectionTitle}>{section.title}</span>
              <Badge
                variant={
                  section.status === 'completed'
                    ? 'default'
                    : section.status === 'needs_work'
                      ? 'secondary'
                      : 'outline'
                }
                className={S.badge}
              >
                <Flex justify="center" gap={4}>
                  {section.status === 'completed' && <CheckCircle2 size={14} />}
                  {section.status === 'needs_work' && <Clock size={14} />}
                  {section.status === 'completed' ? '완료' : '미완료'}
                </Flex>
              </Badge>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
