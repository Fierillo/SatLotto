'use client'

import { useState, useEffect, useContext, useCallback } from 'react'
import BigInteger from "big-integer";
import { LuckyContext } from '@/providers/lucky-context';

type Block = {
  height: number
  id: number
  state: 'available' | 'frozen' | 'target'
}

export default function BlockRelay() {
  const { isMatch, isFrozen, setIsFrozen, luckyNumber, setLuckyNumber } = useContext(LuckyContext);
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [blockCount, setBlockCount] = useState<number>(0)

  const fetchBlocks = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://mempool.space/api/v1/blocks')
      if (!response.ok) {
        throw new Error('Failed to fetch blocks')
      }
      const data: Block[] = (await response.json()).slice(0,10).reverse().map((block: Block) => ({
        height: block.height,
        id: block.id,
        state: block.height % 6 === 0 ? 'target' : block.height % 6 <= 3 ? 'available' : 'frozen'
      }))
      // Update state blocks with the API data
      setBlocks(data)
      // Set blockCount to the height of the latest block
      if (data.length > 0) {
        setBlockCount(data[data.length - 1].height);
      }
      // Check if the latest block is new
      if (blocks.length > 0 && data[data.length - 1].height > blocks[blocks.length - 1].height) {
        console.log('new block detected')
        setBlockCount(prevCount => prevCount + 1)
      }
    } catch (err) {
      setError('Error al obtener datos de bloques. Por favor, inténtelo de nuevo más tarde.')
      console.error('Error fetching blocks:', err)
    } finally {
      setLoading(false)
      console.log('natural blockCount: ', blockCount)
    }
  }

  useEffect(() => {
    fetchBlocks()
    setInterval(fetchBlocks, 10000)
  }, [])

  const addTestBlock = () => {
    setBlockCount(prevCount => prevCount + 1)
    const newBlock: Block = {
      height: (blockCount + 1 || 21),
      id: Math.floor(Math.random() * 0xFFFFFF),
      state: (blockCount + 1) % 6 === 0 ? 'target' : (blockCount + 1) % 6 <= 3 ? 'available' : 'frozen'
    }
    // Update state blocks with the new block
    setBlocks(prevBlocks => [...prevBlocks, newBlock].slice(-10))
  }
  // Verify if the latest block is a frozen block, if so, activate frozen status
  useEffect(() => {
    if (blocks.length > 0 && blocks[blocks.length - 1].state === 'frozen') {
      setIsFrozen(true)
    }
  }, [blockCount])
  // Verify if the latest block is a available block, if so, desactivate frozen status
  useEffect(() => {
    if (blocks.length > 0 && blocks[blocks.length - 1].state === 'available') {
      setIsFrozen(false)
    }
  }, [blockCount])
  // Verify if the latest block is a target block, if so, calculate the lucky number
  useEffect(() => { 
    if (blockCount % 6 === 0 && blocks.length > 0) {
      setLuckyNumber((Number(BigInteger((blocks[0].id).toString(), 16))%21+1))
    }
     else{
      setLuckyNumber("...")
    }
  }, [blockCount])

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  const getConditionalStyles = () => {
    if (isMatch) {
      return "text-green-400 border-green-400";
    } else if (isFrozen) {
      return "text-gray-400 border-gray-400";
    } else {
      return "text-orange-300 border-orange-300";
    }
  };

  return (
    <div className="max-w-full">
      {/* Renders test buttons for debugging purposes */}
      <div className={`max-h-auto flex justify-between items-center mb-4`}>
        <button onClick={fetchBlocks} className="px-4 py-2 border text-blue-500 border-blue-500 rounded-md hover:bg-blue-500 hover:text-black">
          Actualizar bloques
        </button>
        <button onClick={addTestBlock} className="px-4 py-2 border text-blue-500 border-blue-500 rounded-md hover:bg-blue-500 hover:text-black">
          Agregar bloque de prueba
        </button>
      </div>
      {/* Renders the block relay */}	
      <div className={`w-full h-28 mt-4 overflow-x-auto space-x-2 p-2 flex flex-row dark:border-neutral-800 rounded-lg border ${getConditionalStyles()}`}>
        {loading ? <div className="flex h-full items-center text-2xl">Cargando bloques...</div> : blocks.map((block, index) => (
          <div
            key={block.id}
            className={`h-auto py-8 min-w-20 p-1 flex flex-col items-center justify-center rounded-lg ${ 
              block.state === 'target' ? 'bg-orange-300 text-white' :
              block.state === 'frozen' ? 'bg-gray-500 text-white' :
              'dark:border-neutral-800 text-white'
            } border ${getConditionalStyles()} shadow-sm`}
          >
            <span className="font-mono text-md md:text-xl lg:text-2xl">{block.height}</span>
            {/* Renders arrow pointing to the latest block */}
            {index === blocks.length - 1 && (
              <div className="relative border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-orange-300"></div>
            )}
            {/*<span className="text-xs w-20 text-center">
              {block.id.substring(0, 8)}...
            </span>}*/}
          </div>
        ))}
      </div>
      {/* Renders a box that shows luckynumber after target block appears in block relay */}
      <div
      className={`flex 
                  flex-col
                  mt-2 
                  items-center 
                  ${getConditionalStyles()}`}
    >
      <h2 className="text-2xl font-bold mb-4">Número de la Suerte:</h2>
      <h2
        className={`font-bold 
                    text-4xl  
                    p-2 
                    border-solid 
                    border-2 
                    rounded-lg 
                    ${getConditionalStyles()}`}
      >
        {luckyNumber}
      </h2>
    </div>
    </div>
  )
}

