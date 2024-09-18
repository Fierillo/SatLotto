import React, { createContext, useContext, useRef } from 'react';

const RenderCountContext = createContext({ renderCount: 0, increment: () => {} });

export const RenderCountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const renderCount = useRef(0);

    const increment = () => {
        renderCount.current += 1;
    };

    return (
        <RenderCountContext.Provider value={{ renderCount: renderCount.current, increment }}>
            {children}
        </RenderCountContext.Provider>
    );
};

export const useRenderCount = () => useContext(RenderCountContext);