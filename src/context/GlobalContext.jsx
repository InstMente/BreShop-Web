import React, { createContext, useContext, useEffect, useState } from 'react'

export const GlobalContext = createContext()

export const  GlobalContextProvider= ({children}) => {
  
    const [anuncios, setAnuncios] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
useEffect(() => {
    console.log(anuncios);
    console.log(carrinho);
    
    
}, [anuncios, carrinho])

    return (
    <GlobalContext.Provider value={{
        anuncios,
        setAnuncios,
        carrinho,
        setCarrinho
    }}
    >
        {children}

    </GlobalContext.Provider>
  )
}

export default GlobalContext