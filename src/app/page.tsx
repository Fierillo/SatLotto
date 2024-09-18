"use client";

import React, { useContext, useEffect } from 'react';
import { LuckyContext } from '@/providers/lucky-context';
import { GitHubLogo, LaCryptaLogo } from '../components/Logo';
import { BlockRelay2 } from '@/components/BlockRelay';
import NumberBoard from '@/components/NumberBoard';
import { BenchmarkMonitor, PerformanceMonitor } from '@/components/Benchmark';
import { RenderCountProvider } from '@/providers/benchmark-context';

export default function Home() {
  const {isMatch, isFrozen, luckyNumber, selectedNumber, setIsMatch, setIsFrozen}=useContext(LuckyContext);
  
  // Initial freeze time to prevent user's cheating refreshing the page
  /*useEffect(() => {
    setIsFrozen(true);
    setTimeout(() => {
      setIsFrozen(false);
    }, 1000);
  }, []);*/
  useEffect (() => {
    setIsMatch(luckyNumber === selectedNumber);
  }, [luckyNumber])  
  

  return (
    <main className={`max-w-full max-h-full overflow-x-hidden flex flex-col ${isMatch ? 'text-green-400 border-green-400' : isFrozen ? 'text-gray-400 border-gray-400' : 'text-orange-300 border-orange-300' } bg-black/95 items-center p-2`}>
      {/* Header */}	
      <div className={`flex flex-row w-full gap-8 items-center justify-between bg-gray-500 border-solid border-2 ${isMatch ? 'border-green-400' : isFrozen ? 'border-gray-400' : 'border-orange-300'} rounded-md px-4 font-mono text-sm md:flex`}>
        {/* Text that is always visible */}
        <p className={`flex min-h-4 p-2 gap-4 left-0 top-0 bg-black/95 w-full justify-center text-center border-b ${isMatch ? 'border-green-400 text-green-400' : isFrozen ? 'border-gray-400 text-gray-400' : 'border-orange-300 text-orange-300'} backdrop-blur-2xl dark:border-neutral-800 md:static md:w-auto  md:rounded-xl md:border md:p-4`}>
          La comunidad bitcoiner mas picante&nbsp;
          <code className="font-mono font-bold">de Argentina, ¡el mejor pais del mundo!</code>
        </p>
        {/* Logo in the top that drop to bottom in smaller screens */}
        <div className={`${isMatch ? 'text-green-400' : 'text-orange-300'} fixed bottom-0 left-0 h-30 w-full bg-gradient-to-t from-white via-white dark:from-black dark:via-black md:static md:size-auto md:bg-none`}>
          <a
            className="flex flex-col items-center md:flex md:flex-row md:items-center md:gap-2"
            href="https://lacrypta.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by:{" "}
            <LaCryptaLogo />
          </a>
        </div>
      </div>
      {/* Main container */}
      <div className={`relative max-w-full mt-2 container flex flex-col items-center border-solid border-2 rounded-lg justify-center px-1 py-4 ${isMatch ? 'border-green-400' : isFrozen ? 'border-gray-400' : 'border-orange-300'}`}>
        {/* Title */}
        <h1 
          className={`font-bold
                      text-center
                      text-6xl
                      ${isMatch ? 'text-green-400' : isFrozen ? 'text-gray-400' : 'text-orange-300'}`}
        >
          SatLotto
        </h1>
          {/* Renders a relay of the latest 10 Bitcoin's blocks */}
          <BlockRelay2 />
          {/* Renders a box that shows luckynumber after user selects some number in roulette 
          <LuckyNumber />
          {/* Renders a roulette of numbers that user can select 
          <Roulette /> */}
          {/* Renders a board of numbers that user can select */}
          <NumberBoard />
      </div>
      {/* GitHub link */}
      <div className={`relative bottom-0 center-0 mt-4 mb-28 mr-4 
        ${isMatch ? 'text-green-400' : isFrozen 
        ? 'text-gray-400' : 'text-orange-300'}`}>
        <a href="https://github.com/fierillo/satlotto">
          <GitHubLogo />
        </a>
      </div>
      {/* Caja de depuración 
      <div className="absolute top-0 right-0 mt-4 mr-4 w-50 p-4 bg-gray-800 border border-gray-700 text-white rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Debug Information</h2>
        <ul className="text-center">
          <li className="py-1">Lucky Number: {luckyNumber} Tipo: {typeof(luckyNumber)}</li>
          <li className="py-1">Selected Number: {selectedNumber} Tipo: {typeof(selectedNumber)}</li>
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
