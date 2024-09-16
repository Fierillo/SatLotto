// My first provider :)
import { createContext, useState } from 'react';

export const LuckyContext = createContext<{
    setLuckyNumber: React.Dispatch<React.SetStateAction<number | string | null>>;
    luckyNumber: number | string | null;
    setSelectedNumber: React.Dispatch<React.SetStateAction<string | number>>
    selectedNumber: string | number; // The number selected by the user or default text at the start
    setIsFrozen: React.Dispatch<React.SetStateAction<boolean>>;
    isFrozen: boolean; // Whether the application is in a frozen state
    setIsMatch: React.Dispatch<React.SetStateAction<boolean>>;
    isMatch: boolean;
}>({
    setLuckyNumber: () => { },
    luckyNumber: null,
    setSelectedNumber: () => { },
    selectedNumber: "Selecciona un numero...",
    setIsFrozen: () => { },
    isFrozen: false,
    setIsMatch: () => { },
    isMatch: false
});

interface LuckyProviderProps {
    children: React.ReactNode
}

export function LuckyProvider ({ children }: LuckyProviderProps) {
    const [selectedNumber, setSelectedNumber] = useState<string | number>("Selecciona un numero...");
    const [luckyNumber, setLuckyNumber] = useState<number | string | null>(null);
    const [isFrozen, setIsFrozen] = useState<boolean>(false);
    const [isMatch, setIsMatch] = useState<boolean>(false);
    return <LuckyContext.Provider value={{setLuckyNumber, luckyNumber, setSelectedNumber , selectedNumber , setIsFrozen , isFrozen, setIsMatch, isMatch }}>{children}</LuckyContext.Provider>
}