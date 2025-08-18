'use client';

import { ActionCard } from './components/action-card/index';
import * as S from './index.css';
import { getActionCardsData } from './constants';

interface ActionCardsProps {
  projectId: string;
  projectStatus: string;
}

export function ActionCards({ projectId, projectStatus }: ActionCardsProps) {
  return (
    <div className={S.actionGrid}>
      {getActionCardsData(projectId, projectStatus).map((card, index) => (
        <ActionCard
          key={index}
          title={card.title}
          description={card.description}
          icon={card.icon}
          iconColorClass={card.iconColorClass}
          buttonText={card.buttonText}
          buttonIcon={card.buttonIcon}
          href={card.href}
          disabled={card.disabled}
        />
      ))}
    </div>
  );
}
