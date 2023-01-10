/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from '../utils/react-query';
import { PokemonProvider } from '../contexts/pokemon-context';

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = getQueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<PokemonProvider>
					<Component {...pageProps} />
				</PokemonProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}
