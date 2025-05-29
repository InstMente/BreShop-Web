import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import Header from '../../componentes/Header/Header'
import Footer from '../../componentes/Footer/Footer'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaginaLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioEncontrado = usuarios.find(
            (usuario) => usuario.email === email && usuario.senha === senha
        );

        if (usuarioEncontrado) {
            alert('Login realizado com sucesso!');
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            navigate('/Home'); 
        } else {
            alert('Email ou senha incorretos!');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
            <Header />
            <Box sx={{ flexGrow: 1, p: 10, overflowY: 'auto' }}>
                <Container sx={{
                    width: '400px',
                    backgroundColor: '#F2F0EF',
                    boxShadow: '4px 4px 4px rgba(0,0,0,0.1)',
                    borderRadius: '10px'
                }}>
                    <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4 }}>
                        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', color: "#003566" }}>LOGIN</h1>

                        <TextField
                            required
                            label="Email:"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            label="Senha:"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            sx={{ width: '300px' }}
                        />

                        <Typography sx={{ color: '#003566' }}>
                            Esqueceu a senha? <a style={{ color: '#003566' }} href='/recuperacaoSenha'>Clique Aqui</a>
                        </Typography>

                        <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                            <Button
                                sx={{ width: '100%', backgroundColor: '#00509d', '&:hover': { backgroundColor: '#003566' } }}
                                variant="contained"
                                onClick={handleLogin}
                            >
                                Logar
                            </Button>
                            <Typography sx={{ color: '#003566' }}>
                                Não possui conta? <a style={{ color: '#003566' }} href='/cadastro'>Cadastre-se</a>
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </Box>
    )
}

export default PaginaLogin;
