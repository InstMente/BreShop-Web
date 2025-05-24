import {
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const paginasOcultas = ['/', '/cadastro'];

  const navigate = useNavigate();

const sair = (text) => {
  if (text === 'Sair') {
    navigate('/');
  }
};

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const mostrarPerfilEMenu = !paginasOcultas.includes(location.pathname);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '80px',
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
            <Box
              component="img"
              src="/user.png"
              alt="Usuário"
              sx={{ height: 40 }}
            />

            <IconButton
              onClick={toggleDrawer(true)}
              sx={{ color: 'white', p: 3 }}
            >
              <MenuIcon sx={{ fontSize: 34 }} />
            </IconButton>
          </Box>
        )}
      </Box>

      <Box sx={{ height: '70px' }} />

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            mt: '70px',
            width: '250px',
            height: '90vh',
            borderRadius: '20px',
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
              onClick={() => sair(text)}
              sx={{
                borderRadius: '8px',
                bgcolor: '#f5f5f5',
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
