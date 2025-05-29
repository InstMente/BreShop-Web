import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import Header from '../../componentes/Header/Header'
import Footer from '../../componentes/Footer/Footer'
import { useState } from 'react';

function PaginaCadastro() {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleCadastro = () => {
        if (!usuario || !email || !telefone || !dataNascimento || !cpf || !cep || !cidade || !bairro || !rua || !numero || !senha || !confirmarSenha) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioExistente = usuariosExistentes.find(
            (u) => u.usuario === usuario || u.email === email || u.cpf === cpf
        );

        if (usuarioExistente) {
            if (usuarioExistente.usuario === usuario) {
                alert('Nome de usuário já cadastrado!');
            } else if (usuarioExistente.email === email) {
                alert('Email já cadastrado!');
            } else if (usuarioExistente.cpf === cpf) {
                alert('CPF já cadastrado!');
            }
            return;
        }

        const novoUsuario = {
            id: Date.now(),
            usuario,
            email,
            telefone,
            dataNascimento,
            cpf,
            cep,
            cidade,
            bairro,
            rua,
            numero,
            senha
        };

        localStorage.setItem('usuarios', JSON.stringify([...usuariosExistentes, novoUsuario]));

        alert('Cadastro realizado com sucesso!');

        setUsuario('');
        setEmail('');
        setTelefone('');
        setDataNascimento('');
        setCpf('');
        setCep('');
        setCidade('');
        setBairro('');
        setRua('');
        setNumero('');
        setSenha('');
        setConfirmarSenha('');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
            <Header />
            <Box sx={{ flexGrow: 1, p: 10, overflowY: 'auto' }}>
                <Container sx={{
                    width: '400px',
                    backgroundColor: '#F2F0EF',
                    boxShadow: '4px 4px 4px rgba(0,0,0,0.1)',
                    borderRadius: '10px',
                }}>
                    <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4 }}>
                        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', color: "#003566" }}>Cadastro</h1>

                        <TextField
                            required
                            label="Usuário:"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            label="Email:"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            type='number'
                            label="Telefone:"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            type='date'
                            label="Data de Nascimento"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            type='number'
                            label="CPF:"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            type='number'
                            label="CEP:"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            label="Cidade:"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            label="Bairro:"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            label="Rua:"
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            type='number'
                            label="Número:"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
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
                        <TextField
                            required
                            label="Confirmar Senha:"
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            sx={{ width: '300px' }}
                        />
                        <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                            <Button sx={{ width: '250px', backgroundColor: '#00509d', '&:hover': { backgroundColor: '#003566' } }} variant="contained" onClick={handleCadastro}>
                                Cadastrar
                            </Button>
                            <Typography sx={{ color: '#003566' }}>Já possui conta? <a style={{ color: '#003566' }} href='/'>Entrar</a></Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </Box>
    )
}

export default PaginaCadastro;
