import { Box, Button, Container, Stack, TextField, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import Footer from "../../componentes/Footer/Footer";
import Header from "../../componentes/Header/Header";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PaginaMeusAnuncio() {
  const navigate = useNavigate();
  const [meusAnuncios, setMeusAnuncios] = useState([]);

  useEffect(() => {
    const buscarMeusAnuncios = async () => {
      const email = localStorage.getItem('user');
      if (!email) return alert('Usuário não autenticado');

      try {
        const resUsuario = await axios.get(`https://breshopbackend.onrender.com/usuarios/email/${email}`);
        const usuarioId = resUsuario.data.id;

        const res = await axios.get(`https://breshopbackend.onrender.com/anuncios/usuario/${usuarioId}`);
        setMeusAnuncios(res.data);
      } catch (err) {
        console.error(err);
        alert('Erro ao buscar seus anúncios');
      }
    };

    buscarMeusAnuncios();
  }, []);

  const deletarAnuncio = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este anúncio?')) return;
    try {
      await axios.delete(`https://breshopbackend.onrender.com/anuncios/${id}`);
      setMeusAnuncios(prev => prev.filter(a => a.id !== id));
      alert('Anúncio excluído com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir anúncio');
    }
  };

  return (
    <Box sx={{ m: 0, p: 0, height: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <Header />

      <Box flexGrow={1} sx={{ pb: 2, pt: 1 }}>
        <Button
          sx={{
            width: '9%',
            top: 10,
            color: '#003566',
            borderRadius: '8px',
            zIndex: 10
          }}
          onClick={() => navigate('/home')}
        >
          <ArrowBackIosNewIcon sx={{ ml: 2, color: '#003566', fontSize: '25px', mr: 1 }} />
          Voltar
        </Button>

        <Container sx={{ mt: 2 }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#003566' }}>Meus Anúncios</Typography>
          <Grid container spacing={3}>
            {meusAnuncios.map((anuncio) => (
              <Grid item xs={12} sm={6} md={4} key={anuncio.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '8px', boxShadow: 2 }}>
                  {anuncio.foto && (
                    <CardMedia
                      component="img"
                      image={anuncio.foto}
                      alt={anuncio.titulo}
                      sx={{ height: 200, objectFit: 'cover' }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{anuncio.titulo}</Typography>
                    <Typography variant="body2" gutterBottom>{anuncio.descricao}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>R$ {Number(anuncio.preco).toFixed(2)}</Typography>
                  </CardContent>
                  <Stack direction="row" spacing={2} sx={{ p: 2, pt: 0 }}>
                    <Button fullWidth sx={{ backgroundColor: '#CC5500', color: 'white' }}>
                      Editar
                    </Button>
                    <Button
                      fullWidth
                      onClick={() => deletarAnuncio(anuncio.id)}
                      sx={{ backgroundColor: 'rgba(240, 15, 15, 0.81)', color: 'white' }}
                    >
                      Deletar
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default PaginaMeusAnuncio;
