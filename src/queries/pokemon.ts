import { type QueryFunctionContext, useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { apiDocument } from '../constant/pokemon';

type FetchPokemonResponse = {
	pokemon_v2_pokemon: [
		{
			name: string;
		},
	];
};

type QueryPokemonKey = ['pokemon', string];
// Type QueryPokemonData = FetchPokemonResponse['pokemon_v2_pokemon'][0];

const fetchPokemon = async (ctx: QueryFunctionContext<QueryPokemonKey>) => {
	const pokemon = `
  query Pokemon($name: String) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      name
    }
  }`;
	const result = await request<FetchPokemonResponse>(apiDocument, pokemon, {
		name: ctx.queryKey[1],
	});
	return result.pokemon_v2_pokemon.shift()!;
};

export const useQueryPokemon = (name: string) =>
	useQuery({
		queryKey: ['pokemon', name],
		queryFn: fetchPokemon,
	});
