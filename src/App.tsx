import React, { useEffect } from 'react';
import AppRoutes from './routes';

import { getAppConfigFetch } from './redux/slices/appConfigSlice';
import { useAppDispatch, useAppSelector } from './utils/redux';

import Loading from './ui-kit/Loading/Loading';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const appConfigState = useAppSelector(state => state.appConfig);

  useEffect(() => {
    if (!appConfigState.appConfig?.id) {
      dispatch(getAppConfigFetch());
    }
  }, [appConfigState.appConfig?.id, dispatch]);

  if (appConfigState.isLoading) {
    return <Loading isFullPage />;
  }

  if (appConfigState.error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-600 text-2xl font-bold">
          {appConfigState.error}
        </h1>
      </div>
    );
  }

  return (
    <div className="app">
      <AppRoutes />
    </div>
  );
};

export default App;
