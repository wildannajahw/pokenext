import { dehydrate, type DehydratedState } from '@tanstack/react-query';
import { type GetStaticPropsResult } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { fetchPokemons, type QueryPokemonFilter, useInfQueryPokemons } from '../queries/pokemons';
import getQueryClient from '../utils/react-query';

type Result = GetStaticPropsResult<{ dehydratedState: DehydratedState }>;

const initialState = { name: '', generationId: 0, typeId: 0 };

export async function getStaticProps(): Promise<Result> {
	const queryClient = getQueryClient();
	await queryClient.fetchInfiniteQuery(['pokemons', initialState], fetchPokemons);

	// https://github.com/tannerlinsley/react-query/issues/1458
	const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient))) as DehydratedState;

	return {
		props: {
			dehydratedState,
		},
	};
}

const Home = () => {
	const [filter, setFilter] = useState<QueryPokemonFilter>(initialState);
	const { data, isFetching, isFetchingNextPage, isPreviousData, fetchNextPage } =
		useInfQueryPokemons(filter);
	const pokemons = data!.pages.flat();
	return (
		<div>
			{pokemons.map(pokemon => (
				<Link key={pokemon.id} href={`pokemon/${pokemon.name}`}>
					{pokemon.name}
				</Link>
			))}
			<button onClick={async () => fetchNextPage()}>load more</button>
		</div>
	);
};

export default Home;
