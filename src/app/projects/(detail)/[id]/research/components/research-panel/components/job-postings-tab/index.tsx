import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/components/Card';
import { jobPostings } from '../../constants';
import { Building, Calendar, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/components/Badge';
import { Button } from '@/components/ui/components/Button';
import * as S from './index.css';
import { Flex } from '@/components/ui/components/Flex';

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
        <Flex direction="row" align="center" gap={10}>
          <CardTitle className={S.cardTitle}>{job.title}</CardTitle>
          <Badge>{job.metadata.company_tier}</Badge>
        </Flex>
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
