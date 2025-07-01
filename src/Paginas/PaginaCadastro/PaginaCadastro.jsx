import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import { useState } from 'react';
import { formatarComMascara, MASCARA_CPF, MASCARA_CELULAR, MASCARA_CEP } from '../../utils/mascaras';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    const navigate = useNavigate();

    const handleCadastro = async () => {
        if (!usuario || !email || !telefone || !dataNascimento || !cpf || !cep || !cidade || !bairro || !rua || !numero || !senha || !confirmarSenha) {
            toast.error('Por favor, preencha todos os campos!');
            return;
        }

        if (senha !== confirmarSenha) {
            toast.error('As senhas não coincidem!');
            return;
        }

        try {
            const resposta = await axios.post('https://breshopbackend.onrender.com/usuarios', {
                nome: usuario,
                email,
                telefone,
                datanascimento: dataNascimento,
                cpf,
                cep,
                cidade,
                bairro,
                rua,
                numerocasa: numero,
                senha
            });

            if (resposta.status === 201) {
                toast.info('Cadastro realizado com sucesso!');
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
                navigate('/');
            }
        } catch (erro) {
            if (erro.response) {
                toast.error(erro.response.data.mensagem || erro.response.data.erro || 'Erro no cadastro');
            } else {
                toast.error('Erro na conexão com o servidor');
            }
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
                    <form onSubmit={(e) => { e.preventDefault(); handleCadastro(); }}>
                    <Stack spacing={2}>
                        <Typography
                            variant="h4"
                            sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, color: '#003566', textAlign: 'center' }}
                        >
                            Cadastro
                        </Typography>

                        <TextField label="Usuário:" value={usuario} onChange={(e) => setUsuario(e.target.value)} fullWidth />
                        <TextField label="Email:" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                        <TextField label="Telefone:" value={telefone} onChange={(e) => setTelefone(formatarComMascara(e.target.value, MASCARA_CELULAR))} fullWidth />
                        <TextField type="date" label="Data de Nascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth />
                        <TextField label="CPF:" value={cpf} onChange={(e) => setCpf(formatarComMascara(e.target.value, MASCARA_CPF))} fullWidth />
                        <TextField label="CEP:" value={cep} onChange={(e) => setCep(formatarComMascara(e.target.value, MASCARA_CEP))} fullWidth />
                        <TextField label="Cidade:" value={cidade} onChange={(e) => setCidade(e.target.value)} fullWidth />
                        <TextField label="Bairro:" value={bairro} onChange={(e) => setBairro(e.target.value)} fullWidth />
                        <TextField label="Rua:" value={rua} onChange={(e) => setRua(e.target.value)} fullWidth />
                        <TextField label="Número:" value={numero} onChange={(e) => setNumero(e.target.value)} fullWidth />
                        <TextField label="Senha:" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} fullWidth />
                        <TextField label="Confirmar Senha:" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} fullWidth />

                        <Stack sx={{ justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                            <Button
                                type="submit"
                                sx={{ width: '100%', maxWidth: '250px', backgroundColor: '#00509d', '&:hover': { backgroundColor: '#003566' } }}
                                variant="contained"
                            >
                                Cadastrar
                            </Button>
                            <Typography sx={{ color: '#003566', textAlign: 'center' }}>
                                Já possui conta? <a style={{ color: '#003566', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => {navigate('/')}}>Entrar</a>
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

export default PaginaCadastro;