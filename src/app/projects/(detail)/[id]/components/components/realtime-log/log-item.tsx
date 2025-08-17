'use client';

import * as S from './realtime-log.css';

interface LogItemProps {
  time: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const logDotStyles = {
  info: S.logDotBlue,
  success: S.logDotGreen,
  warning: S.logDotYellow,
  error: S.logDotRed,
};

export function LogItem({ time, message, type }: LogItemProps) {
  return (
    <div className={S.logItem}>
      <div className={logDotStyles[type]} />
      <div>
        <span className={S.logTime}>{time}</span>
        <span className={S.logMessage}>{message}</span>
      </div>
    </div>
  );
}
