"use client";

import axios from 'axios';
import BigInteger from 'big-integer';
import { useState, useEffect } from 'react';

// Type parameters
interface LuckyNumberProps {
  selectedNumber: number | null;
  isFrozen: boolean;
}

// Define parameters for LuckyNumber function
export default function luckyNumber({ selectedNumber, isFrozen }: LuckyNumberProps) {
  const [luckyNumber, setLuckyNumber] = useState("...");
  const [unixTime, setUnixTime] = useState("");
  const [formattedDate, setUnixTimeDate] = useState("");

  useEffect(() => {
    
    // show "..." if user doesn't select any number
    if (selectedNumber === null) {
      setLuckyNumber("...");
      return;
    }
    
    // Create async function that return luckynumber only when user chooses a number
    async function fetchLuckyNumber() {
      try {
        const response = await axios.get("https://mempool.space/api/v1/blocks?q=latest");
        
        // Extract latest Bitcoin blockhash and converts to big int number
        const data = response.data[0]; 
        const blockHash = data.id.replace(/"/g, ""); 
        const bigIntHash = Number(BigInteger(blockHash, 16)); 
        
        // Extract unixTime in seconds, also converts to current Date
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
        
        // Create a random number between 1-100
        const randomMultiplier = Math.floor(Math.random() * 100);
        
        // Create luckynumber using block hash, unitTime and Random number, then convert to number between 1 and 21 using module
        const luckyNumber = ((bigIntHash * unixTime * randomMultiplier) % 21)+1; 
        
        setLuckyNumber(luckyNumber.toString());
        setUnixTime(unixTime.toString());
        setUnixTimeDate(formattedDate);
      } catch (error) {
        console.error(error);
      }
    }

    // Ejecute fetchLuckyNumber function
    fetchLuckyNumber();
  }, [selectedNumber]); // Ejecute useEffect only when selectedNumber changes

  /* return { luckyNumber, unixTime, formattedDate };*/
    // return a orange luckynumber box that shows "..." until user selects a number, then change to gray color
    return (
    <div 
      className={`flex 
                  flex-col 
                  items-center 
                  m-4 
                  ${isFrozen ? 'text-gray-400' : 'text-orange-400'}`}
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
                    ${isFrozen ? 'border-gray-400' : 'border-orange-300'}`}
      >
        {luckyNumber !== null ? luckyNumber : "..."}
      </h2>
      {/*<h2>Unix time: {unixTime} | Fecha: {formattedDate}</h2>*/}
    </div>
  );
}
