import { useEffect, useState } from 'react';

export const useAsyncFn = (asyncFn, initial = {}) => {

    const [value, setValue] = useState(initial);
    const [error, setError] = useState(undefined);

    useEffect(async () => {
        if (!asyncFn) return;

        try {
            const val = await asyncFn();
            setValue(val);
        } catch (e) {
            setError(e);
        }
    }, [asyncFn])

    return [value, error];
}