import { dehydrate, DehydratedState } from '@tanstack/react-query';
import { GetStaticPropsResult } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { fetchPokemons, QueryPokemonFilter, useInfQueryPokemons } from '../queries/pokemons';
import getQueryClient from '../utils/react-query';

type Result = GetStaticPropsResult<{ dehydratedState: DehydratedState }>;

const INITIAL_FILTER = { name: '', generationId: 0, typeId: 0 };

export async function getStaticProps(): Promise<Result> {
  const queryClient = getQueryClient();
  await queryClient.fetchInfiniteQuery(['pokemons', INITIAL_FILTER], fetchPokemons);

  // https://github.com/tannerlinsley/react-query/issues/1458
  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  return {
    props: {
      dehydratedState,
    },
  };
}

const Home = () => {
  const [filter, setFilter] = useState<QueryPokemonFilter>(INITIAL_FILTER);
  const { data, isFetching, isFetchingNextPage, isPreviousData, fetchNextPage } =
    useInfQueryPokemons(filter);
  const pokemons = data!.pages.flat();
  return (
    <div>
      {pokemons.map((pokemon) => (
        <Link key={pokemon.id} href={`pokemon/${pokemon.name}`}>
          {pokemon.name}
        </Link>
      ))}
      <button onClick={() => fetchNextPage()}>load more</button>
    </div>
  );
};

export default Home;
