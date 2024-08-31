import React, { useState } from 'react';
import LuckyNumber from './LuckyNumber';

interface RuletaCircularProps {
  setSelectedNumber: React.Dispatch<React.SetStateAction<number | null>>;
  isFrozen: boolean;
  setIsFrozen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RuletaCircular({ setSelectedNumber, isFrozen, setIsFrozen }: RuletaCircularProps) {
  const [selectedNumber, setLocalSelectedNumber] = useState<number | null>(null);
  const numbers = Array.from({ length: 21 }, (_, i) => i + 1);

  const handleClick = (number: number) => {
    if (isFrozen) return; // Prevent click if frozen

    setLocalSelectedNumber(number);
    setSelectedNumber(number);

    // Start freezing
    setIsFrozen(true);
    setTimeout(() => {
      setIsFrozen(false);
    }, 3000); // 3 seconds freeze
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
                    ${isFrozen ? 'border-gray-300' : 'border-orange-300'}`}
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
                          ${isFrozen ? 'bg-gray-400' : 'bg-orange-300'}
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

      {/* Selected number display */}
      <div
        className={`absolute
                    flex
                    text-center
                    justify-center
                    text-2xl
                    font-bold
                    ${isFrozen ? 'text-gray-400' : 'text-orange-300'}`}
      >
        {selectedNumber !== null ? selectedNumber : "Selecciona un numero..."}
      </div>
    </div>
  );
}
