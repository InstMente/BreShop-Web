import React, { createContext, useContext, useEffect, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  // Estados já existentes
  const [anuncios, setAnuncios] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  // Estados para autenticação
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  // Sincroniza token com localStorage
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  // Função para logout, limpa tudo
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // Só debug (opcional)
  useEffect(() => {
    console.log('Anúncios:', anuncios);
    console.log('Carrinho:', carrinho);
    console.log('Token:', token);
    console.log('Usuário:', user);
  }, [anuncios, carrinho, token, user]);

  return (
    <GlobalContext.Provider
      value={{
        anuncios,
        setAnuncios,
        carrinho,
        setCarrinho,
        token,
        setToken,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
