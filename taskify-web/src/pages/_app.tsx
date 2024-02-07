import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthProvider';
import '../styles/global.scss';
import { DashBoardProvider } from '@/contexts/DashBoardProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DashBoardProvider>
        <Component {...pageProps} />
      </DashBoardProvider>
    </AuthProvider>
  );
}
