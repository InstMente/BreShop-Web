import {
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const [open, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const paginasOcultas = ['/', '/cadastro', '/recuperacaoSenha'];
  const logado = true;
  const sair = (text) => {
    if (text === 'Sair') {
      navigate('/');
    }
  };
  const meusAnuncios = (text) => {
    if (text === 'Meus Anuncios') {
      navigate('/meusAnuncio');
    }
  };
  const registroVendas = (text) => {
    if (text === 'Registro de Vendas') {
      navigate('/registroVendas');
    }
  };
  const minhaConta = (text) => {
    if (text === 'Minha Conta') {
      navigate('/minhaConta');
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!open);
  };

  const mostrarPerfilEMenu = !paginasOcultas.includes(location.pathname);

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
                <Badge badgeContent={3} color="error">
                  <ShoppingCartIcon sx={{ color: 'whitesmoke' }} />
                </Badge>
                <IconButton
                  onClick={toggleDrawer}
                  sx={{ color: 'white', mr: 2, transition: 'all 0.3s ease-in-out' }}
                  >
                  <MenuIcon sx={{ fontSize: 34, transition: 'all 0.3s ease-in-out' }} />
                  
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

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            mt: '80px',
            width: '250px',
            height: '30vh',
            borderRadius: '1px 1px 1px 20px',
            boxSizing: 'border-box',
            p: 2,
            transition: 'all 0.3s ease-in-out'
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
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: '#e0e0e0',
              },
            }}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
  
}

export default Header;
