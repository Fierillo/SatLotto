"use client";

import axios from 'axios';
import BigInteger from 'big-integer';
import { useState, useEffect } from 'react';

// Define the props that LuckyNumber will receive
interface LuckyNumberProps {
  selectedNumber: number | null; // The number selected by the user or null if no number is selected
  isFrozen: boolean; // Whether the application is in a frozen state
  //isMatch: boolean;
  setIsMatch: React.Dispatch<React.SetStateAction<boolean>>;
}

// The LuckyNumber component
export default function LuckyNumber({ selectedNumber , isFrozen, /*isMatch,*/ setIsMatch }: LuckyNumberProps) {
  // State to store the lucky number
  const [luckyNumber, setLuckyNumber] = useState<string | number>("...");
  const [isMatch, setLocalIsMatch] = useState<boolean>(false);
  /* State to store the Unix time
  const [unixTime, setUnixTime] = useState("");
  // State to store the formatted date
  const [formattedDate, setUnixTimeDate] = useState(""); 
  // hook that calculates isMatch when selectedNumber or luckyNumber changes*/
  /*useEffect(() => {
    setIsMatch(selectedNumber === Number(luckyNumber));
  }, [selectedNumber, luckyNumber]);*/

  // useEffect hook to fetch the lucky number when selectedNumber changes
  useEffect(() => {
    // Function to fetch the lucky number from the API
    async function fetchLuckyNumber() {
      // If no number is selected, set luckyNumber to "..." and return
      if (selectedNumber === null) {
        setLuckyNumber("...");
        return;
      }

      try {
        // Fetch data from the API
        const response = await axios.get("https://mempool.space/api/v1/blocks?q=latest");
        const data = response.data[0];
        const blockHash = data.id.replace(/"/g, ""); // Extract block hash
        const bigIntHash = Number(BigInteger(blockHash, 16)); // Convert hash to BigInt
        // Get current Unix time
        const unixTime = Number(Math.floor(Date.now() / 1000)); 
        const unixTimeDate = new Date(unixTime * 1000);
        const formattedDate = unixTimeDate.toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        // Get random number between 1 and 100
        const randomMultiplier = Math.floor(Math.random() * 100);
        // Calculate luckyNumber using the hash, Unix time, and a random multiplier
        const luckyNumber = ((bigIntHash * unixTime * randomMultiplier) % 21) + 1;
        // Update state with the new lucky number and time
        setLuckyNumber(luckyNumber.toString());
        setLocalIsMatch(selectedNumber === luckyNumber);
        setIsMatch(selectedNumber === luckyNumber);
        /*setUnixTime(unixTime.toString());
        setUnixTimeDate(formattedDate);*/
      } catch (error) {
        // Log any errors that occur during the API request
        console.error(error);
      }
    }
    // Call the function to fetch the lucky number
    fetchLuckyNumber();
  // Dependency array, effect runs when selectedNumber
  }, [selectedNumber, setIsMatch]); 

  // Render the LuckyNumber component
  /* return { luckyNumber, unixTime, formattedDate };*/
    // return a orange luckynumber box that shows "..." until user selects a number, then change to gray color
  return (
    <div 
      className={`flex 
                  flex-col 
                  items-center 
                  m-4 
                  ${isMatch ? 'text-green-400' : isFrozen ? 'text-gray-400' : 'text-orange-400'}`}
    >
      {/* Test box to show values on the right */}
      <div className="absolute top-0 right-0 mt-4 mr-4 w-64 p-4 bg-gray-800 border border-gray-700 text-white rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Debug Information</h2>
        <ul className="list-none text-right">
          <li className="py-1">Lucky Number: {luckyNumber}</li>
          <li className="py-1">Selected Number: {selectedNumber}</li>
          <li className="py-1">Is Match: {isMatch.toString()}</li>
        </ul>
      </div>
      <h2>Número de la Suerte:</h2>
      <h2 
        className={`font-bold 
                    text-4xl 
                    m-2 
                    p-2 
                    border-solid 
                    border-2 
                    rounded-lg 
                    ${isMatch ? 'border-green-400' : isFrozen ? 'border-gray-400' : 'border-orange-300'}`}
      >
        {luckyNumber /*!== null ? luckyNumber : "..."*/}
      </h2>
      {/*<h2>Unix time: {unixTime} | Fecha: {formattedDate}</h2>*/}
    </div>
  );
}
