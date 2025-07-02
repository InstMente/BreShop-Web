import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Footer from "../../componentes/Footer/Footer";
import Header from "../../componentes/Header/Header";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PaginaMeusAnuncio() {
  const navigate = useNavigate();
  const [meusAnuncios, setMeusAnuncios] = useState([]);
  const [usuario_id, setUsuario_id] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [anuncioEdit, setAnuncioEdit] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    preco: "",
    foto: "",
  });

  useEffect(() => {
    const buscarMeusAnuncios = async () => {
      const email = localStorage.getItem('user');
      if (!email) return alert('Usuário não autenticado');

      try {
        const resUsuario = await axios.get(`https://breshopbackend.onrender.com/usuarios/email/${email}`);
        const id = resUsuario.data.id;
        setUsuario_id(id);
        console.log(id)

        const res = await axios.get(`https://breshopbackend.onrender.com/anuncios/usuario/${id}`);
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

  const abrirEditar = (anuncio) => {
    setAnuncioEdit(anuncio);
    setFormData({
      titulo: anuncio.titulo,
      descricao: anuncio.descricao,
      preco: anuncio.preco,
      foto: anuncio.foto || "",
    });
    setOpenEdit(true);
  };

  const fecharEditar = () => {
    setOpenEdit(false);
    setAnuncioEdit(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const salvarEdicao = async () => {
    if (!formData.titulo || !formData.descricao || !formData.preco) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const precoNum = Number(formData.preco);
      if (isNaN(precoNum) || precoNum < 0) {
        alert("Preço inválido.");
        return;
      }

      await axios.put(`https://breshopbackend.onrender.com/anuncios/${anuncioEdit.id}`, {
        titulo: formData.titulo,
        descricao: formData.descricao,
        preco: precoNum,
        foto: formData.foto,
        usuario_id: usuario_id,
        ativo: true
      });


      setMeusAnuncios(prev =>
        prev.map(a =>
          a.id === anuncioEdit.id
            ? { ...a, titulo: formData.titulo, descricao: formData.descricao, preco: precoNum }
            : a
        )
      );

      alert("Anúncio atualizado com sucesso!");
      fecharEditar();
    } catch (error) {
      console.error('Erro na requisição:', error);
      if (error.response) {
        console.error('Resposta do servidor:', error.response.data);
        alert(`Erro: ${error.response.data.mensagem || 'Erro desconhecido no servidor'}`);
      } else if (error.request) {
        console.error('Nenhuma resposta recebida:', error.request);
        alert('Servidor não respondeu');
      } else {
        console.error('Erro ao montar requisição:', error.message);
        alert(`Erro: ${error.message}`);
      }
    }
  };

  return (
    <Box sx={{ m: 0, p: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
                    <Button
                      fullWidth
                      sx={{ backgroundColor: '#CC5500', color: 'white' }}
                      onClick={() => abrirEditar(anuncio)}
                    >
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

      {/* Modal de edição */}
      <Dialog open={openEdit} onClose={fecharEditar} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Anúncio</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            name="titulo"
            fullWidth
            margin="normal"
            value={formData.titulo}
            onChange={handleChange}
          />
          <TextField
            label="Descrição"
            name="descricao"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={formData.descricao}
            onChange={handleChange}
          />
          <TextField
            label="Preço"
            name="preco"
            type="number"
            fullWidth
            margin="normal"
            value={formData.preco}
            onChange={handleChange}
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            label="Foto (base64)"
            name="foto"
            fullWidth
            margin="normal"
            value={formData.foto}
            disabled
          />
          {formData.foto && (
            <Box
              component="img"
              src={formData.foto.startsWith('data:image') ? formData.foto : `data:image/jpeg;base64,${formData.foto}`}
              alt="Preview"
              sx={{ mt: 2, width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharEditar} color="inherit">Cancelar</Button>
          <Button onClick={salvarEdicao} variant="contained" color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PaginaMeusAnuncio;
