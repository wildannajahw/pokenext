import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from '../utils/react-query';
import { MyPokemonProvider } from '../contexts/my-pokemon';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MyPokemonProvider>
          <Component {...pageProps} />
        </MyPokemonProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
