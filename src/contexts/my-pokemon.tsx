import { createContext, ReactNode, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const defaultValue: string[] = [];

const MyPokemon = createContext(defaultValue);

type MyPokemonProviderProps = {
  children: ReactNode;
};

function MyPokemonProvider({ children }: MyPokemonProviderProps) {
  const [myPokemon, setMyPokemon] = useLocalStorage('my-pokemon', {
    defaultValue,
  });
  // const value = useMemo(() => ({ myPokemon, setMyPokemon }), [myPokemon, setMyPokemon]);
  return <MyPokemon.Provider value={{ ...myPokemon, setMyPokemon }}>{children}</MyPokemon.Provider>;
}

export { MyPokemonProvider, MyPokemon };
