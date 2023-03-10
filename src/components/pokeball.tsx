/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import { PokeAdd } from './poke-add';

type PokeBallProps = {
	pokemon: any;
};

export const Pokeball = ({ pokemon }: PokeBallProps) => {
	const [result, setResult] = useState<boolean | undefined>(undefined);

	const handleGatcha = () => {
		setResult(Math.random() < 0.5);
	};

	return (
		<div>
			<PokeAdd result={result} pokemon={pokemon}></PokeAdd>
			<button onClick={handleGatcha}>PokeBall</button>
		</div>
	);
};
