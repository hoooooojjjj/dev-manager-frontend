'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import * as S from './index.css';

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColorClass: 'purple' | 'blue' | 'green';
  buttonText: string;
  buttonIcon: LucideIcon;
  href?: string | undefined;
  disabled?: boolean;
  onClick?: () => void;
}

const iconColors = {
  purple: S.iconPurple,
  blue: S.iconBlue,
  green: S.iconGreen,
};

export function ActionCard({
  title,
  description,
  icon: Icon,
  iconColorClass,
  buttonText,
  buttonIcon: ButtonIcon,
  href,
  disabled = false,
  onClick,
}: ActionCardProps) {
  const buttonContent = (
    <Button variant="outline" className={S.actionButton} disabled={disabled} onClick={onClick}>
      <ButtonIcon className={S.buttonIcon} />
      {buttonText}
    </Button>
  );

  return (
    <Card className={S.actionCard}>
      <CardHeader className={S.actionCardHeader}>
        <div className={S.actionCardTitle}>
          <Icon className={`h-5 w-5 ${iconColors[iconColorClass]}`} />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className={S.actionCardDescription}>{description}</p>
        {href ? (
          <Button variant="outline" className={S.actionButton} asChild disabled={disabled}>
            <a href={href}>
              <ButtonIcon className={S.buttonIcon} />
              {buttonText}
            </a>
          </Button>
        ) : (
          buttonContent
        )}
      </CardContent>
    </Card>
  );
}
