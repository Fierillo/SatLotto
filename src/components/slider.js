// Slider.js
import React, { useState } from 'react';

const Slider = ({ min = 1, max = 21 }) => {
  const [value, setValue] = useState(max);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full max-w-xs my-4"
      />
      <p>Valor actual: {value}</p>
    </div>
  );
};

export default Slider;
