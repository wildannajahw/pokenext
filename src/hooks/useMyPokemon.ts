import { useContext } from 'react';
import { MyPokemon } from '../contexts/my-pokemon';

const useMyPokemon = () => useContext(MyPokemon);

export default useMyPokemon;
