'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch } from 'lucide-react';
import { LogItem } from './log-item';
import * as S from './realtime-log.css';

interface LogEntry {
  time: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface RealtimeLogProps {
  logs?: LogEntry[];
}

export function RealtimeLog({ logs }: RealtimeLogProps) {
  // 기본 로그 데이터 (logs prop이 없을 때 사용)
  const defaultLogs: LogEntry[] = [
    {
      time: '14:30',
      message: 'Brave 검색 시작: "사용자 인증 JWT 보안"',
      type: 'info',
    },
    {
      time: '14:28',
      message: 'GitHub 레포지토리 분석 완료',
      type: 'success',
    },
    {
      time: '14:25',
      message: 'Notion 문서 수집 완료',
      type: 'success',
    },
  ];

  const logEntries = logs || defaultLogs;

  return (
    <Card>
      <CardHeader>
        <CardTitle className={S.actionCardTitle}>
          <GitBranch className="h-5 w-5" />
          실시간 로그
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={S.logContainer}>
          {logEntries.map((log, index) => (
            <LogItem key={index} time={log.time} message={log.message} type={log.type} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
