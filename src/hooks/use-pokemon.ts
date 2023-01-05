import { useContext } from 'react';
import { PokemonContext } from '../contexts/pokemon-context';

const usePokemon = () => useContext(PokemonContext);

export default usePokemon;
