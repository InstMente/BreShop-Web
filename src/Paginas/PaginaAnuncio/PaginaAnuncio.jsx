import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function PaginaAnuncio() {
    const location = useLocation();
    const navigate = useNavigate();
    const anuncio = location.state?.anuncio;

    if (!anuncio) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <Box sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
                    <Typography variant="h6">Nenhum anúncio selecionado.</Typography>
                    <Button variant="contained" onClick={() => navigate('/')}>Voltar</Button>
                </Box>
                <Footer />
            </Box>
        );
    }

    const { titulo, descricao, valor, imagem, usuario } = anuncio;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
            <Header />


            <Button
                sx={{
                    width: '7%',
                    top: 20,
                    left: 20,
                    color: '#003566',
                    p: 1.2,
                    borderRadius: '8px',
                    zIndex: 10
                }}
                onClick={() => navigate('/home')}
            >
                <ArrowBackIosNewIcon
                    onClick={() => navigate('/home')}
                    sx={{ ml: 2, color: '#003566', fontSize: '25px', mr: 1 }}
                />
                Voltar
            </Button>

            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Container maxWidth='lg' sx={{ display: 'flex', borderRadius: '10px', p: 3, backgroundColor: 'whitesmoke', height: '70%', width: '50%', boxShadow: '0.5px 0.5px 3px 1px rgb(0, 0, 0,1)', flexDirection: 'column', alignItems: 'center' }}>
                        {/* <Box sx={{ backgroundColor: 'white', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0.5px 0.5px 3px 1px rgb(0, 0, 0,1)', borderRadius: '8px' }}> */}
                            <Box
                                component='img'
                                src={imagem}
                                alt='img-produto'
                                sx={{ width: '90%', height: '50%', objectFit: 'cover', p: 1 }}
                            />
                        {/* </Box> */}

                        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                            <Stack spacing={1} >
                                <h2 style={{ fontFamily: '"Gill Sans", sans-serif', color: '#003566', fontWeight: '300' }}>Nome:</h2> <Typography>{titulo}</Typography>
                                <h2 style={{ fontFamily: '"Gill Sans", sans-serif', color: '#003566', fontWeight: '300' }}>Descrição:</h2> <Typography>{descricao}</Typography>
                                <h2 style={{ fontFamily: '"Gill Sans", sans-serif', color: '#003566', fontWeight: '300' }}>Preço:</h2><Typography>{`R$ ${Number(anuncio.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</Typography>
                            </Stack>
                        </Box>
                        <Button sx={{ backgroundColor: '#003566', color: 'white', p: 1.5, width: '60%', borderRadius: '10px', mt: '15px' }}>COMPRAR</Button>
                    </Container>

                    <Container maxWidth='lg' sx={{ display: 'flex', borderRadius: '10px', p: 5, backgroundColor: 'whitesmoke', height: '20%', width: '50%', boxShadow: '0.5px 0.5px 3px 1px rgb(0, 0, 0, 1)', justifyContent: 'space-around' }}>
                        <Box sx={{display:'flex', flexDirection:'column'}}>
                            <Stack spacing={1}>
                                <h3 style={{ fontFamily: '"Gill Sans", sans-serif', color: '#003566', fontWeight: '300' }}>Nome:</h3> <Typography>{usuario?.nome}</Typography>
                                <h3 style={{ fontFamily: '"Gill Sans", sans-serif', color: '#003566', fontWeight: '300' }}>Email:</h3> <Typography>{usuario?.email}</Typography>
                                <h3 style={{ fontFamily: '"Gill Sans", sans-serif', color: '#003566', fontWeight: '300' }}>Número:</h3> <Typography>{usuario?.numero}</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'column'}}>
                            <Stack spacing={1}>
                                <h3 style={{ fontFamily: '"Gill Sans", sans-serif', color: '#003566', fontWeight: '300' }}>Cidade:</h3> <Typography>{usuario?.cidade}</Typography>
                                <h3 style={{ fontFamily: '"Gill Sans", sans-serif', color: '#003566', fontWeight: '300' }}>Rua:</h3> <Typography>{usuario?.rua}</Typography>
                                <h3 style={{ fontFamily: '"Gill Sans", sans-serif', color: '#003566', fontWeight: '300' }}>CEP:</h3> <Typography>{usuario?.cep}</Typography>
                            </Stack>
                        </Box>
                    </Container>
                </Stack>
            </Box>
            <Footer />
        </Box>
    )
}

export default PaginaAnuncio;
