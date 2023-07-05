import React from 'react';
import { Link } from 'react-router-dom';
import type { NotFoundProps } from './NotFound.props';
import { ERRORS } from '../../utils/messages';

const NotFound: React.FC<NotFoundProps> = props => {
  return (
    <div data-testid="not-found">
      {ERRORS.PAGE_NOT_FOUND}
      <div>
        <Link className="text-blue-600 underline" to="/">
          Go to main page
        </Link>
      </div>
    </div>
  );
};

export default React.memo(NotFound);
