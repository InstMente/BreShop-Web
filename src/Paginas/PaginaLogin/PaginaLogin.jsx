import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GlobalContext from '../../context/GlobalContext';
import { decodeToken } from 'react-jwt';
function PaginaLogin() {
  const { setToken, setUser } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/usuarios/login', { email, senha });

      const { token } = response.data;

      setToken(token);

      const usuario = decodeToken(token);
      setUser(usuario);

      alert('Login realizado com sucesso!');
      navigate('/Home');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem || 'Erro no login. Verifique seus dados.');
      } else {
        alert('Erro na conexão com o servidor.');
        console.log(error)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Box sx={{ flexGrow: 1, p: 10, overflowY: 'auto' }}>
        <Container
          sx={{
            width: '25%',
            backgroundColor: '#F2F0EF',
            boxShadow: '4px 4px 4px rgba(0,0,0,0.1)',
            borderRadius: '10px',
          }}
        >
          <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4 }}>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', color: '#003566' }}>LOGIN</h1>

            <TextField
              required
              label="Email:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: '90%' }}
            />
            <TextField
              required
              label="Senha:"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              sx={{ width: '90%' }}
            />

            <Typography sx={{ color: '#003566' }}>
              Esqueceu a senha? <a style={{ color: '#003566' }} href="/recuperacaoSenha">Clique Aqui</a>
            </Typography>

            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              <Button
                sx={{ width: '100%', backgroundColor: '#00509d', '&:hover': { backgroundColor: '#003566' } }}
                variant="contained"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Logar'}
              </Button>
              <Typography
                sx={{ color: '#003566', cursor: 'pointer' }}
                onClick={() => navigate('/cadastro')}
              >
                Não possui conta? <a style={{ color: '#003566' }}>Cadastre-se</a>
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

export default PaginaLogin;