// BLOCKRELAY V2

export function BlockRelay2() {
  const { isMatch, isFrozen, setIsFrozen, setLuckyNumber, luckyNumber } = useContext(LuckyContext);
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [blockCount, setBlockCount] = useState<number>(0)

  const handleFetchResult = (success: boolean, data?: Block[], error?: string) => {
    setLoading(false);
    if (success) {
      setBlocks(data!);
      if (data && data.length > 0) setBlockCount(data[data.length - 1].height);
    } else {
      setError(error || 'Error al obtener datos de bloques.');
    }
  };

  const fetchBlocks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://mempool.space/api/v1/blocks');
      if (!response.ok) throw new Error('Failed to fetch blocks');
      const data: Block[] = (await response.json()).slice(0,10).reverse().map((block: any) => ({
        height: block.height,
        id: block.id,
        state: block.height % 6 === 0 ? 'target' : block.height % 6 <= 3 ? 'available' : 'frozen'
      }));
      handleFetchResult(true, data);
    } catch (err) {
      handleFetchResult(false, undefined, 'Error al obtener datos de bloques. Por favor, inténtelo de nuevo más tarde.');
      console.error('Error fetching blocks:', err);
    }
  }, []);

  useEffect(() => {
    fetchBlocks();
    const intervalId = setInterval(fetchBlocks, 10000);
    return () => clearInterval(intervalId);
  }, [fetchBlocks]);

  const addTestBlock = useCallback(() => {
    setBlockCount(prevCount => prevCount + 1);
    const newBlock: Block = {
      height: (blockCount + 1 || 21),
      id: Math.floor(Math.random() * 0xFFFFFF),
      state: (blockCount + 1) % 6 === 0 ? 'target' : (blockCount + 1) % 6 <= 3 ? 'available' : 'frozen'
    };
    setBlocks(prevBlocks => [...prevBlocks, newBlock].slice(-10));
  }, [blockCount]);

  useEffect(() => {
    if (blocks.length > 0) {
      const latestBlock = blocks[blocks.length - 1];
      setIsFrozen(latestBlock.state === 'frozen');
      if (blockCount % 6 === 0) {
        setLuckyNumber((Number(BigInteger((blocks[0].id).toString(), 16))%21+1));
      } else {
        setLuckyNumber("...");
      }
    }
  }, [blocks, blockCount, setIsFrozen, setLuckyNumber]);

  const getConditionalStyles = () => {
    if (isMatch) return "text-green-400 border-green-400";
    if (isFrozen) return "text-gray-400 border-gray-400";
    return "text-orange-300 border-orange-300";
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="max-w-full">
      {/* Renders test buttons for debugging purposes 
      <div className={`max-h-auto flex justify-between items-center mb-4`}>
        <button onClick={fetchBlocks} className="px-4 py-2 border text-blue-500 border-blue-500 rounded-md hover:bg-blue-500 hover:text-black">
          Actualizar bloques
        </button>
        <button onClick={addTestBlock} className="px-4 py-2 border text-blue-500 border-blue-500 rounded-md hover:bg-blue-500 hover:text-black">
          Agregar bloque de prueba
        </button>
      </div>*/}
      {/* Renders the block relay */}	
      <div className={`w-full h-28 mt-4 overflow-x-auto space-x-2 p-2 flex flex-row dark:border-neutral-800 rounded-lg border ${getConditionalStyles()}`}>
        {loading ? <div className="flex h-full items-center text-2xl">Cargando bloques...</div> : blocks.map((block, index) => (
          <div
            key={block.id}
            className={`h-auto py-8 min-w-20 p-1 flex flex-col items-center justify-center rounded-lg ${ 
              block.state === 'target' ? 'bg-orange-300 text-white' :
              block.state === 'frozen' ? 'bg-gray-500 text-white' :
              'dark:border-neutral-800 text-white'
            } border ${getConditionalStyles()} shadow-sm`}
          >
            <span className="font-mono text-md md:text-xl lg:text-2xl">{block.height}</span>
            {/* Renders arrow pointing to the latest block */}
            {index === blocks.length - 1 && (
              <div className="relative border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-orange-300"></div>
            )}
            {/*<span className="text-xs w-20 text-center">
              {block.id.substring(0, 8)}...
            </span>}*/}
          </div>
        ))}
      </div>
      {/* Renders a box that shows luckynumber after target block appears in block relay */}
      <div
      className={`flex 
                  flex-col
                  mt-2 
                  items-center 
                  ${getConditionalStyles()}`}
    >
      <h2 className="text-2xl font-bold mb-4">Número de la Suerte:</h2>
      <h2
        className={`font-bold 
                    text-4xl  
                    p-2 
                    border-solid 
                    border-2 
                    rounded-lg 
                    ${getConditionalStyles()}`}
      >
        {luckyNumber}
      </h2>
    </div>
    </div>
  )
}