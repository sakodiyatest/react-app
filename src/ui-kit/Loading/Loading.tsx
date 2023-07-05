import React from 'react';
import type { LoadingProps } from './Loading.props';
import { IconLoading } from '../IconComponent';

const Loading: React.FC<LoadingProps> = props => {
  const { isFullPage } = props;
  const svgCustomClass = isFullPage ? 'w-20 h-20' : 'w-8 h-8';
  const customRootClass = isFullPage
    ? 'fixed top-0 left-0 right-0 bottom-0 bg-white/[0.5] z-20'
    : '';

  return (
    <div
      role="status"
      className={`flex items-center justify-center ${customRootClass}`}
    >
      <IconLoading
        className={`${svgCustomClass} mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600`}
      />
    </div>
  );
};

export default React.memo(Loading);
