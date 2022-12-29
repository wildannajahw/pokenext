import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import request from 'graphql-request';

const API_DOCUMENT = 'https://beta.pokeapi.co/graphql/v1beta';

export const LIMIT = 18;

export type QueryPokemonFilter = {
  name: string;
  generationId?: number;
  typeId?: number;
};

type FetchPokemonsResponse = {
  pokemon_v2_pokemonspecies: {
    id: number;
    name: string;
    pokemon_v2_pokemons: {
      pokemon_v2_pokemontypes: {
        pokemon_v2_type: {
          name: string;
        };
      }[];
    }[];
  }[];
};

export type QueryPokemonsKey = ['pokemons', QueryPokemonFilter];
export type QueryPokemonsData = FetchPokemonsResponse['pokemon_v2_pokemonspecies'];

export const fetchPokemons = async (ctx: QueryFunctionContext<QueryPokemonsKey>) => {
  const { name, generationId, typeId } = ctx.queryKey[1];

  const POKEMONS = `
    query Pokemons {
      pokemon_v2_pokemonspecies(
        order_by: { id: asc }
        offset: ${ctx.pageParam || 0}
        where: {
          name: { _ilike: "%${name}%" }
          ${generationId ? `generation_id: { _eq: ${generationId} }` : ''}
          ${
            typeId
              ? `pokemon_v2_pokemons: { pokemon_v2_pokemontypes: { type_id: { _eq: ${typeId} } } }`
              : ''
          }
        }
        limit: ${LIMIT}
      ) {
        id
        name
        pokemon_v2_pokemons {
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
            }
          }
        }
      }
    }
  `;
  const result = await request(API_DOCUMENT, POKEMONS);
  return result.pokemon_v2_pokemonspecies;
};

export const useInfQueryPokemons = (filter: QueryPokemonFilter) =>
  useInfiniteQuery<QueryPokemonsData, unknown, QueryPokemonsData, QueryPokemonsKey>({
    queryKey: ['pokemons', filter],
    queryFn: fetchPokemons,
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < LIMIT ? undefined : allPages.length * LIMIT,
  });
