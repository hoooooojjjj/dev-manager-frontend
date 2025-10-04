import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { references } from '../../constants';
import { Calendar, ExternalLink, Star, User } from 'lucide-react';
import { Badge } from '@/components/ui/components/Badge';
import { Button } from '@/components/ui/components/Button';
import * as S from './index.css';
import { Flex } from '@/components/ui/flex';

export function ReferencesTab() {
  return (
    <>
      {references.map((ref) => (
        <ReferenceCard key={ref.id} reference={ref} />
      ))}
    </>
  );
}

interface ReferenceCardProps {
  reference: (typeof references)[0];
}

function ReferenceCard({ reference }: ReferenceCardProps) {
  return (
    <Card className={S.cardHover}>
      <CardHeader className={S.cardHeaderItems}>
        <Flex direction="row" align="center" gap={10}>
          <CardTitle className={S.cardTitle}>{reference.title}</CardTitle>
          <div className={S.rightActions}>
            <Badge variant="outline">{reference.domain}</Badge>
            <div className={S.ratingWrapper}>
              <Star className={S.starIcon} />
              <span className={S.ratingText}>{reference.weight.toFixed(1)}</span>
            </div>
          </div>
        </Flex>
        <div className={S.metaWrapper}>
          <div className={S.metaItem}>
            <User className={S.metaIcon} />
            {reference.author}
          </div>
          <div className={S.metaItem}>
            <Calendar className={S.metaIcon} />
            {new Date(reference.published_at).toLocaleDateString('ko-KR')}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className={S.summary}>{reference.summary}</p>
        <div className={S.bottomActions}>
          <div className={S.badgeGroup}>
            <Badge variant="secondary">권위도: {reference.metadata.authority_score}/10</Badge>
            <Badge variant="secondary">최신성: {reference.metadata.recency_score}/10</Badge>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={reference.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className={S.externalLinkIcon} />
              원문 보기
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
