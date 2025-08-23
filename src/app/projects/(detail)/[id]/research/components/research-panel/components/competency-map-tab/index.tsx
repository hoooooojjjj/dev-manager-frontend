import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { competencyMap } from '../../constants';
import { Badge } from '@/components/ui/badge';
import * as S from './index.css';

export function CompetencyMapTab() {
  return (
    <>
      {competencyMap.map((comp, index) => (
        <CompetencyCard key={index} competency={comp} />
      ))}
    </>
  );
}

interface CompetencyCardProps {
  competency: (typeof competencyMap)[0];
}

function CompetencyCard({ competency }: CompetencyCardProps) {
  return (
    <Card className={S.cardHover}>
      <CardHeader className={S.cardHeaderItems}>
        <CardTitle className={S.cardTitle}>{competency.competency}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={S.compContent}>
          <div className={S.compSection}>
            <h4 className={S.compSectionTitle}>근거 소스</h4>
            <div className={S.compBadges}>
              {competency.evidence.map((evidence, idx) => (
                <Badge key={idx} variant="outline">
                  {evidence.startsWith('web://') ? '📄' : '💼'}
                  {'  '}
                  {evidence.replace('web://', '').replace('job://', '')}
                </Badge>
              ))}
            </div>
          </div>

          <div className={S.compSection}>
            <h4 className={S.compSectionTitle}>적용 영역</h4>
            <div className={S.compBadges}>
              {competency.applies_to.map((area, idx) => (
                <Badge key={idx} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          <div className={S.compSection}>
            <h4 className={S.compSectionTitle}>학습 포인트</h4>
            <ul className={S.learningPointsList}>
              {competency.learning_points.map((point, idx) => (
                <li key={idx} className={S.learningPoint}>
                  <span className={S.bulletPoint}>•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
