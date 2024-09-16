'use client'

import { LuckyContext } from '@/providers/lucky-context'
import { useContext } from 'react'

export default function NumberSelector() {
  const {selectedNumber, setSelectedNumber, isFrozen, isMatch} = useContext(LuckyContext)

  const getConditionalStyles = () => {
    if (isMatch) {
      return "text-green-400 border-green-400";
    } else if (isFrozen) {
      return "text-gray-400 border-gray-400";
    } else {
      return "text-orange-300 border-orange-300";
    }
  };

  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-2xl font-bold mb-4">{selectedNumber && (
        <p className="mt-1 text-center">
          <span className="font-bold">{selectedNumber}</span>
        </p>
      )}</h2> 
      <div className={`grid grid-cols-7 gap-2`}>
        {Array.from({ length: 21 }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => isFrozen ? null : setSelectedNumber(number)}
            className={`text-2xl text-center font-semibold border rounded-lg 
                ${
                    selectedNumber === number && isMatch 
                    ? 'border-green-400 text-black bg-green-400'
                    : isMatch
                    ? 'border-green-400 text-green-400' 
                    : selectedNumber === number && isFrozen 
                    ? 'border-gray-400 text-black bg-gray-400' 
                    : isFrozen
                    ? 'text-gray-400 border-gray-400 hover:bg-gray-400 hover:text-black hover:cursor-not-allowed'
                    : selectedNumber === number
                    ? 'border-orange-300 text-black bg-orange-300'
                    : 'border-orange-300 hover:bg-orange-300 hover:text-black transition-colors'
                }
            `}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}