import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import Footer from "../../componentes/Footer/Footer";
import Header from "../../componentes/Header/Header";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function PaginaRegistroVendas() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [anuncios, setAnuncios] = useState([]);
  const [precos, setPrecos] = useState({}); // objeto com chave = anuncio.id e valor = preco

  useEffect(() => {
    const email = localStorage.getItem('user');
    if (!email) {
      alert('Usuário não autenticado.');
      navigate('/');
      return;
    }

    async function buscarUsuarioEAnuncios() {
      try {
        const resUsuario = await axios.get(`http://localhost:3001/usuarios/email/${email}`);
        const userId = resUsuario.data?.id;
        if (!userId) throw new Error('Usuário não encontrado');

        const resAnuncios = await axios.get(`http://localhost:3001/anuncios/vendidos/${userId}`);
        const anunciosVendidos = resAnuncios.data;

        if (anunciosVendidos.length > 0) {
          setAnuncios(anunciosVendidos);

          // Buscar o preço de cada anúncio vendido
          anunciosVendidos.forEach(async anuncio => {
            try {
              const res = await axios.post('http://localhost:3001/compras/consultar', {
                anuncio_id: anuncio.id
              });

              if (res.data && res.data.preco) {
                setPrecos(prev => ({
                  ...prev,
                  [anuncio.id]: res.data.preco
                }));
              }
            } catch (err) {
              console.error(`Erro ao buscar venda do anúncio ${anuncio.id}`, err);
            }
          });
        } else {
          alert('Nenhum anúncio vendido encontrado.');
          navigate('/home');
        }
      } catch (error) {
        console.error('Erro ao buscar usuário ou anúncios:', error);
        alert('Erro ao carregar dados.');
        navigate('/home');
      }
    }

    buscarUsuarioEAnuncios();
  }, [navigate]);

  return (
    <Box sx={{ m: 0, p: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box flexGrow={1} sx={{ p: 3 }}>
        <Button
          sx={{
            width: '9%',
            color: '#003566',
            borderRadius: '8px',
            mb: 2
          }}
          onClick={() => navigate('/home')}
        >
          <ArrowBackIosNewIcon sx={{ ml: 2, color: '#003566', fontSize: '25px', mr: 1 }} />
          Voltar
        </Button>

        {anuncios.map(anuncio => (
          <Container key={anuncio.id} sx={{
            mt: 2,
            mb: 4,
            display: 'flex',
            justifyContent: 'space-around',
            background: 'linear-gradient(195deg, #003566 50%, rgb(43, 36, 33) 100%)',
            borderRadius: '16px',
            padding: 4
          }}>
            <Box
              component='img'
              src={anuncio.foto || "/image.png"}
              alt={anuncio.titulo}
              sx={{ width: '30%', borderRadius: '12px', objectFit: 'contain' }}
            />

            <Box sx={{ p: 2, width: '65%' }}>
              <Stack spacing={3}>
                <TextField
                  disabled
                  label='Título:'
                  value={anuncio.titulo}
                  sx={{ backgroundColor: 'white', borderRadius: '12px' }}
                />
                <TextField
                  disabled
                  label='Descrição:'
                  multiline
                  value={anuncio.descricao}
                  sx={{ backgroundColor: 'white', borderRadius: '12px' }}
                />
                <TextField
                  disabled
                  label='Preço:'
                  value={Number(anuncio.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  sx={{ backgroundColor: 'white', borderRadius: '12px' }}
                />

              </Stack>
            </Box>
          </Container>
        ))}
      </Box>
      <Footer />
    </Box>
  );
}

export default PaginaRegistroVendas;
