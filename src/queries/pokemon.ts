import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import request from 'graphql-request';

const API_DOCUMENT = 'https://beta.pokeapi.co/graphql/v1beta';

type fetchPokemonResponse = {
  pokemon_v2_pokemon: {
    name: string;
  };
};

type QueryPokemonKey = ['pokemon', string];
type QueryPokemonData = fetchPokemonResponse['pokemon_v2_pokemon'];

const fetchPokemon = async (ctx: QueryFunctionContext<QueryPokemonKey>) => {
  const POKEMON = `
  query Pokemon($name: String) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      name
    }
  }`;
  const result = await request(API_DOCUMENT, POKEMON, { name: ctx.queryKey[1] });
  return result.pokemon_v2_pokemon.shift();
};

export const useQueryPokemon = (name: string) =>
  useQuery({
    queryKey: ['pokemon', name],
    queryFn: fetchPokemon,
  });
