import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Code, TestTube, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/components/Card';
import { Button } from '@/components/ui/components/Button';
import * as S from './index.css';
import { prompts } from './constants';
import { useToast } from '@/lib/store/useUi';
import { useState } from 'react';
import { Flex } from '@/components/ui/flex';

export function PromptTabs() {
  const { success } = useToast();
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const copyToClipboard = async (text: string, promptType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(promptType);
      success('프롬프트가 클립보드에 복사되었습니다!');

      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getPromptIcon = (type: string) => {
    switch (type) {
      case 'codegen':
        return <Code className="" />;
      case 'test':
        return <TestTube className="" />;
      case 'review':
        return <MessageSquare className="" />;
      default:
        return <Code className="" />;
    }
  };

  const getPromptTitle = (type: string) => {
    switch (type) {
      case 'codegen':
        return '코드 생성';
      case 'test':
        return '테스트 작성';
      case 'review':
        return '코드 리뷰';
      default:
        return type;
    }
  };
  return (
    <Tabs defaultValue="codegen" className="w-full">
      <TabsList className={S.tabsList}>
        <TabsTrigger value="codegen" color="blue" className={S.tabTrigger}>
          <Code className="" />
          코드 생성
        </TabsTrigger>
        <TabsTrigger value="test" color="green" className={S.tabTrigger}>
          <TestTube className="" />
          테스트 작성
        </TabsTrigger>
        <TabsTrigger value="review" color="purple" className={S.tabTrigger}>
          <MessageSquare className="" />
          코드 리뷰
        </TabsTrigger>
      </TabsList>

      {Object.entries(prompts).map(([type, prompt]) => (
        <TabsContent key={type} value={type} className="space-y-4">
          <Card style={{ position: 'relative' }}>
            <CardHeader>
              <Flex justify="between" align="center" style={{ width: '100%' }}>
                <CardTitle className={S.promptCardTitle}>
                  {getPromptIcon(type)}
                  {getPromptTitle(type)} 프롬프트
                </CardTitle>
                <Button
                  onClick={() => copyToClipboard(prompt, type)}
                  variant="outline"
                  className={S.copyButton}
                >
                  {copiedPrompt === type ? (
                    <>
                      <Check className="" />
                      복사됨
                    </>
                  ) : (
                    <>
                      <Copy className="" />
                      복사
                    </>
                  )}
                </Button>
              </Flex>
            </CardHeader>
            <CardContent>
              <div className={S.promptContent}>
                <pre className={S.promptText}>{prompt}</pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
