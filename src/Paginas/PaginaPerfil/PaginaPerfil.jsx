import { Box, Button, Container, Stack, TextField, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';


function PaginaPerfil() {
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        cpf: '',
        cep: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        senha: '',
        foto: ''
    });

    const [openModal, setOpenModal] = useState(false);
    const [usuarioEdit, setUsuarioEdit] = useState({ ...usuario });

    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (dados) {
            setUsuario(dados);
            setUsuarioEdit(dados);
        }
    }, []);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuarioEdit({ ...usuarioEdit, [name]: value });
    };

    const handleSave = () => {
        setUsuario(usuarioEdit);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEdit));
        setOpenModal(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>

            <Header />
            <Button
                sx={{
                    position: 'fixed',
                    top: '80px',
                    left: '20px',
                    color: 'white',
                    p: 1,
                    borderRadius: '6px',
                    zIndex: 1000,
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    backgroundColor: '#003566',
                    backdropFilter: 'blur(4px)',
                    '&:hover': {
                        backgroundColor: 'rgb(15, 70, 122)'
                    },
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}
                onClick={() => navigate('/home')}
            >
                <ArrowBackIosNewIcon sx={{ fontSize: '16px' }} />
                Voltar
            </Button>
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Container sx={{
                    width: '40%',
                    backgroundColor: 'white',
                    flexGrow: 1,
                    boxShadow: '0.5px 0.5px 3px 1px rgb(0,0,1,1)',
                    border: 'none',
                    borderRadius: '10px'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Stack spacing={2}>
                            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', color: "#003566" }}>Meu Perfil</h1>
                            <Box component='img' src={usuario.foto || '/user.png'} sx={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }} />
                        </Stack>
                    </Box>
                    <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4 }}>
                        <TextField disabled label='Usuário:' value={usuario.usuario} sx={{ width: '80%' }} InputLabelProps={{ shrink: true }} />
                        <TextField disabled label="Email:" value={usuario.email} sx={{ width: '80%' }} />
                        <TextField disabled label="Telefone:" type="number" value={usuario.telefone} sx={{ width: '80%' }} />
                        <TextField disabled type='date' value={usuario.dataNascimento} sx={{ width: '80%' }} />
                        <TextField disabled label="CPF:" type="number" value={usuario.cpf} sx={{ width: '80%' }} />
                        <TextField disabled label="CEP:" type="number" value={usuario.cep} sx={{ width: '80%' }} />
                        <TextField disabled label="Cidade:" value={usuario.cidade} sx={{ width: '80%' }} />
                        <TextField disabled label="Bairro:" value={usuario.bairro} sx={{ width: '80%' }} />
                        <TextField disabled label="Rua:" value={usuario.rua} sx={{ width: '80%' }} />
                        <TextField disabled label="Número:" type="number" value={usuario.numero} sx={{ width: '80%' }} />
                        <TextField disabled label="Senha:" type="password" value={usuario.senha} sx={{ width: '80%' }} />
                        <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                            <Button onClick={handleOpen} sx={{ width: '100%', backgroundColor: '#003566', '&:hover': { backgroundColor: '#00509d' } }} variant="contained">
                                Editar Perfil
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Modal open={openModal} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '25%',
                    height: '75%',
                    overflowY: 'auto',
                    bgcolor: 'white',
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4
                }}>
                    <Typography variant="h6" mb={2}>Editar Perfil</Typography>
                    <Button variant="outlined" component="label">
                        Alterar Foto
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setUsuarioEdit({ ...usuarioEdit, foto: reader.result });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </Button>
                    {usuarioEdit.foto && (
                        <Box component="img" src={usuarioEdit.foto} sx={{ width: '100%', maxHeight: '200px', borderRadius: '10px', mt: 2, objectFit: 'cover' }} />
                    )}
                    <Stack spacing={2} mt={2}>
                        {Object.entries(usuarioEdit).map(([key, value]) => (
                            key !== 'foto' && (
                                <TextField
                                    key={key}
                                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                                    name={key}
                                    type={key === 'senha' ? 'password' : key === 'dataNascimento' ? 'date' : 'text'}
                                    value={value}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled={key === 'id'}
                                    InputLabelProps={key === 'dataNascimento' ? { shrink: true } : {}}
                                />
                            )
                        ))}
                        <Button variant="contained" sx={{ backgroundColor: '#003566', color: "white" }} onClick={handleSave}>
                            Salvar
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            <Footer />
        </Box>
    );
}

export default PaginaPerfil;
