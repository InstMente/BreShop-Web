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
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';

function Header() {
  const [open, setDrawerOpen] = useState(false);
  const [carrinhoModalOpen, setCarrinhoModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const paginasOcultas = ['/', '/cadastro', '/recuperacaoSenha'];
  const logado = true;
  const { anuncios, setAnuncios } = useContext(GlobalContext);
  const { carrinho, setCarrinho } = useContext(GlobalContext);

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

  const menuConta = () => setDrawerOpen(!open);
  const carrinhoModal = () => setCarrinhoModalOpen(!carrinhoModalOpen);
  
  const mostrarPerfilEMenu = !paginasOcultas.includes(location.pathname);



  const total = carrinho.reduce((sum, anuncio) => sum + anuncio.valor, 0);

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
                <IconButton onClick={carrinhoModal} sx={{ color: 'white' }}>
                  <Badge badgeContent={carrinho.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  onClick={menuConta}
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
        onClose={menuConta}
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
        open={carrinhoModalOpen}
        onClose={carrinhoModal}
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
          <IconButton onClick={carrinhoModal}>
            <CloseIcon />
          </IconButton>
        </Box>

        {carrinho.length === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70%' }}>
            <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Seu carrinho está vazio
            </Typography>
          </Box>
        ) : (
          <>
            <List sx={{ mb: 2 }}>
              {carrinho.map((anuncio) => (
                <Box key={anuncio.id}>
                  <ListItem sx={{ py: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight="medium">{anuncio.titulo}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        R$ {anuncio.valor.toFixed(2)}
                      </Typography>
                    </Box>
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