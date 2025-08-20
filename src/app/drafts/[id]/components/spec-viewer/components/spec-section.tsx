'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarkdownRenderer } from '../../../../../../components/drafts/markdown-renderer';
import { LucideIcon } from 'lucide-react';
import * as S from '../index.css';

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
    <Card id={id}>
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
