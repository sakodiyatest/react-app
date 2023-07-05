import React from 'react';
import { render, screen } from '@testing-library/react';

import InfoCard from './InfoCard';

describe('InfoCard', () => {
  const InfoCardData = {
    info: 'demo',
  };

  beforeEach(() => {
    render(<InfoCard info={InfoCardData.info} />);
  });

  it('Render InfoCard Component', () => {
    expect(screen.getByTestId('info-card')).toBeInTheDocument();
  });

  it('Display info in InfoCard Component', () => {
    expect(screen.getByText(InfoCardData.info)).toBeInTheDocument();
  });
});
