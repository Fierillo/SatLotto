import { useRef, useEffect, useState } from 'react';

export const useRenderCount = (componentName: string) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`${componentName} renderizado: ${renderCount.current} veces`);
  });

  return renderCount.current;
};

interface BenchmarkMetrics {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  totalRenderTime: number;
  memoryUsage: number | null;
}

export function useBenchmark(componentName: string): BenchmarkMetrics {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(0);
  const totalRenderTime = useRef(0);
  const startTime = useRef(Date.now());
  const [metrics, setMetrics] = useState<BenchmarkMetrics>({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
    totalRenderTime: 0,
    memoryUsage: null,
  });

  useEffect(() => {
    const endTime = Date.now();
    const renderTime = endTime - startTime.current;

    renderCount.current += 1;
    lastRenderTime.current = renderTime;
    totalRenderTime.current += renderTime;

    const memoryUsage = (performance as any).memory?.usedJSHeapSize / (1024 * 1024);

    setMetrics({
      renderCount: renderCount.current,
      lastRenderTime: renderTime,
      averageRenderTime: totalRenderTime.current / renderCount.current,
      totalRenderTime: totalRenderTime.current,
      memoryUsage: memoryUsage || null,
    });

    console.log(`[Benchmark] ${componentName}:`, {
      renderCount: renderCount.current,
      lastRenderTime: renderTime,
      averageRenderTime: totalRenderTime.current / renderCount.current,
      totalRenderTime: totalRenderTime.current,
      memoryUsage: memoryUsage ? `${memoryUsage.toFixed(2)} MB` : 'No disponible',
    });

    startTime.current = Date.now(); // Reset para el próximo render

    return () => {
      // Cleanup si es necesario
    };
  });

  return metrics;
}