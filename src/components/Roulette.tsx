import React, { useCallback, useContext, useMemo, useState } from 'react';
import LuckyNumber from './LuckyNumber';
import { LuckyContext } from '@/providers/lucky-context';
// Type variables
/*interface rouletteProps {
  selectedNumber: number | null;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number | null>>;
  isFrozen: boolean;
  setIsFrozen: React.Dispatch<React.SetStateAction<boolean>>;
  isMatch: boolean;
}*/
const numbers = Array.from({ length: 21 }, (_, i) => i + 1);
// Define roulette
export default function Roulette({}) {
  const {isMatch, setSelectedNumber, selectedNumber, setIsFrozen, isFrozen}=useContext(LuckyContext)
  //const [victoryMessage, setVictoryMessage] = useState<string | null>(null);
  //const [selectedNumber, setLocalSelectedNumber] = useState<number | null>(null);
  //const [isFrozen, setLocalIsFrozen] = useState<boolean>(false);
  // Triggers when user selects some number in the roulette
  const handleClick = (number: number) => {
    // If user won the game freezes
    if (isMatch) return;
    // If game is freezed user can't click numbers
    if (isFrozen) return;  
    // If user chooses same number creates a micro change to trigger selectedNumber anyway
    if (selectedNumber === number) {
      setSelectedNumber(null);
      setTimeout(() => setSelectedNumber(number), 0);
    } else {
      setSelectedNumber(number);
    }
    // Activates frozen status
    setIsFrozen(true);
    // Starts freeze for 3 seconds, then desactivate frozen status
    setTimeout(() => {
      setIsFrozen(false);
    }, 3000);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Main circle */}
      <div
        className={`relative
                    w-64
                    h-64
                    rounded-full
                    border-4
                    flex
                    mt-4
                    mb-4
                    items-center
                    justify-center
                    transition-colors
                    duration-500
                    ease-in-out
                    ${isMatch ? 'border-green-400' : isFrozen ? 'border-gray-300' : 'border-orange-300'}`}
      >
        {numbers.map((number, index) => {
          // Calculate the angle and corresponding position
          const angle = (index * 360) / numbers.length - 90;
          const x = 50 + 50 * Math.cos((angle * Math.PI) / 180);
          const y = 50 + 50 * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={number}
              className={`absolute
                          w-8
                          h-8
                          flex
                          items-center
                          justify-center
                          rounded-full
                          cursor-pointer
                          transition-transform
                          duration-500
                          ease-in-out
                          ${isMatch ? 'bg-green-400' : isFrozen ? 'bg-gray-400' : 'bg-orange-300'}
                          text-black`}
              style={{
                top: `${y}%`,
                left: `${x}%`,
                transform: "translate(-50%, -50%)" // Center the number on its position
              }}
              onClick={() => handleClick(number)}
            >
              {number}
            </div>
          );
        })}
      </div>

      {/* Renders selected number in the middle of the circle */}
      <div
        className={`absolute
                    flex
                    text-center
                    justify-center
                    text-2xl
                    font-bold
                    ${isMatch ? 'text-green-400' : isFrozen ? 'text-gray-400' : 'text-orange-300'}`}
      >
        {isMatch ? "GANASTE LOKO!" : selectedNumber !== null ? <h1 className='text-6xl'>{selectedNumber}</h1> : "Selecciona un numero..."}
      </div>
    </div>
  );
}
