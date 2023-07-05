import React from 'react';
import type { InfoCardProps } from './InfoCardProps';

const InfoCard: React.FC<InfoCardProps> = props => {
  const { info } = props;

  return (
    <div data-testid="info-card">
      <h1 className="text-4xl font-bold">{info}</h1>
    </div>
  );
};

export default React.memo(InfoCard);
