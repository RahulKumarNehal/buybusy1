import React, { createContext, useState } from 'react'

// Create the context
export const DataContext = createContext();

export const DataProviderContext = ({ children }) => {
    const [sharedData, setSharedData] = useState(null);
    const [purchase, setPurchase] = useState(false);
    const [cart, setCart ] = useState(null);

    return (
        <>
            <DataContext.Provider value={{ sharedData, setSharedData, purchase, setPurchase, cart, setCart }}>
                {children}
            </DataContext.Provider>
        </>
    )
}