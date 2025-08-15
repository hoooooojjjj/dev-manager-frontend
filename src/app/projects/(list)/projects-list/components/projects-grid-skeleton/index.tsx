'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import * as S from './index.css';

export function ProjectsGridSkeleton() {
  return (
    <div className={S.projectGrid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className={S.skeletonCard}>
          <CardHeader>
            <div className={S.skeletonHeader}></div>
            <div className={S.skeletonDescription}></div>
          </CardHeader>
          <CardContent>
            <div className={S.skeletonContent}>
              <div className={S.skeletonLine}></div>
              <div className={S.skeletonLineShort}></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
