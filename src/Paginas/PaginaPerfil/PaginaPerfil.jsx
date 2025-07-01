import { Box, Button, Container, Stack, TextField, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function PaginaPerfil() {
  const [modalTipo, setModalTipo] = useState(''); 
  const navigate = useNavigate();

  const handleDesativar = async () => {
  try {
    const payload = {
      ...usuario,
      ativo: false,
    };

    const { data } = await axios.put(
      `https://breshopbackend.onrender.com/usuarios/${usuario.id}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.info('Conta desativada com sucesso. Para reativar, entre em contato com o suporte: (48) 96726-930');
    navigate('/');
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.mensagem || 'Erro ao desativar conta.');
  }
};


  const handleExcluir = async () => {
    try {
      await axios.delete(`https://breshopbackend.onrender.com/usuarios/${usuario.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.info('Conta excluída com sucesso.');
      localStorage.clear();
      navigate('/');
    } catch (error) {
      toast.error('Erro ao excluir conta.');
    }
  };

  const [usuario, setUsuario] = useState({
    id: '', nome: '', email: '', telefone: '', datanascimento: '', cpf: '',
    cep: '', cidade: '', bairro: '', rua: '', numerocasa: '', foto: ''
  });

  const [senhaInput, setSenhaInput] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState({ ...usuario });
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("user");

  useEffect(() => {
    const buscarUsuario = async () => {
      if (!email) {
        toast.info('Email não encontrado. Faça login novamente.');
        navigate('/');
        return;
      }

      try {
        const { data } = await axios.get(
          `https://breshopbackend.onrender.com/usuarios/email/${email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsuario(data);
        setUsuarioEdit(data);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        toast.error('Erro ao carregar dados do usuário.');
      }
    };

    buscarUsuario();
  }, [email, navigate, token]);

  const handleOpen = (tipo) => {
    setSenhaInput('');
    setModalTipo(tipo);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioEdit({ ...usuarioEdit, [name]: value });
  };

  const handleSave = async () => {
    const payload = {
      ...usuarioEdit,
      senha: senhaInput.trim() !== '' ? senhaInput : undefined
    };

    try {
      const { data } = await axios.put(
        `https://breshopbackend.onrender.com/usuarios/${usuario.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.info('Perfil atualizado com sucesso');
      setUsuario(usuarioEdit);
      setOpenModal(false);
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      toast.error(error.response?.data?.mensagem || 'Erro ao salvar alterações.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Button
        sx={{
          position: 'fixed', top: '5vh', left: '2vw', color: 'white', p: 1,
          borderRadius: '6px', zIndex: 1000, textTransform: 'none', fontSize: '0.875rem',
          backgroundColor: '#003566', backdropFilter: 'blur(4px)',
          '&:hover': { backgroundColor: 'rgb(15, 70, 122)' }, display: 'flex', alignItems: 'center', gap: '4px'
        }}
        onClick={() => navigate('/home')}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: '16px' }} /> Voltar
      </Button>

      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Container sx={{
          maxWidth: 'sm', mx: 'auto', backgroundColor: 'white',
          boxShadow: 1, borderRadius: '10px', width: '100%'
        }}>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={2} alignItems="center">
              <Typography variant="h5" fontWeight={800} color="#003566">Meu Perfil</Typography>
              <Box component='img' src={usuario.foto || '/user.png'} sx={{ width: '100%', maxWidth: '200px', aspectRatio: '1', borderRadius: '50%', objectFit: 'cover' }} />
            </Stack>
          </Box>

          <Stack spacing={2} sx={{ p: 2 }}>
            {['nome', 'email', 'telefone', 'datanascimento', 'cpf', 'cep', 'cidade', 'bairro', 'rua', 'numerocasa'].map((field, i) => (
              <TextField
                key={i}
                disabled
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={usuario[field] || ''}
                type={field === 'datanascimento' ? 'date' : 'text'}
                sx={{ width: '100%' }}
                InputLabelProps={field === 'datanascimento' ? { shrink: true } : {}}
              />
            ))}
            <TextField disabled label="Senha" type="password" value={'********'} fullWidth />
            <Stack spacing={1}>
              <Button onClick={() => handleOpen('editar')} variant="contained" sx={{ backgroundColor: '#003566' }}>Editar Perfil</Button>
              <Button onClick={() => handleOpen('desativar')} variant="outlined" color="warning">Desativar Conta</Button>
              <Button onClick={() => handleOpen('excluir')} variant="outlined" color="error">Excluir Conta</Button>
              <Button onClick={() => navigate('/home')} variant="outlined" backgroundColor="#003566">voltar</Button>
            </Stack>
          </Stack>

        </Container>
      </Box>

      <Modal open={openModal} onClose={handleClose}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto',
          bgcolor: 'white', boxShadow: 24, borderRadius: 2, p: 4
        }}>
          {modalTipo === 'editar' && (
            <>
              <Typography variant="h6" mb={2}>Editar Perfil</Typography>
              <Button variant="outlined" component="label">
                Alterar Foto
                <input type="file" accept="image/*" hidden onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setUsuarioEdit({ ...usuarioEdit, foto: reader.result });
                    reader.readAsDataURL(file);
                  }
                }} />
              </Button>
              {usuarioEdit.foto && (
                <Box component="img" src={usuarioEdit.foto} sx={{ width: '100%', maxHeight: '200px', borderRadius: '10px', mt: 2, objectFit: 'cover' }} />
              )}
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <Stack spacing={2} mt={2}>
                  {['nome', 'email', 'telefone', 'datanascimento', 'cpf', 'cep', 'cidade', 'bairro', 'rua', 'numerocasa'].map((field, i) => (
                    <TextField
                      key={i}
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      type={field === 'datanascimento' ? 'date' : 'text'}
                      value={usuarioEdit[field] || ''}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={field === 'datanascimento' ? { shrink: true } : {}}
                    />
                  ))}
                  <TextField label="Senha" name="senha" type="password" value={senhaInput} onChange={(e) => setSenhaInput(e.target.value)} fullWidth />
                  <Button type='submit' variant="contained" sx={{ backgroundColor: '#003566', color: 'white' }}>Salvar</Button>
                </Stack>
              </form>
            </>
          )}

          {modalTipo === 'desativar' && (
            <>
              <Typography variant="h6" mb={2}>Tem certeza que deseja desativar sua conta?</Typography>
              <Typography>Email: {usuario.email}</Typography>
              <Typography>Usuário: {usuario.nome}</Typography>
              <Typography>ID: {usuario.id}</Typography>
              <Stack mt={3} spacing={2} direction="row">
                <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" color="warning" onClick={handleDesativar}>Desativar</Button>
              </Stack>
            </>
          )}

          {modalTipo === 'excluir' && (
            <>
              <Typography variant="h6" mb={2}>Tem certeza que deseja excluir permanentemente sua conta?</Typography>
              <Typography>Esta ação é irreversível e apagará todos os dados do seu usuário.</Typography>
              <Typography mt={2}>ID: {usuario.id}</Typography>
              <Typography>Email: {usuario.email}</Typography>
              <Typography>Usuário: {usuario.nome}</Typography>
              <Typography>Telefone: {usuario.telefone}</Typography>
              <Typography>CPF: {usuario.cpf}</Typography>
              <Typography>Cidade: {usuario.cidade}</Typography>
              <Typography>Bairro: {usuario.bairro}</Typography>
              <Typography>Rua: {usuario.rua}, Nº {usuario.numerocasa}</Typography>
              <Stack mt={3} spacing={2} direction="row">
                <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" color="error" onClick={handleExcluir}>Excluir</Button>
              </Stack>
            </>
          )}
        </Box>
      </Modal>

      <Footer />
    </Box>
  );
}

export default PaginaPerfil;
