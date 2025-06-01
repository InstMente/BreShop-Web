import {
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Button,
  Typography,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const [open, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const paginasOcultas = ['/', '/cadastro', '/recuperacaoSenha'];
  const logado = true;
  
  // Funções de navegação
  const sair = (text) => {
    if (text === 'Sair') navigate('/');
  };
  const meusAnuncios = (text) => {
    if (text === 'Meus Anuncios') navigate('/meusAnuncio');
  };
  const registroVendas = (text) => {
    if (text === 'Registro de Vendas') navigate('/registroVendas');
  };
  const minhaConta = (text) => {
    if (text === 'Minha Conta') navigate('/minhaConta');
  };

  const toggleMenu = () => setDrawerOpen(!open);
  const toggleCart = () => setCartOpen(!cartOpen);
  
  const mostrarPerfilEMenu = !paginasOcultas.includes(location.pathname);

  // Dados de exemplo para o carrinho
  const cartItems = [
    { id: 1, name: 'Produto 1', price: 99.90, quantity: 2 },
    { id: 2, name: 'Produto 2', price: 49.90, quantity: 1 },
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '12%',
          backgroundColor: '#003566',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1300,
        }}
      >
        <Box
          component="img"
          src="/image.png"
          alt="Logo da empresa"
          sx={{ height: 50 }}
        />

        {mostrarPerfilEMenu && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {logado ? (
              <>
                <IconButton onClick={toggleCart} sx={{ color: 'white' }}>
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  onClick={toggleMenu}
                  sx={{ color: 'white', mr: 2 }}
                >
                  <MenuIcon sx={{ fontSize: 34 }} />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate('/')}
                  sx={{ color: 'white', border: '1px solid white', borderRadius: 2 }}
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => navigate('/cadastro')}
                  sx={{ color: 'white', border: '1px solid white', borderRadius: 2 }}
                >
                  Cadastrar
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>

      <Box sx={{ height: '70px' }} />

      {/* Drawer do Menu */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleMenu}
        PaperProps={{
          sx: {
            mt: '80px',
            width: '250px',
            height: '40vh',
            borderRadius: '1px 1px 1px 20px',
            boxSizing: 'border-box',
            p: 2,
          },
        }}
      >
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {['Minha Conta', 'Registro de Vendas', 'Meus Anuncios', 'Sair'].map((text) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                if (text === 'Sair') sair(text);
                if (text === 'Meus Anuncios') meusAnuncios(text);
                if (text === 'Registro de Vendas') registroVendas(text);
                if (text === 'Minha Conta') minhaConta(text);
              }}
              sx={{
                borderRadius: '8px',
                bgcolor: '#f5f5f5',
                '&:hover': { bgcolor: '#e0e0e0' },
              }}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Drawer do Carrinho */}
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={toggleCart}
        PaperProps={{
          sx: {
            mt: '80px',
            width: { xs: '90%', sm: '60%', md: '50%' },
            height: { xs: '60%', sm: '70%', md: '80%' },
            maxWidth: '600px',
            maxHeight: '800px',
            borderRadius: '1px 1px 1px 20px',
            boxSizing: 'border-box',
            p: 3,
            overflow: 'auto',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            Carrinho de Compras
          </Typography>
          <IconButton onClick={toggleCart}>
            <CloseIcon />
          </IconButton>
        </Box>

        {cartItems.length === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70%' }}>
            <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Seu carrinho está vazio
            </Typography>
          </Box>
        ) : (
          <>
            <List sx={{ mb: 2 }}>
              {cartItems.map((item) => (
                <Box key={item.id}>
                  <ListItem sx={{ py: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight="medium">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.quantity} x R$ {item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography fontWeight="medium">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>

            <Box sx={{ mt: 'auto', pt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" fontWeight="bold">
                  R$ {total.toFixed(2)}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ py: 1.5, backgroundColor: '#003566', '&:hover': { backgroundColor: '#002244' } }}
              >
                Finalizar Compra
              </Button>
            </Box>
          </>
        )}
      </Drawer>
    </>
  );
}

export default Header;