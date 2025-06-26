import React, { createContext, useEffect, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  // Sincroniza token com localStorage
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  // Função para limpar carrinho
  const limparCarrinho = () => {
    setCarrinho([]);
  };

  // Função para logout, limpa token e usuário
  const logout = () => {
    setToken(null);
    setUser(null);
    limparCarrinho(); // opcional: limpa carrinho no logout
  };

  // Debug para ver estado no console
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
        limparCarrinho,  // adicionado aqui
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
