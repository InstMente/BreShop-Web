import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Container, Stack, Typography, Divider, Chip } from '@mui/material';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';
import GlobalContext from '../../context/GlobalContext';

function PaginaAnuncio() {
  const location = useLocation();
  const navigate = useNavigate();
  const anuncio = location.state?.anuncio;
  const { carrinho, setCarrinho } = useContext(GlobalContext);

  const [usuario, setUsuario] = useState(null);
  const [loadingUsuario, setLoadingUsuario] = useState(false);
  const [erroUsuario, setErroUsuario] = useState(null);

  useEffect(() => {
    async function buscarUsuario() {
      if (!anuncio) return;
      const userId = anuncio.usuario_id || anuncio.usuarioId;
      if (!userId) return;

      setLoadingUsuario(true);
      setErroUsuario(null);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://breshopbackend.onrender.com/usuarios/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsuario(response.data);
      } catch (error) {
        console.error('Erro ao buscar vendedor:', error);
        setErroUsuario('Erro ao carregar informações do vendedor.');
        setUsuario(null);
      } finally {
        setLoadingUsuario(false);
      }
    }

    buscarUsuario();
  }, [anuncio]);

  if (!anuncio) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5', overflowX: 'hidden' }}>
        <Header />
        <Box sx={{ flexGrow: 1, p: 3, textAlign: 'center', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>
            Nenhum anúncio selecionado.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')} sx={{ backgroundColor: '#3483fa', '&:hover': { backgroundColor: '#2968c8' }, textTransform: 'none', fontSize: '0.875rem', px: 3, py: 1 }}>
            Voltar à página inicial
          </Button>
        </Box>
        <Footer />
      </Box>
    );
  }

  const adicionarCarrinho = (anuncio) => {
    setCarrinho((novoCarrinho) => {
      const existeIndex = novoCarrinho.findIndex((item) => item.id === anuncio.id);
      if (existeIndex > -1) {
        const carrinhoAtualizado = [...novoCarrinho];
        carrinhoAtualizado[existeIndex] = {
          ...carrinhoAtualizado[existeIndex],
          quantidade: carrinhoAtualizado[existeIndex].quantidade + 1
        };
        return carrinhoAtualizado;
      } else {
        return [...novoCarrinho, { ...anuncio, quantidade: 1 }];
      }
    });
  };

  const { titulo, descricao, preco, foto } = anuncio;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5', overflowX: 'hidden', position: 'relative' }}>
      <Header />

      <Button
        sx={{
          position: 'fixed',
          top: '80px',
          left: '20px',
          color: 'white',
          p: 1,
          borderRadius: '6px',
          zIndex: 1000,
          textTransform: 'none',
          fontSize: '0.875rem',
          backgroundColor: '#003566',
          backdropFilter: 'blur(4px)',
          '&:hover': { backgroundColor: 'rgb(15, 70, 122)' },
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: '16px' }} />
        Voltar
      </Button>

      <Box sx={{ flexGrow: 1, p: 3, mt: 4, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <Stack spacing={3} sx={{ width: '100%' }}>
          <Container
            maxWidth={false}
            sx={{
              display: 'flex',
              borderRadius: '8px',
              p: { xs: 2, md: 4 },
              backgroundColor: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                width: { xs: '100%', md: '50%' },
                minHeight: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#f9f9f9',
                borderRadius: '4px',
                p: 2,
                overflow: 'hidden'
              }}
            >
              <Box
                component="img"
                src={foto}
                alt="img-produto"
                sx={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', mixBlendMode: 'multiply' }}
              />
            </Box>

            <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" sx={{ color: '#212121', fontWeight: '600', mb: 2, fontSize: { xs: '24px', md: '28px' }, lineHeight: '1.3' }}>
                {titulo}
              </Typography>
              <Chip label="Novo" color="success" size="small" sx={{ alignSelf: 'flex-start', mb: 1, fontSize: '0.75rem', fontWeight: '600' }} />

              <Typography variant="h3" sx={{ color: '#212121', fontWeight: '400', mb: 3, fontSize: { xs: '28px', md: '32px' }, letterSpacing: '0.5px' }}>
                {`R$ ${Number(preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" sx={{ color: '#424242', mb: 3, fontSize: '16px', lineHeight: '1.6', wordBreak: 'break-word' }}>
                {descricao}
              </Typography>

              <Box sx={{ mt: 'auto', pt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: '#003566', color: '#fff', py: 1.5, borderRadius: '4px', fontSize: '16px', textTransform: 'none', fontWeight: '500', '&:hover': { backgroundColor: 'rgb(25, 67, 131)' } }}
                  onClick={() => adicionarCarrinho(anuncio)}
                >
                  Adicionar ao carrinho
                </Button>
              </Box>
            </Box>
          </Container>

          <Container
            maxWidth={false}
            sx={{
              display: 'flex',
              borderRadius: '8px',
              p: { xs: 2, md: 4 },
              backgroundColor: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <Typography variant="h5" sx={{ color: '#212121', fontWeight: '500', fontSize: '20px' }}>
              Informações do vendedor
            </Typography>

            <Divider />

            {loadingUsuario && <Typography>Carregando informações do vendedor...</Typography>}
            {erroUsuario && <Typography color="error">{erroUsuario}</Typography>}

            {usuario && (
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                <Box sx={{ flex: 1 }}>
                  <Stack spacing={2.5}>
                    <Box>
                      <Typography sx={{ color: '#757575', fontSize: '14px', fontWeight: '500', mb: 0.5 }}>Nome</Typography>
                      <Typography sx={{ color: '#212121', fontSize: '16px', fontWeight: '400' }}>{usuario.nome}</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: '#757575', fontSize: '14px', fontWeight: '500', mb: 0.5 }}>Email</Typography>
                      <Typography sx={{ color: '#212121', fontSize: '16px', fontWeight: '400' }}>{usuario.email}</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: '#757575', fontSize: '14px', fontWeight: '500', mb: 0.5 }}>Telefone</Typography>
                      <Typography sx={{ color: '#212121', fontSize: '16px', fontWeight: '400' }}>{usuario.telefone || usuario.numero || 'Não informado'}</Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Stack spacing={2.5}>
                    <Box>
                      <Typography sx={{ color: '#757575', fontSize: '14px', fontWeight: '500', mb: 0.5 }}>Cidade</Typography>
                      <Typography sx={{ color: '#212121', fontSize: '16px', fontWeight: '400' }}>{usuario.cidade}</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: '#757575', fontSize: '14px', fontWeight: '500', mb: 0.5 }}>Endereço</Typography>
                      <Typography sx={{ color: '#212121', fontSize: '16px', fontWeight: '400' }}>{usuario.rua || 'Não informado'}</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: '#757575', fontSize: '14px', fontWeight: '500', mb: 0.5 }}>CEP</Typography>
                      <Typography sx={{ color: '#212121', fontSize: '16px', fontWeight: '400' }}>{usuario.cep || 'Não informado'}</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            )}
          </Container>
        </Stack>
      </Box>

      <Footer />
    </Box>
  );
}

export default PaginaAnuncio;
