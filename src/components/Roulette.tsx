import React, { useState, useRef } from 'react';

const RuletaInteractiva = ({ min = 1, max = 21 }) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const ruletaRef = useRef<HTMLDivElement>(null);

  const getNumberFromRotation = (angle: number) => {
    const totalNumbers = max - min + 11;
    const degreePerNumber = 360 / totalNumbers;
    const adjustedAngle = (angle + degreePerNumber / 2) % 360;
    const index = Math.floor(adjustedAngle / degreePerNumber);
    return (max - index) % totalNumbers + min;
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    const startX = event.clientX;
    const startY = event.clientY;
    const initialRotation = rotation;

    const handleMouseMove = (event: MouseEvent) => {
      if (ruletaRef.current) {
        const rect = ruletaRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

        const newRotation = initialRotation + angle;
        setRotation(newRotation);
        const number = getNumberFromRotation(newRotation);
        setSelectedNumber(number);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-72 h-72 rounded-full border-4 border-orange-500 relative cursor-pointer select-none transition-transform ease-out duration-300"
        ref={ruletaRef}
        style={{ transform: `rotate(${rotation}deg)` }}
        onMouseDown={handleMouseDown}
      >
        {[...Array(max - min + 1)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full text-center top-2 left-0 transform origin-bottom font-bold text-lg"
            style={{ transform: `rotate(${(i * 360) / (max - min + 1)}deg)` }}
          >
            {min + i}
          </div>
        ))}
      </div>
      <p className="mt-5 text-2xl font-bold">
        Número seleccionado: {selectedNumber !== null ? selectedNumber : "-"}
      </p>
    </div>
  );
};

export default RuletaInteractiva;