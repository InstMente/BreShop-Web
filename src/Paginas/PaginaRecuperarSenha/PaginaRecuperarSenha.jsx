import React, { useState } from 'react';
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import axios from 'axios';

function PaginaRecuperarSenha() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const handleSubmit = async () => {
    if (!email || !senha || !confirmar) {
      alert('Preencha todos os campos.');
      return;
    }

    if (senha !== confirmar) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      await axios.put('https://breshopbackend.onrender.com/usuarios/recuperar-senha', {
        email,
        novaSenha: senha,
      });

      alert('Senha atualizada com sucesso!');
      // Opcional: limpar os campos
      setEmail('');
      setSenha('');
      setConfirmar('');
    } catch (error) {
      alert('Erro ao recuperar senha. Verifique o email e tente novamente.');
      console.error(error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <Box sx={{ flexGrow: 1, p: 10, overflowY: 'auto' }}>
        <Container
          sx={{
            width: '30%',
            backgroundColor: '#F2F0EF',
            boxShadow: '0.5px 0.5px 0.5px 1px rgb(0,0,0,1)',
            borderRadius: '10px',
          }}
        >
          <Stack
            spacing={2}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4 }}
          >
            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', color: '#003566' }}>
              Recuperação de Senha:
            </h1>

            <TextField
              required
              label="Email:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: '300px' }}
            />

            <TextField
              required
              label="Nova Senha:"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              sx={{ width: '300px' }}
            />

            <TextField
              required
              label="Confirmar Senha:"
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              sx={{ width: '300px' }}
            />

            <Button
              sx={{ width: '250px', backgroundColor: '#00509d', '&:hover': { backgroundColor: '#003566' } }}
              variant="contained"
              onClick={handleSubmit}
            >
              Alterar Senha
            </Button>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default PaginaRecuperarSenha;
