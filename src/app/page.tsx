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
          <Card>
            <CardHeader>
              <Search className={featureIcon} />
              <CardTitle>리서치 기반</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                최근 12개월 권위 소스와 대기업 채용공고를 분석하여 Competency Map 생성
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <GitBranch className={featureIcon} />
              <CardTitle>GitHub 통합</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                focus_files 기반 코드 분석과 PR/커밋 히스토리 자동 수집
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className={featureIcon} />
              <CardTitle>근거 기반 명세</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                모든 해결방안에 인용 포함. 추정 금지, 정량 데이터 우선
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className={featureIcon} />
              <CardTitle>AI 프롬프트 생성</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                codegen, test, review 프롬프트를 구조화하여 자동 생성
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
