"use client";

import React, { useContext, useEffect } from 'react';
import Roulette2, { Roulette } from "@/components/Roulette";
import { LuckyContext } from '@/providers/lucky-context';
import LuckyNumber2, { LuckyNumber } from '@/components/LuckyNumber';
import { GitHubLogo, LaCryptaLogo } from '../components/Logo';
import {Benchmark, BenchmarkStateUpdates} from '@/components/Benchmark';
import {BenchmarkRoulette} from '@/components/Benchmark';

export default function Home() {
  const {isMatch, isFrozen, setIsFrozen, luckyNumber, selectedNumber}=useContext(LuckyContext);
  // Initial freeze time to prevent user's cheating refreshing the page
  useEffect(() => {
    setIsFrozen(true);
    setTimeout(() => {
      setIsFrozen(false);
    }, 3000);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-black/95 text-orange-300">
      {/* Header */}	
      <div className={`z-10 w-full max-w-5xl items-center justify-between bg-gray-500 border-solid border-2 ${isMatch ? 'border-green-400' : 'border-orange-300'} rounded-md p-4 font-mono text-sm lg:flex`}>
        <p className={`fixed left-0 top-0 bg-black/95 flex w-full justify-center border-b ${isMatch ? 'border-green-400 text-green-400' : 'border-orange-300'} pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4`}>
          La comunidad bitcoiner mas picante&nbsp;
          <code className="font-mono font-bold">de Argentina, ¡el mejor pais del mundo!</code>
        </p>
        <div className={`${isMatch ? 'text-green-400' : 'text-orange-300'} fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none`}>
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://lacrypta.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <LaCryptaLogo />
          </a>
        </div>
      </div>
      {/* Main container */}
      <div 
        className={`container 
                    m-16 
                    flex 
                    flex-col 
                    items-center 
                    border-solid 
                    border-2 
                    rounded-lg  
                    justify-center 
                    px-4 
                    py-4
                    ${isMatch ? 'border-green-400' : isFrozen ? 'border-gray-400' : 'border-orange-300'}`}
      >
        <h1 
          className={`font-bold 
                      text-4xl
                      ${isMatch ? 'text-green-400' : isFrozen ? 'text-gray-400' : 'text-orange-300'}`}
        >
          SatLotto
        </h1>
        {/*<div>
          <h2 className="m-4">Tu Número de la Suerte: {luckyNumber ? luckyNumber : "Cargando..."}</h2>
          <h2>Unix time: {unixTime} | Fecha: {formattedDate}</h2>
        </div>*/}
        {/* Renders a box that shows luckynumber after user selects some number in roulette */}
        <LuckyNumber />
        {/* Renders a roulette of numbers that user can select */}
        <Roulette />
      </div>
      {/* GitHub link */}
      <div className={`relative bottom-0 center-0 mt-4 mr-4 
        ${isMatch ? 'text-green-400' : isFrozen 
        ? 'text-gray-400' : 'text-orange-300'}`}>
        <a href="https://github.com/fierillo/satlotto">
          <GitHubLogo />
        </a>
      </div>
      {/* Caja de depuración
      <div className="absolute top-0 right-0 mt-4 mr-4 w-50 p-4 bg-gray-800 border border-gray-700 text-white rounded-lg shadow-lg">
        {/*<DebugBox />*/}
        {/*<h2 className="text-lg font-bold mb-4">Debug Information</h2>
        <ul className="text-center">
          <li className="py-1">Lucky Number: {luckyNumber}</li>
          <li className="py-1">Selected Number: {selectedNumber}</li>
          <li className="py-1">Is Match: {isMatch.toString()}</li>
          <li className="py-1">Is Frozen: {isFrozen.toString()}</li>
        </ul>
      </div>*/}

      {/*<div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>*/}
    </main>
  );
}
