import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, GitBranch, Search, Zap } from 'lucide-react';
import { gugi } from '@/lib/utils/font';
import {
  container,
  heroSection,
  heroContent,
  heroTitle,
  heroDescription,
  ctaButtonGroup,
  featuresGrid,
  featureIcon,
} from './page.css';

export default function HomePage() {
  return (
    <div className={container}>
      <div className={heroSection}>
        <div className={heroContent}>
          <h1 className={`${heroTitle} ${gugi.className}`}>DEV MANAGER</h1>

          <p className={heroDescription}>
            PRD에서 개발 명세서, AI 실행 프롬프트까지 자동 생성하는 개발 착수 전 단계 관리 서비스
          </p>
        </div>

        <div className={ctaButtonGroup}>
          <Button asChild size="lg">
            <Link href="/new">새 프로젝트 시작</Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="/projects">프로젝트 목록</Link>
          </Button>
        </div>

        <div className={featuresGrid}>
          <FeatureCard
            icon={<Search className={featureIcon} />}
            title="리서치 기반"
            description="최근 12개월 권위 소스와 대기업 채용공고를 분석하여 Competency Map 생성"
          />
          <FeatureCard
            icon={<GitBranch className={featureIcon} />}
            title="GitHub 통합"
            description="focus_files 기반 코드 분석과 PR/커밋 히스토리 자동 수집"
          />
          <FeatureCard
            icon={<FileText className={featureIcon} />}
            title="근거 기반 명세"
            description="모든 해결방안에 인용 포함. 추정 금지, 정량 데이터 우선"
          />
          <FeatureCard
            icon={<Zap className={featureIcon} />}
            title="AI 프롬프트 생성"
            description="codegen, test, review 프롬프트를 구조화하여 자동 생성"
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card>
      <CardHeader>
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};
