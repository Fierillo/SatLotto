// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import Roulette2, { Roulette } from './Roulette';

import { useRenderCount } from "@/providers/benchmark-context";
import { useEffect, useRef, useState } from "react";

// export function BenchmarkStateUpdates() {
//   const [updateTime, setUpdateTime] = useState<number>(0);
//   const [updateCount, setUpdateCount] = useState<number>(0);

//   useEffect(() => {
//     const startTime = performance.now();
//     let count = 0;

//     const interval = setInterval(() => {
//       if (count < 1000) {
//         // Simular selección de número
//         setSelectedNumber(Math.floor(Math.random() * 21) + 1);
//         count++;
//       } else {
//         clearInterval(interval);
//         const endTime = performance.now();
//         setUpdateTime(endTime - startTime);
//         setUpdateCount(count);
//       }
//     }, 0);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <Roulette2 />
//       <h2>Benchmark Results:</h2>
//       <p>Tiempo total para {updateCount} actualizaciones de estado: {updateTime.toFixed(2)}ms</p>
//       <p>Tiempo promedio por actualización: {(updateTime / updateCount).toFixed(2)}ms</p>
//     </div>
//   );
// }

// export function BenchmarkRoulette() {
//   const [renderTime, setRenderTime] = useState<number>(0);
//   const [rerenderCount, setRerenderCount] = useState<number>(0);

//   useEffect(() => {
//     const startTime = performance.now();
    
//     // Forzar varios re-renderizados
//     for (let i = 0; i < 1000; i++) {
//       render(<Roulette2 />, document.getElementById('benchmark-root'));
//     }

//     const endTime = performance.now();
//     setRenderTime(endTime - startTime);
//     setRerenderCount(1000);
//   }, []);

//   return (
//     <div>
//       <h2>Benchmark Results:</h2>
//       <p>Tiempo total para {rerenderCount} renderizados: {renderTime.toFixed(2)}ms</p>
//       <p>Tiempo promedio por renderizado: {(renderTime / rerenderCount).toFixed(2)}ms</p>
//     </div>
//   );
// }

// function setSelectedNumber(arg0: number) {
//   throw new Error('Function not implemented.');
// }

// type BenchmarkResult = {
//   tiempoEjecucion: number;
//   memoriaUsadaInicio: number;
//   memoriaUsadaFin: number;
//   memoriaUsada: number;
// };

// type BenchmarkProps = {
//   funcion: (...args: any[]) => any;
//   args: any[];
//   iteraciones?: number;
// };

// export function Benchmark({ funcion, args, iteraciones = 1 }: BenchmarkProps) {
//   const [resultados, setResultados] = useState<BenchmarkResult | null>(null);

//   const ejecutarBenchmark = useCallback(() => {
//     const memoriaInicio = process.memoryUsage().heapUsed;
//     const tiempoInicio = performance.now();

//     for (let i = 0; i < iteraciones; i++) {
//       funcion(...args);
//     }

//     const tiempoFin = performance.now();
//     const memoriaFin = process.memoryUsage().heapUsed;

//     const tiempoEjecucion = tiempoFin - tiempoInicio;
//     const memoriaUsada = memoriaFin - memoriaInicio;

//     setResultados({
//       tiempoEjecucion,
//       memoriaUsadaInicio: memoriaInicio,
//       memoriaUsadaFin: memoriaFin,
//       memoriaUsada,
//     });
//   }, [funcion, args, iteraciones]);

//   return (
//     <div className="p-4 border rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Benchmark</h2>
//       <button
//         onClick={ejecutarBenchmark}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Ejecutar Benchmark
//       </button>
//       {resultados && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Resultados:</h3>
//           <p>Tiempo de ejecución: {resultados.tiempoEjecucion.toFixed(4)} ms</p>
//           <p>Memoria usada: {(resultados.memoriaUsada / 1024 / 1024).toFixed(2)} MB</p>
//           <p>Iteraciones: {iteraciones}</p>
//         </div>
//       )}
//     </div>
//   );
// }

export const BenchmarkMonitor = () => {
    const { renderCount, increment } = useRenderCount();
    const [memoryUsage, setMemoryUsage] = useState<{ total: number; used: number } | null>(null);
  
    useEffect(() => {
      increment();
  
      // Actualizar el uso de memoria
      if ((performance as any).memory) {
        setMemoryUsage({
          total: ((performance as any).memory).totalJSHeapSize,
          used: ((performance as any).memory).usedJSHeapSize,
        });
      }
    }, []);
  
    return (
        <div>
            <div>Render Count: {renderCount}</div>
            {memoryUsage ? (
                <div>
                    Memory: {`${(memoryUsage.used / (1024 * 1024)).toFixed(2)} MB / ${(memoryUsage.total / (1024 * 1024)).toFixed(2)} MB`}
                </div>
            ) : (
                <div>Memory: Not supported</div>
            )}
        </div>
    );
};

// ANOTHER BENCHMARK

export const PerformanceMonitor = () => {
  const [renderCount, setRenderCount] = useState(0);
  const [memoryInfo, setMemoryInfo] = useState<{
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;} | null>(null); // Definir el tipo de estado correctamente
  const countRef = useRef(0);

  // Contador de renderizados
  useEffect(() => {
    countRef.current += 1;
    setRenderCount(countRef.current);
  }, []);

  // Monitoreo de memoria
  useEffect(() => {
    if (typeof window !== 'undefined' && window.performance && (window.performance as any).memory) {
        const updateMemoryInfo = () => { 
            setMemoryInfo({
                jsHeapSizeLimit: (window.performance as any).memory.jsHeapSizeLimit / (1024 * 1024),
                totalJSHeapSize: (window.performance as any).memory.totalJSHeapSize / (1024 * 1024),
                usedJSHeapSize: (window.performance as any).memory.usedJSHeapSize / (1024 * 1024),
            });
        };
      // Actualizar cada segundo, por ejemplo
      const intervalId = setInterval(updateMemoryInfo, 1000);

      // Limpieza del intervalo cuando el componente se desmonte
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '10px', zIndex: '9999' }}>
      <p>Render Count: {renderCount}</p>
      {memoryInfo && (
        <div>
          <p>Memory Usage:</p>
          <p>Heap Limit: {memoryInfo.jsHeapSizeLimit.toFixed(2)} MB</p>
          <p>Total Heap: {memoryInfo.totalJSHeapSize.toFixed(2)} MB</p>
          <p>Used Heap: {memoryInfo.usedJSHeapSize.toFixed(2)} MB</p>
        </div>
      )}
    </div>
  );
};