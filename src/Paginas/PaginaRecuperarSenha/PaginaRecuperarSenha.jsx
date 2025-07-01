import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PaginaRecuperarSenha() {
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState(null); // guarda dados do usuário retornados da API
  const [emailValidado, setEmailValidado] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValido, setCaptchaValido] = useState(false);
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const navigate = useNavigate();

  const gerarCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let text = '';
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
  };

  useEffect(() => {
    if (emailValidado) {
      gerarCaptcha();
    }
  }, [emailValidado]);

  // Valida email via API e já salva os dados do usuário
  const validarEmail = async () => {
    if (!email) {
      toast.error('Digite o email para validar');
      return;
    }
    setLoadingEmail(true);
    try {
      const res = await axios.get(
        `https://breshopbackend.onrender.com/usuarios/email/${email}`
      );
      if (res.data && res.data.email === email) {
        setEmailValidado(true);
        setUsuario(res.data); // salva usuário para depois enviar
        toast.success('Email validado! Confirme o captcha para continuar.');
      } else {
        toast.error('Email não encontrado.');
        setEmailValidado(false);
        setUsuario(null);
      }
    } catch (error) {
      toast.error('Erro ao validar email.');
      setEmailValidado(false);
      setUsuario(null);
    } finally {
      setLoadingEmail(false);
    }
  };

  const validarCaptcha = () => {
    if (captchaInput.toUpperCase() === captchaText) {
      setCaptchaValido(true);
      toast.success('Captcha validado! Agora você pode alterar a senha.');
    } else {
      toast.error('Captcha incorreto. Tente novamente.');
      setCaptchaInput('');
      gerarCaptcha();
    }
  };

  const handleSubmit = async () => {
    if (!emailValidado) {
      toast.error('Valide seu email primeiro.');
      return;
    }
    if (!captchaValido) {
      toast.error('Confirme o captcha primeiro.');
      return;
    }
    if (!senha || !confirmar) {
      toast.error('Preencha todos os campos de senha.');
      return;
    }
    if (senha !== confirmar) {
      toast.error('As senhas não coincidem!');
      return;
    }

    if (!usuario) {
      toast.error('Usuário não carregado. Valide o email novamente.');
      return;
    }

    try {
      // Clona o usuário e atualiza a senha no objeto que será enviado
      const payload = { ...usuario, senha };

      await axios.put(
        `https://breshopbackend.onrender.com/usuarios/${usuario.id}`,
        payload
      );

      toast.success('Senha atualizada com sucesso!');
      
      // Resetar estados
      setEmail('');
      setUsuario(null);
      setEmailValidado(false);
      setCaptchaInput('');
      setCaptchaValido(false);
      setSenha('');
      setConfirmar('');
      navigate('/')
    } catch (error) {
      toast.error(
        error.response?.data?.mensagem ||
          'Erro ao recuperar senha. Verifique o email e tente novamente.'
      );
      console.error(error);
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}
    >
      <Header />

      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 3, sm: 6, md: 10 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
          overflowY: 'auto',
        }}
      >
        <Container
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            boxShadow: 3,
            borderRadius: 3,
            p: { xs: 3, sm: 5 },
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: '#003566',
                fontFamily: 'Montserrat, sans-serif',
                textAlign: 'center',
              }}
            >
              Recuperação de Senha
            </Typography>

            <TextField
              required
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              autoComplete="email"
              disabled={emailValidado}
            />

            {!emailValidado && (
              <Button
                variant="contained"
                onClick={validarEmail}
                sx={{
                  width: '100%',
                  py: 1.5,
                  backgroundColor: '#003566',
                  fontWeight: 600,
                  fontSize: '1rem',
                  '&:hover': { backgroundColor: '#002244' },
                }}
                disabled={loadingEmail}
              >
                {loadingEmail ? 'Validando...' : 'Validar Email'}
              </Button>
            )}

            {emailValidado && !captchaValido && (
              <>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: '#e0e0e0',
                    borderRadius: 2,
                    fontFamily: 'monospace',
                    letterSpacing: 4,
                    fontSize: '1.5rem',
                    userSelect: 'none',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  {captchaText}
                </Box>

                <TextField
                  required
                  label="Digite o texto acima"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                  fullWidth
                />

                <Button
                  variant="contained"
                  onClick={validarCaptcha}
                  sx={{
                    width: '100%',
                    py: 1.5,
                    backgroundColor: '#003566',
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': { backgroundColor: '#002244' },
                  }}
                >
                  Confirmar Captcha
                </Button>
              </>
            )}

            {captchaValido && (
              <>
                <TextField
                  required
                  label="Nova Senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  fullWidth
                  autoComplete="new-password"
                />

                <TextField
                  required
                  label="Confirmar Senha"
                  type="password"
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  fullWidth
                  autoComplete="new-password"
                />

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    width: '100%',
                    py: 1.5,
                    backgroundColor: '#003566',
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': { backgroundColor: '#002244' },
                  }}
                >
                  Alterar Senha
                </Button>
              </>
            )}
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default PaginaRecuperarSenha;
