'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/components/Card';
import { Button } from '@/components/ui/components/Button';
import { Code, TestTube, MessageSquare, Download, RefreshCw } from 'lucide-react';
import * as S from './index.css';
import { PromptTabs } from './PromptTabs';

export function PromptBundle() {
  return (
    <div className={S.container}>
      <Header />
      <PromptTabs />
      <Guide />
    </div>
  );
}

const Header = () => {
  return (
    <Card>
      <CardHeader style={{ position: 'relative' }}>
        <div className={S.headerContainer}>
          <CardTitle className={S.title}>AI 실행 프롬프트 번들</CardTitle>
        </div>
        <p className={S.description}>개발 명세서를 기반으로 생성된 구조화된 AI 프롬프트입니다.</p>
        <div className={S.headerActions}>
          <Button variant="outline">
            <RefreshCw className={S.buttonIcon} />
            재생성
          </Button>
          <Button>
            <Download className={S.buttonIcon} />
            다운로드
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

const Guide = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>사용 가이드</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={S.promptContent}>
          <div className={S.guideGrid}>
            <div className={S.guideCard}>
              <h4 className={S.guideTitle}>
                <Code className={`${S.iconBlue}`} />
                코드 생성
              </h4>
              <p className={S.guideDescription}>
                Claude, GPT-4 등에서 전체 파일 코드를 생성할 때 사용하세요. 컨텍스트와 제약사항이
                포함되어 있습니다.
              </p>
            </div>

            <div className={S.guideCard}>
              <h4 className={S.guideTitle}>
                <TestTube className={`${S.iconGreen}`} />
                테스트 작성
              </h4>
              <p className={S.guideDescription}>
                보안 테스트와 성능 벤치마크 코드를 생성할 때 사용하세요. 엣지 케이스까지 포함됩니다.
              </p>
            </div>

            <div className={S.guideCard}>
              <h4 className={S.guideTitle}>
                <MessageSquare className={`${S.iconPurple}`} />
                코드 리뷰
              </h4>
              <p className={S.guideDescription}>
                구현된 코드의 보안성과 품질을 검토할 때 사용하세요. 구체적인 개선사항을 제안합니다.
              </p>
            </div>
          </div>

          <div className={S.guideCard}>
            <h4 className={S.guideTitle}>💡 팁</h4>
            <p className={S.guideDescription}>
              변수는 실제 값으로 교체한 후 사용하세요. 프롬프트 엔진의 특성에 맞게 시스템 메시지와
              사용자 메시지를 구분하여 입력하시기 바랍니다.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
