import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { jobPostings } from '../../constants';
import { Building, Calendar, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import * as S from './index.css';

export function JobPostingsTab() {
  return (
    <>
      {jobPostings.map((job) => (
        <JobPostingCard key={job.id} job={job} />
      ))}
    </>
  );
}

interface JobPostingCardProps {
  job: (typeof jobPostings)[0];
}

function JobPostingCard({ job }: JobPostingCardProps) {
  return (
    <Card className={S.cardHover}>
      <CardHeader className={S.cardHeaderItems}>
        <div className={S.jobHeaderFlex}>
          <div className={S.cardTitleWrapper}>
            <CardTitle className={S.cardTitle}>{job.title}</CardTitle>
            <div className={S.jobMetaWrapper}>
              <div className={S.metaItem}>
                <Building className={S.metaIcon} />
                {job.company}
              </div>
              <div className={S.metaItem}>
                <Calendar className={S.metaIcon} />
                {new Date(job.published_at).toLocaleDateString('ko-KR')}
              </div>
            </div>
          </div>
          <Badge>{job.metadata.company_tier}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className={S.jobContent}>
          <div className={S.requirementsSection}>
            <h4 className={S.requirementsTitle}>요구사항</h4>
            <div className={S.requirementsBadges}>
              {job.requirements.map((req, index) => (
                <Badge key={index} variant="outline">
                  {req}
                </Badge>
              ))}
            </div>
          </div>

          <div className={S.bottomActions}>
            <Badge variant="secondary">{job.metadata.salary_range}</Badge>
            <Button variant="outline" size="sm" asChild>
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className={S.externalLinkIcon} />
                공고 보기
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
