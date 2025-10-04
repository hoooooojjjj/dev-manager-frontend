'use client';

import { Button } from '@/components/ui/components/Button';
import { Label } from '@/components/ui/label';
import { RefreshCw } from 'lucide-react';
import { useOAuthStatus, useOAuthConnect } from '@/lib/hooks/useOAuth';
import * as S from './index.css';
import OAuthCard from './components';

export function OAuthStatus() {
  // OAuth 상태 조회
  const { data: oauthStatus, isLoading: isOAuthLoading, refetch: refetchOAuth } = useOAuthStatus();
  const connectOAuth = useOAuthConnect();

  const handleConnectOAuth = (provider: 'github' | 'notion') => {
    connectOAuth.mutate(provider);
  };

  return (
    <div className={S.headerSection}>
      <div className={S.headerActions}>
        <Label>연결 상태</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => refetchOAuth()}
          disabled={isOAuthLoading}
        >
          <RefreshCw className={isOAuthLoading ? S.loadingSpinner : S.buttonIcon} />
          새로고침
        </Button>
      </div>

      <div className={S.oauthSection}>
        <OAuthCard
          provider="github"
          isConnected={oauthStatus?.github || false}
          isLoading={isOAuthLoading}
          onConnect={() => handleConnectOAuth('github')}
          isPending={connectOAuth.isPending}
        />

        <OAuthCard
          provider="notion"
          isConnected={oauthStatus?.notion || false}
          isLoading={isOAuthLoading}
          onConnect={() => handleConnectOAuth('notion')}
          isPending={connectOAuth.isPending}
        />
      </div>
    </div>
  );
}
