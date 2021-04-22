import React, { useState, createContext, useContext, useEffect } from 'react';

export const ShoppingCartContext = createContext({});

function ShoppingCartProvider({ children }) {
    const[listProduct, setListProduct] = useState([])
    
    
    return (
        <ShoppingCartContext.Provider value={{listProduct, setListProduct}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartProvider;