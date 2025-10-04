import { Card, CardContent } from '@/components/ui/components/Card';
import { Badge } from '@/components/ui/components/Badge';
import { ExternalLink, Github, FileText, LucideIcon } from 'lucide-react';
import * as S from './index.css';
import { Button } from '@/components/ui/components/Button';

interface OAuthCardProps {
  provider: 'github' | 'notion';
  isConnected: boolean;
  isLoading?: boolean;
  onConnect: () => void;
  isPending?: boolean;
}

const PROVIDER_CONFIG: Record<
  'github' | 'notion',
  {
    icon: LucideIcon;
    label: string;
  }
> = {
  github: {
    icon: Github,
    label: 'GitHub',
  },
  notion: {
    icon: FileText,
    label: 'Notion',
  },
};

export default function OAuthCard({
  provider,
  isConnected,
  isLoading = false,
  onConnect,
  isPending = false,
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
    <Card className={S.cardContainer}>
      <CardContent className={S.cardContent}>
        <div className={S.cardInfo}>
          <Icon className={S.providerIcon} />
          <span className={S.providerName}>{config.label}</span>
        </div>

        <div className={S.statusBadge}>
          <Badge variant={getStatusVariant()}>{getStatusText()}</Badge>

          {!isConnected && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onConnect}
              disabled={isPending || isLoading}
            >
              <ExternalLink className={S.statusIcon} />
              연결
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
