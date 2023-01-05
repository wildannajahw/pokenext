import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import usePokemon from '../../hooks/use-pokemon';
import { useQueryPokemon } from '../../queries/pokemon';

type Context = GetStaticPropsContext<{ slug: [string] | [string, string] }>;
type Result = GetStaticPropsResult<{
  pokemonSpecies: string;
  pokemonName: string;
}>;

export async function getStaticProps({ params }: Context): Promise<Result> {
  const { slug } = params!;
  if (slug.length > 2) {
    return {
      notFound: true,
    };
  }

  const [pokemonSpecies, pokemonNameSlug] = slug;
  try {
    const pokemonName = pokemonNameSlug || '';
    return {
      props: {
        pokemonSpecies,
        pokemonName,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: ['bulbasaur', 'charmander', 'squirtle', 'pikachu'].map((pokemonName) => ({
      params: { slug: [pokemonName] },
    })),
    fallback: 'blocking',
  };
}

type Props = {
  pokemonSpecies: string;
  pokemonName: string;
};

const PokemonDetail = ({ pokemonSpecies, pokemonName }: Props) => {
  const pokemon = useQueryPokemon(pokemonSpecies).data!;
  const { myPokemon, setMyPokemon } = usePokemon();
  const onAdd = () => {
    myPokemon ? setMyPokemon([...myPokemon, pokemon]) : setMyPokemon([pokemon]);
  };
  return (
    <div>
      {pokemon && <div>{pokemon.name}</div>}
      <button onClick={onAdd}>add</button>
    </div>
  );
};

export default PokemonDetail;
