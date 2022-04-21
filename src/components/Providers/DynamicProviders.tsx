import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import LoadingScreen from 'components/LoadingScreen';

const DynamicProviders = dynamic<{ children: ReactNode }>(() => import('./Providers'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default DynamicProviders;
