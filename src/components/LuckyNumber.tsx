"use client";

import { useRenderCount } from "@/hooks/hooks";
import { LuckyContext } from "@/providers/lucky-context";
import axios from "axios";
import BigInteger from "big-integer";
import { useContext, useEffect } from "react";

// The LuckyNumber component
export function LuckyNumber({}) {
  const {
    luckyNumber,
    setLuckyNumber,
    setIsMatch,
    isMatch,
    selectedNumber,
    isFrozen,
  } = useContext(LuckyContext);
  const renderCount = useRenderCount("LuckyNumber");
  
  // Calculate the lucky number based on the block hash, current unix time, and random multiplier
  useEffect(() => {
    if (selectedNumber !== "Selecciona un numero...") {
      (async () => {
        try {
          // Fetch the latest block from mempool.space
          const response = await axios.get("https://mempool.space/api/v1/blocks?q=latest");
          // Get the block hash
          const data = response.data[0];
          // Convert the hexadecimal block hash to a big integer
          const bigIntHash = Number(BigInteger(data.id, 16));
          // Get the current unix time in seconds
          const unixTime = Math.floor(Date.now() / 1000);
          // Get a random multiplier between 0 and 100
          const randomMultiplier = Math.floor(Math.random() * 100);
          // Calculate the lucky number using the block hash, current unix time, and random multiplier
          const luckyNumber = ((bigIntHash * unixTime * randomMultiplier) % 21) + 1;
          // Set the lucky number and check if it matches the selected number
          setLuckyNumber(luckyNumber);
          setIsMatch(selectedNumber.number === luckyNumber);
        } catch (error) {
          // Error handling
          console.error("Failed to fetch lucky number:", error);
        }
      })();
    }
  }, [selectedNumber]);

  // Render the LuckyNumber component
  return (
    <div
      className={`flex 
                  flex-col 
                  items-center 
                  m-4 
                  ${
                    isMatch
                      ? "text-green-400"
                      : isFrozen
                      ? "text-gray-400"
                      : "text-orange-400"
                  }`}
    >
      <h2>Número de la Suerte:</h2>
      <h2
        className={`font-bold 
                    text-4xl 
                    m-2 
                    p-2 
                    border-solid 
                    border-2 
                    rounded-lg 
                    ${
                      isMatch
                        ? "border-green-400"
                        : isFrozen
                        ? "border-gray-400"
                        : "border-orange-300"
                    }`}
      >
        {luckyNumber !== null ? luckyNumber : "..."}
      </h2>
      <p className='text-sm text-gray-500'>Render count: {renderCount}</p>
      {/*<h2>Unix time: {unixTime} | Fecha: {formattedDate}</h2>*/}
    </div>
  );
}

// LUCKYNUMBER - V2

export default function LuckyNumber2() {
  const {luckyNumber, setLuckyNumber, isMatch, setIsMatch, selectedNumber, isFrozen} = useContext(LuckyContext);
  //const [luckyNumber, setLuckyNumber] = useState<number | null>(null);
  //const [isMatch, setIsMatch] = useState<boolean>(false);
  const renderCount = useRenderCount("LuckyNumber2");

  useEffect(() => {
    const fetchLuckyNumber = async () => {
      if (selectedNumber === null) {return};

      try {
        const response = await axios.get(
          "https://mempool.space/api/v1/blocks?q=latest"
        );
        const blockHash = response.data[0].id;
        const luckyNumber = parseInt(blockHash.slice(-8), 16);
        const unixTime = Number(Math.floor(Date.now() / 1000));
        const randomMultiplier = Math.floor(Math.random() * 100);

        setLuckyNumber((luckyNumber * unixTime * randomMultiplier) % 21 + 1);
        setIsMatch(Number(selectedNumber) === luckyNumber);
      } catch (error) {
        console.error("error")
      }
    };
    fetchLuckyNumber();
  }, [selectedNumber]);

  return (
    <div
      className={`flex 
                  flex-col 
                  items-center 
                  m-4 
                  ${
                    isMatch
                      ? "text-green-400"
                      : isFrozen
                      ? "text-gray-400"
                      : "text-orange-400"
                  }`}
    >
      <h2>Número de la Suerte:</h2>
      <h2
        className={`font-bold 
                    text-4xl 
                    m-2 
                    p-2 
                    border-solid 
                    border-2 
                    rounded-lg 
                    ${
                      isMatch
                        ? "border-green-400"
                        : isFrozen
                        ? "border-gray-400"
                        : "border-orange-300"
                    }`}
      >
        {luckyNumber !== null ? luckyNumber : "..."}
      </h2>
      <p className='text-sm text-gray-500'>Render count: {renderCount}</p>
      {/*<h2>Unix time: {unixTime} | Fecha: {formattedDate}</h2>*/}
    </div>
  );
}