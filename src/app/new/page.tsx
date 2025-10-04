import { IntakeForm } from '@/app/new/components/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/components/Card';
import * as S from './page.css';

export default function NewProjectPage() {
  return (
    <div className={S.container}>
      <div className={S.formContainer}>
        <div className={S.headerSection}>
          <h1 className={S.title}>새 프로젝트 생성</h1>
          <p className={S.description}>
            Notion PRD와 GitHub 리포지토리 정보를 입력하여 개발 명세서 생성을 시작하세요
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>프로젝트 정보</CardTitle>
            <CardDescription>
              모든 필드는 필수입니다. OAuth 연결 상태를 확인해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IntakeForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
