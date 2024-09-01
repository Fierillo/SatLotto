import React, { use, useState } from 'react';
import LuckyNumber from './LuckyNumber';
// Type variables
interface circleProps {
  selectedNumber: number | null;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number | null>>;
  isFrozen: boolean;
  setIsFrozen: React.Dispatch<React.SetStateAction<boolean>>;
  isMatch: boolean;
}
// Define circle
export default function Circle({ selectedNumber, setSelectedNumber, isFrozen, setIsFrozen, isMatch }: circleProps) {
  const [victoryMessage, setVictoryMessage] = useState<string | null>(null);
  //const [selectedNumber, setLocalSelectedNumber] = useState<number | null>(null);
  //const [isFrozen, setLocalIsFrozen] = useState<boolean>(false);
  const numbers = Array.from({ length: 21 }, (_, i) => i + 1);
  

  const handleClick = (number: number) => {
    if (isMatch || victoryMessage) return; // Prevent click if frozen
    // Get current unix time
    const unixTime = Math.floor(Date.now()); 

    setSelectedNumber(number);
    setIsFrozen(true);

    // Starts freeze for 3 seconds
    if (isMatch) {
      setVictoryMessage("¡GANASTE LOKO!");
      setIsFrozen(false);
      return;
    } else {
      setTimeout(() => {
        setIsFrozen(false);
      }, 100);
    } 
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
                    items-center
                    justify-center
                    transition-colors
                    duration-500
                    ease-in-out
                    ${isMatch ? 'border-green-400' : isFrozen ? 'border-gray-300' : 'border-orange-300'}`}
      >
        {numbers.map((number, index) => {
          // Calculate the angle and corresponding position
          const angle = (index * 360) / numbers.length;
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
