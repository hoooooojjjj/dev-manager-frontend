'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, FileText, LucideIcon } from 'lucide-react';
import {
  cardContainer,
  cardContent,
  cardInfo,
  providerIcon,
  providerName,
  statusBadge,
  statusIcon,
  connectedTextLight
} from './oauth-card.css';

interface OAuthCardProps {
  provider: 'github' | 'notion';
  isConnected: boolean;
  isLoading?: boolean;
  onConnect: () => void;
  isPending?: boolean;
  className?: string;
}

const PROVIDER_CONFIG: Record<
  'github' | 'notion',
  {
    icon: LucideIcon;
    label: string;
    color: string;
  }
> = {
  github: {
    icon: Github,
    label: 'GitHub',
    color: connectedTextLight,
  },
  notion: {
    icon: FileText,
    label: 'Notion',
    color: connectedTextLight,
  },
};

export function OAuthCard({
  provider,
  isConnected,
  isLoading = false,
  onConnect,
  isPending = false,
  className = '',
}: OAuthCardProps) {
  const config = PROVIDER_CONFIG[provider];
  const Icon = config.icon;

  const getStatusText = () => {
    if (isLoading) return '확인 중...';
    return isConnected ? '연결됨' : '연결 필요';
  };

  const getStatusVariant = () => {
    if (isLoading) return 'secondary';
    return isConnected ? 'default' : 'secondary';
  };

  return (
    <Card className={`${cardContainer} ${className}`}>
      <CardContent className={cardContent}>
        <div className={cardInfo}>
          <Icon className={`${providerIcon} ${config.color}`} />
          <span className={providerName}>{config.label}</span>
        </div>

        <div className={statusBadge}>
          <Badge variant={getStatusVariant()}>{getStatusText()}</Badge>

          {!isConnected && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onConnect}
              disabled={isPending || isLoading}
            >
              <ExternalLink className={statusIcon} />
              연결
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
