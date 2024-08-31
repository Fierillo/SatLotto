"use client";

import React, { useState } from 'react';

const Ruleta = ({ min = 1, max = 21 }) => {
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    setIsSpinning(true);

    const randomDelay = Math.floor(Math.random() * 2000) + 2000; // Entre 2 y 4 segundos
    const newNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    setTimeout(() => {
      setSelectedNumber(newNumber);
      setIsSpinning(false);
    }, randomDelay);
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`ruleta ${isSpinning ? 'spinning' : ''}`}>
        <div className="number">{selectedNumber ?? '-'}</div>
      </div>
      <button
        onClick={spin}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
        disabled={isSpinning}
      >
        {isSpinning ? 'Girando...' : 'Girar Ruleta'}
      </button>
      <p className="mt-2">Número seleccionado: {selectedNumber ?? '-'}</p>
    </div>
  );
};

export default Ruleta;