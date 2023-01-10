import React from 'react';
import usePokemon from '../hooks/use-pokemon';

type PokeAddProps = {
	result: boolean | undefined;
	pokemon: any;
};

export const PokeAdd = ({ result, pokemon }: PokeAddProps) => {
	const { addPokemon } = usePokemon();

	const savePokemon = () => {
		// AddPokemon(pokemon, `result ${result}`);
		// console.log('asd');
	};

	return <div>{result ? <button onClick={savePokemon}>PokeAdd</button> : null}</div>;
};
