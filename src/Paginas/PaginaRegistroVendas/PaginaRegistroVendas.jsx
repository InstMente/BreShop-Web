import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import Footer from "../../componentes/Footer/Footer";
import Header from "../../componentes/Header/Header";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function PaginaRegistroVendas() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const anuncio = state?.anuncio;

  const [loading, setLoading] = useState(false);
  const [compradorId, setCompradorId] = useState(null);
  const [compradorEmail, setCompradorEmail] = useState('');

  useEffect(() => {
    // Pega email do localStorage e busca id do usuário
    const email = localStorage.getItem('user');
    if (!email) {
      alert('Usuário não autenticado.');
      navigate('/');
      return;
    }
    setCompradorEmail(email);

    async function buscarUsuario() {
      try {
        const res = await axios.get(`http://localhost:3001/usuarios/email/${email}`);
        if (res.data?.id) {
          setCompradorId(res.data.id);
        } else {
          alert('Usuário não encontrado no sistema.');
          navigate('/');
        }
      } catch (error) {
        console.error('Erro ao buscar usuário pelo email:', error);
        alert('Erro no servidor ao buscar usuário.');
        navigate('/');
      }
    }
    buscarUsuario();
  }, [navigate]);

  if (!anuncio) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Dados do anúncio não encontrados.</Typography>
        <Button onClick={() => navigate('/home')}>Voltar</Button>
      </Box>
    );
  }

  const handleRegistrarVenda = async () => {
    if (!compradorId) {
      alert('Comprador ainda não carregado.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/compras', {
        anuncioId: anuncio.id,
        compradorId: compradorId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert(response.data.mensagem || 'Venda registrada com sucesso!');
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert('Erro ao registrar venda.');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ m: 0, p: 0, height: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <Header />
      <Box flexGrow={1} sx={{ p: 3 }}>
        <Button
          sx={{
            width: '9%',
            top: 10,
            color: '#003566',
            borderRadius: '8px',
            zIndex: 10,
            mb: 2
          }}
          onClick={() => navigate('/home')}
        >
          <ArrowBackIosNewIcon
            sx={{ ml: 2, color: '#003566', fontSize: '25px', mr: 1 }}
          />
          Voltar
        </Button>

        <Container
          sx={{
            mt: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            background: 'linear-gradient(195deg, #003566 50%,rgb(43, 36, 33) 100%)',
            borderRadius: '16px',
            padding: 4
          }}
        >
          <Box
            component='img'
            src={anuncio.foto || "/image.png"}
            alt={anuncio.titulo}
            sx={{ width: '30%', borderRadius: '12px', objectFit: 'contain' }}
          />

          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '65%', height: '100%' }}>
            <Stack spacing={3} sx={{ width: '100%', height: '100%', flexDirection: 'column' }}>
              <TextField
                disabled
                label='Título:'
                type="text"
                value={anuncio.titulo}
                sx={{ backgroundColor: 'white', borderRadius: '12px' }}
              />
              <TextField
                disabled
                label='Descrição:'
                type="text"
                multiline
                value={anuncio.descricao}
                sx={{ backgroundColor: 'white', borderRadius: '12px' }}
              />
              <TextField
                disabled
                label="Preço:"
                type="number"
                value={Number(anuncio.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                sx={{ backgroundColor: 'white', borderRadius: '12px' }}
              />
              <TextField
                disabled
                label="Comprador (email):"
                type="text"
                value={compradorEmail}
                sx={{ backgroundColor: 'white', borderRadius: '12px' }}
              />

              <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: '#003566', ":hover": { backgroundColor: 'rgb(10, 72, 131)' } }}
                onClick={handleRegistrarVenda}
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Registrar Venda'}
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default PaginaRegistroVendas;
