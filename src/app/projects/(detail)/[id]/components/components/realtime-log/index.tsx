'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/components/Card';
import { GitBranch } from 'lucide-react';
import { LogItem } from './components';
import * as S from './index.css';

interface LogEntry {
  time: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface RealtimeLogProps {
  logs?: LogEntry[];
}

export function RealtimeLog({ logs }: RealtimeLogProps) {
  if (!logs) return null;

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
          {logs.map((log, index) => (
            <LogItem key={index} time={log.time} message={log.message} type={log.type} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
