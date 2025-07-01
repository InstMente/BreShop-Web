import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GlobalContext from '../../context/GlobalContext';
import { decodeToken } from 'react-jwt';
import { toast } from 'react-toastify';

function PaginaLogin() {
  const { setToken, setUser } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !senha) {
      toast.error('Por favor, preencha todos os campos!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://breshopbackend.onrender.com/usuarios/login', { email, senha });

      const { token } = response.data;

      setToken(token);

      const usuario = decodeToken(token);
      setUser(usuario);

      localStorage.setItem('token', token);
      localStorage.setItem('user', usuario.email); // ✅ corrigido aqui

      toast.info('Login realizado com sucesso!');
      navigate('/Home');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.mensagem || 'Erro no login. Verifique seus dados.');
      } else {
        toast.error('Erro na conexão com o servidor.');
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

return (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
    <Header />
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 10 }, overflowY: 'auto' }}>
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: '#F2F0EF',
          boxShadow: '4px 4px 4px rgba(0,0,0,0.1)',
          borderRadius: '10px',
          px: { xs: 2, sm: 4 },
          py: 4,
        }}
      >
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 800,
              color: '#003566',
              textAlign: 'center',
            }}
          >
            LOGIN
          </Typography>

          <TextField
            required
            label="Email:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            required
            label="Senha:"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            fullWidth
          />

          <Typography sx={{ color: '#003566', textAlign: 'center' }}>
            Esqueceu a senha? <a style={{ color: '#003566', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/recuperacaosenha')}>Clique Aqui</a>
          </Typography>

          <Stack sx={{ width: '100%', gap: 2 }}>
            <Button
               type="submit"
              sx={{ backgroundColor: '#00509d', '&:hover': { backgroundColor: '#003566' } }}
              variant="contained"
              disabled={loading}
              fullWidth
            >
              {loading ? 'Entrando...' : 'Logar'}
            </Button>
            <Typography
              sx={{ color: '#003566', textAlign: 'center' }}
            >
              Não possui conta? <a style={{ color: '#003566', textDecoration:'underline', cursor: 'pointer' }} onClick={() => navigate('/cadastro')}>Cadastre-se</a>
            </Typography>
          </Stack>
        </Stack>
        </form>
      </Container>
    </Box>
    <Footer />
  </Box>
);

}

export default PaginaLogin;
