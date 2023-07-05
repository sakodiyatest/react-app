import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from './NotFound';
import { MemoryRouter } from 'react-router-dom';
import { ERRORS } from '../../utils/messages';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe('NotFound', () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <NotFound />
      </Wrapper>,
    );
  });

  it('Render NotFound Component', () => {
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('Display info in NotFound Component', () => {
    expect(screen.getByText(ERRORS.PAGE_NOT_FOUND)).toBeInTheDocument();
  });
});
