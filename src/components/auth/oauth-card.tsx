'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, FileText, LucideIcon } from 'lucide-react';

interface OAuthCardProps {
  provider: 'github' | 'notion';
  isConnected: boolean;
  isLoading?: boolean;
  onConnect: () => void;
  isPending?: boolean;
  className?: string;
}

const PROVIDER_CONFIG: Record<'github' | 'notion', {
  icon: LucideIcon;
  label: string;
  color: string;
}> = {
  github: {
    icon: Github,
    label: 'GitHub',
    color: 'text-gray-900 dark:text-gray-100',
  },
  notion: {
    icon: FileText,
    label: 'Notion',
    color: 'text-gray-900 dark:text-gray-100',
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
    <Card className={`flex-1 ${className}`}>
      <CardContent className="flex items-center justify-between p-4 max-md:flex-col max-md:gap-2">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${config.color}`} />
          <span className="text-sm font-medium">{config.label}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant={getStatusVariant()}>
            {getStatusText()}
          </Badge>
          
          {!isConnected && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onConnect}
              disabled={isPending || isLoading}
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              연결
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
