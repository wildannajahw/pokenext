import { createContext, ReactNode, useMemo } from 'react';
import useLocalStorage from '../hooks/use-local-storage';

type PokemonProviderProps = {
  children: ReactNode;
};

const initialState = {
  myPokemon: [],
  setMyPokemon: (newValue: any) => {},
};

const PokemonContext = createContext(initialState);

function PokemonProvider({ children }: PokemonProviderProps) {
  const [myPokemon, setMyPokemon] = useLocalStorage('my-pokemon', {
    myPokemon: [],
  });
  const contextValue = useMemo(() => ({ myPokemon, setMyPokemon }), [myPokemon, setMyPokemon]);
  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>;
}
export { PokemonProvider, PokemonContext };
