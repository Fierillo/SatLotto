// My first provider :)
import { createContext, useContext, useState } from 'react';

export const LuckyContext = createContext<{
    setLuckyNumber: React.Dispatch<React.SetStateAction<null | number>>;
    luckyNumber: null | number;
    setSelectedNumber: React.Dispatch<React.SetStateAction<null | number>>
    selectedNumber: number | null; // The number selected by the user or null if no number is selected
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
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [luckyNumber, setLuckyNumber] = useState<number | null>(null);
    const [isFrozen, setIsFrozen] = useState<boolean>(false);
    const [isMatch, setIsMatch] = useState<boolean>(false);
    return <LuckyContext.Provider value={{setLuckyNumber, luckyNumber, setSelectedNumber , selectedNumber , setIsFrozen , isFrozen, setIsMatch, isMatch }}>{children}</LuckyContext.Provider>
}

function coso ({ children }: LuckyProviderProps) {
    const {}=useContext(LuckyContext)
    return <div></div>

}