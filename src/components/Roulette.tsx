import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LuckyContext } from '@/providers/lucky-context';
import { useRenderCount } from '@/hooks/hooks';

// Type variables
/*interface rouletteProps {
  selectedNumber: number | null;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number | null>>;
  isFrozen: boolean;
  setIsFrozen: React.Dispatch<React.SetStateAction<boolean>>;
  isMatch: boolean;
}*/

// Constants
const NUMBERS = Array.from({ length: 21 }, (_, i) => i + 1);
const FREEZE_DURATION = 3000;

// Define roulette
export function Roulette( ) {
  const {isMatch, setSelectedNumber, selectedNumber, setIsFrozen, isFrozen}=useContext(LuckyContext)
  const renderCount = useRenderCount("Roulette");
  //const [victoryMessage, setVictoryMessage] = useState<string | null>(null);
  //const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  //const [isFrozen, setIsFrozen] = useState<boolean>(false);
  // Triggers when user selects some number in the roulette
  const handleClick = (number: number) => {
    // If user won OR user select a number, the game freezes
    if (isMatch || isFrozen) return;
    // If user chooses same number creates a micro change to trigger selectedNumber anyway
    /*if (selectedNumber === number) {
      setSelectedNumber(null);
      setTimeout(() => setSelectedNumber(number), 100);
    } else {
      setSelectedNumber(number);
    }*/
    setSelectedNumber({ number })
    // Activates frozen status
    setIsFrozen(true);
    // Starts freeze for 3 seconds, then desactivate frozen status
    setTimeout(() => {
      setIsFrozen(false);
    }, FREEZE_DURATION);
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
        {NUMBERS.map((number, index) => {
          // Calculate the angle and corresponding position
          const angle = (index * 360) / NUMBERS.length - 90;
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
                    flex-col
                    text-center
                    justify-center
                    text-2xl
                    font-bold
                    ${isMatch ? 'text-green-400' : isFrozen ? 'text-gray-400' : 'text-orange-300'}`}
      >
        {isMatch ? "GANASTE LOKO!" : selectedNumber !== "Selecciona un numero..." ? <h1 className='text-6xl'>{(selectedNumber.number)}</h1> : "Selecciona un numero..."}
        <p className='font-normal text-sm text-gray-500'>Render count: {renderCount}</p>
      </div>
      
    </div>
  );
}

// ROULETTE COMPONENT - V2

// Creation of the roulette
const createRouletteWheel = (numberElements: React.ReactNode[], borderColor: string) => (
  <div className={`relative w-64 h-64 rounded-full border-4 flex mt-4 mb-4 items-center justify-center transition-colors duration-500 ease-in-out ${borderColor}`}>
    {numberElements}
  </div>
);

// Creation and position of each number's container
const calculatePosition = (index: number, total: number) => {
  const angle = (index * 360) / total - 90;
  const x = 50 + 50 * Math.cos((angle * Math.PI) / 180);
  const y = 50 + 50 * Math.sin((angle * Math.PI) / 180);
  return { x, y };
};

// Generate number elements
const generateNumberElements = (handleClick: (number: number) => void, commonStyles: { bgColor: string }) => 
  NUMBERS.map((number, index) => {
    const { x, y } = calculatePosition(index, NUMBERS.length);

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
                    ${commonStyles.bgColor}
                    text-black`}
        style={{
          top: `${y}%`,
          left: `${x}%`,
          transform: "translate(-50%, -50%)"
        }}
        onClick={() => handleClick(number)}
      >
        {number}
      </div>
    );
  }
);

// Creation of the center of the roulette
const createRouletteCenter = (content: React.ReactNode, textColor: string) => (
  <div className={`absolute flex text-center justify-center text-2xl font-bold ${textColor}`}>
    {content}
  </div>
);

// Conditional styles
const getCommonStyles = (isMatch: boolean, isFrozen: boolean) => ({
  borderColor: isMatch ? 'border-green-400' : isFrozen ? 'border-gray-300' : 'border-orange-300',
  bgColor: isMatch ? 'bg-green-400' : isFrozen ? 'bg-gray-400' : 'bg-orange-300',
  textColor: isMatch ? 'text-green-400' : isFrozen ? 'text-gray-400' : 'text-orange-300'
});

// Main function
export default function Roulette2() {
  const { isMatch, setSelectedNumber, selectedNumber, setIsFrozen, isFrozen } = useContext(LuckyContext);
  const renderCount = useRenderCount("Roulette2");
  
  // When user clicks on a number, this function is triggered
  const handleClick = useCallback((number: number) => {
    // If user won OR game is frozen, do nothing
    if (isMatch || isFrozen) return;
    // If user selects the same number, create a micro change to trigger selectedNumber anyway
    setSelectedNumber(number);
    /*if (selectedNumber === number) {
      setSelectedNumber(number);
      //setTimeout(() => setSelectedNumber(number), 0);
    } else {
      setSelectedNumber(number);
    }*/
    // Activates frozen status
    setIsFrozen(true);
    setTimeout(() => {
      setIsFrozen(false);
    }, FREEZE_DURATION);
  }, [isMatch, isFrozen, selectedNumber, setSelectedNumber, setIsFrozen]);
  
  // Store in memory the common styles
  const commonStyles = useMemo(() => getCommonStyles(isMatch, isFrozen), [isMatch, isFrozen]);
  
  // Store in memory the number elements
  const numberElements = useMemo(() => generateNumberElements(handleClick, commonStyles), [handleClick, commonStyles.bgColor]);

  // Store in memory the roulette wheel 
  const rouletteWheel = useMemo(() => 
    createRouletteWheel(numberElements, commonStyles.borderColor),
    [numberElements, commonStyles.borderColor]
  );
    
  // Store in memory the center content
  const centerContent = useMemo(() => {
    if (isMatch) return "GANASTE LOKO!";
    if (selectedNumber !== null) return <h1 className='text-6xl'>{selectedNumber}</h1>;
    return "...";
  }, [isMatch, selectedNumber]);

  const rouletteCenter = useMemo(() => 
    createRouletteCenter(centerContent, commonStyles.textColor),
    [centerContent, commonStyles.textColor]
  );

  return (
    <div className="relative flex flex-col items-center justify-center">
      {rouletteWheel}
      {rouletteCenter}
      {/*<p className='text-[1rem] text-gray-400'>Render count: {renderCount}</p>*/}
    </div>
  );
}