/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useLocalStorage<ValueType>(key: string, defaultValue: ValueType) {
	const [value, setValue] = useState(() => {
		if (typeof window !== 'undefined') {
			const storedValue = localStorage.getItem(key);
			return storedValue === null ? defaultValue : JSON.parse(storedValue);
		}

		return defaultValue;
	});

	useEffect(() => {
		const listener = (e: StorageEvent) => {
			if (e.storageArea === localStorage && e.key === key) {
				setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
			}
		};

		window.addEventListener('storage', listener);

		return () => {
			window.removeEventListener('storage', listener);
		};
	}, [key, defaultValue]);

	const setValueInLocalStorage = (newValue: ValueType) => {
		setValue((currentValue: ValueType) => {
			const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;

			localStorage.setItem(key, JSON.stringify(result));

			return result;
		});
	};

	return [value, setValueInLocalStorage];
}
