import React from 'react';
import usePokemon from '../hooks/use-pokemon';

type PokeAddProps = {
  result: boolean | null;
  pokemon: any;
};

export const PokeAdd = ({ result, pokemon }: PokeAddProps) => {
  const { addPokemon } = usePokemon();

  const savePokemon = () => {
    addPokemon(pokemon, `result ${result}`);
  };

  return <div>{result ? <button onClick={savePokemon}>PokeAdd</button> : null}</div>;
};
