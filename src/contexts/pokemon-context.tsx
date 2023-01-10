import { createContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/use-local-storage';

type PokemonProviderProps = {
  children: ReactNode;
};

const initialState = {
  myPokemon: {},
  addPokemon: (_pokemon: any, _nickname: string) => {},
  removePokemon: (_nickname: string) => {},
};

const PokemonContext = createContext(initialState);

function PokemonProvider({ children }: PokemonProviderProps) {
  const [myPokemon, setMyPokemon] = useLocalStorage('my-pokemon', {});
  const addPokemon = (pokemon: any, nickname: string) => {
    const toBeSaved = { [nickname]: pokemon, ...(myPokemon || {}) };
    setMyPokemon(toBeSaved);
  };
  const removePokemon = (nickname: string) => {
    const toBeSaved = { ...myPokemon };
    if (!nickname || !toBeSaved[nickname]) {
      throw new Error('Pokemon not found');
    }
    delete toBeSaved[nickname];
    setMyPokemon(toBeSaved);
  };

  return (
    <PokemonContext.Provider value={{ myPokemon, addPokemon, removePokemon }}>
      {children}
    </PokemonContext.Provider>
  );
}
export { PokemonProvider, PokemonContext };
