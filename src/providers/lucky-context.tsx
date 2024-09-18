// My first provider :)
import { createContext, useEffect, useState } from 'react';

export const LuckyContext = createContext<{
    setLuckyNumber: React.Dispatch<React.SetStateAction<number | string | null>>;
    luckyNumber: number | string | null;
    setSelectedNumber: React.Dispatch<React.SetStateAction<string | number>>
    selectedNumber: null | string | number; // The number selected by the user or default text at the start
    setIsFrozen: React.Dispatch<React.SetStateAction<boolean>>;
    isFrozen: boolean; // Whether the application is in a frozen state
    setIsMatch: React.Dispatch<React.SetStateAction<boolean>>;
    isMatch: boolean;
}>({
    setLuckyNumber: () => { },
    luckyNumber: null,
    setSelectedNumber: () => { },
    selectedNumber: null,
    setIsFrozen: () => { },
    isFrozen: false,
    setIsMatch: () => { },
    isMatch: false
});

interface LuckyProviderProps {
    children: React.ReactNode
}

export function LuckyProvider ({ children }: LuckyProviderProps) {
    const getInitialSelectedNumber = () => {
        if (typeof window !== 'undefined') {
            const storedNumber = localStorage.getItem('selectedNumber');
            return storedNumber ? JSON.parse(storedNumber) : "Selecciona un número...";
        }
        return "Selecciona un número...";
    };
    const [selectedNumber, setSelectedNumber] = useState<string | number>(getInitialSelectedNumber);
    const [luckyNumber, setLuckyNumber] = useState<number | string | null>(null);
    const [isFrozen, setIsFrozen] = useState<boolean>(false);
    const [isMatch, setIsMatch] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && selectedNumber !== null && selectedNumber !== undefined) {
            localStorage.setItem('selectedNumber', JSON.stringify(selectedNumber));
        }
    }, [selectedNumber]);

    return <LuckyContext.Provider value={{setLuckyNumber, luckyNumber, setSelectedNumber , selectedNumber , setIsFrozen , isFrozen, setIsMatch, isMatch }}>{children}</LuckyContext.Provider>
}