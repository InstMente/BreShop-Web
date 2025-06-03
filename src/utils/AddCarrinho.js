import { createContext, useState, useContext } from 'react';

const AddCarrinho = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  
  // Adicionar item ao carrinho
  const addAnuncio = (anuncio) => {
    setCartItems(prevAnuncios => {
      const existingItem = prevAnuncios.find(i => i.id === anuncio.id);
      if (existingItem) {
        return prevAnuncios.map(i =>
          i.id === anuncio.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...prevAnuncios, { ...anuncio, quantidade: 1 }];
    });
  };

  // Remover item do carrinho
  const removerAnuncio = (id) => {
    setCartItems(prevAnuncios => prevAnuncios.filter(anuncio => anuncio.id !== id));
    if (editingItem?.id === id) {
      setEditingItem(null);
    }
  };

  // Editar quantidade de um item
  const editarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade < 1) return;
    
    setCartItems(prevAnuncios =>
      prevAnuncios.map(anuncio =>
        anuncio.id === id ? { ...anuncio, quantidade: novaQuantidade } : anuncio
      )
    );
  };

  // Iniciar edição de um item
  const iniciarEdicao = (item) => {
    setEditingItem(item);
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setEditingItem(null);
  };

  // Salvar edição
  const salvarEdicao = (novaQuantidade) => {
    if (editingItem && novaQuantidade > 0) {
      editarQuantidade(editingItem.id, novaQuantidade);
      setEditingItem(null);
    }
  };

  // Limpar carrinho
  const limparCarrinho = () => {
    setCartItems([]);
    setEditingItem(null);
  };

  // Calcular total
  const calcularTotal = () => {
    return cartItems.reduce((sum, anuncio) => sum + (anuncio.price * anuncio.quantidade), 0);
  };

  // Contar itens
  const contarItens = () => {
    return cartItems.reduce((sum, item) => sum + item.quantidade, 0);
  };

  return (
    <AddCarrinho.Provider value={{
      cartItems,
      editingItem,
      addAnuncio,
      removerAnuncio,
      editarQuantidade,
      iniciarEdicao,
      cancelarEdicao,
      salvarEdicao,
      limparCarrinho,
      calcularTotal,
      contarItens
    }}>
      {children}
    </AddCarrinho.Provider>
  );
}

export function useCart() {
  const context = useContext(AddCarrinho);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}