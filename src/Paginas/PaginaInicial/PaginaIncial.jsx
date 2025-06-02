import React, { useState, useEffect } from 'react';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import {
    Box,
    Container,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Typography,
    TextField,
    Button,
    Stack,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Modal,
    Chip,
    Divider
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

function PaginaInicial() {
    const [openModal, setOpenModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState(null);
    const [anuncios, setAnuncios] = useState([]);
    const [termoPesquisa, setTermoPesquisa] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const anunciosExistentes = JSON.parse(localStorage.getItem('anuncios')) || [];
        setAnuncios(anunciosExistentes);
    }, []);

    const actions = [
        { icon: <FileCopyIcon />, name: 'Cadastrar Anúncio', onClick: () => setOpenModal(true) }
    ];

    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        setImagem(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const anuncio = {
            id: Date.now(),
            titulo,
            descricao,
            valor,
            imagem: preview,
            data: new Date().toISOString()
        };
        const anunciosExistentes = JSON.parse(localStorage.getItem('anuncios')) || [];
        const novosAnuncios = [...anunciosExistentes, anuncio];
        localStorage.setItem('anuncios', JSON.stringify(novosAnuncios));
        setAnuncios(novosAnuncios);
        alert('Anúncio cadastrado com sucesso!');
        setTitulo('');
        setDescricao('');
        setValor('');
        setImagem(null);
        setPreview(null);
        setOpenModal(false);
    };

    const anunciosFiltrados = anuncios.filter((anuncio) =>
        anuncio.titulo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
        anuncio.descricao.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ebebeb', overflowX: 'hidden' }}>
            <Header />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
                    {/* Barra de Pesquisa - Estilo Mercado Livre */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        boxShadow: '0 1px 2px 0 rgba(0,0,0,.1)',
                        overflow: 'hidden'
                    }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Buscar produtos, marcas e muito mais..."
                            InputProps={{
                                sx: {
                                    '& fieldset': { border: 'none' },
                                    height: '48px'
                                }
                            }}
                            value={termoPesquisa}
                            onChange={(e) => setTermoPesquisa(e.target.value)}
                        />
                        <Button
                            sx={{
                                height: '48px',
                                minWidth: '46px',
                                backgroundColor: '#003566',
                                color: '#fff',
                                borderLeft: '1px solid #eee',
                                borderRadius: 0,
                                '&:hover': {
                                    backgroundColor: 'hsl(219, 68.50%, 36.10%)'
                                }
                            }}
                        >
                            <SearchIcon />
                        </Button>
                    </Box>

                    {/* Listagem de Anúncios - Estilo Mercado Livre */}
                    <Grid container spacing={3}>
                        {anunciosFiltrados.map((anuncio) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} size={3} key={anuncio.id}>
                                <Card
                                    sx={{
                                        height: '90%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backgroundColor: '#fff',
                                        borderRadius: '4px',
                                        boxShadow: '0 1px 1px 0 rgba(0,0,0,.1)',
                                        transition: 'box-shadow .3s',
                                        '&:hover': {
                                            boxShadow: '0 7px 11px 0 rgba(0,0,0,.1)'
                                        },
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => navigate('/anuncio', { state: { anuncio } })}
                                >
                                    <Box sx={{ p: 2, flexGrow: 1 }}>
                                        {anuncio.imagem && (
                                            <CardMedia
                                                component="img"
                                                image={anuncio.imagem}
                                                alt={anuncio.titulo}
                                                sx={{
                                                    width: '100%',
                                                    height: '160px',
                                                    objectFit: 'contain',
                                                    margin: '0 auto'
                                                }}
                                            />
                                        )}
                                        <CardContent sx={{ p: 0, pt: 2 }}>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontSize: '14px',
                                                    color: '#333',
                                                    mb: 1,
                                                    height: '36px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical'
                                                }}
                                            >
                                                {anuncio.titulo}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: '24px',
                                                    fontWeight: '400',
                                                    color: '#333',
                                                    mb: 1
                                                }}
                                            >
                                                {`R$ ${Number(anuncio.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                            </Typography>
                                            <Chip
                                                label="Frete grátis"
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#00a650',
                                                    color: '#fff',
                                                    fontSize: '12px',
                                                    height: '20px'
                                                }}
                                            />
                                            <Stack sx={{padding:'20px'}}>

                                                <Button sx={{backgroundColor:'#003566', color:'white',":hover":{backgroundColor:'rgb(10, 72, 131)'}}}>
                                                    Ver Detalhes
                                                </Button>
                                            </Stack>
                                        </CardContent>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* Botão Flutuante - Estilo Mercado Livre */}
                <SpeedDial
                    ariaLabel="Menu rápido"
                    sx={{
                        position: 'fixed',
                        bottom: 32,
                        right: 32,
                        '& .MuiSpeedDial-fab': {
                            backgroundColor: '#003566',
                            '&:hover': {
                                backgroundColor: 'rgb(23, 62, 121)'
                            }
                        }
                    }}
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={action.onClick}
                            FabProps={{
                                sx: {
                                    backgroundColor: '#003566',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: 'rgb(23, 62, 121)'
                                    }
                                }
                            }}
                        />
                    ))}
                </SpeedDial>

                {/* Modal de Cadastro - Estilo Mercado Livre */}
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box component="form" onSubmit={handleSubmit} sx={modalStyle}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 3,
                                color: '#003566',
                                fontWeight: '600',
                                textAlign: 'center'
                            }}
                        >
                            Publicar novo anúncio
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                label="Título do anúncio"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Descrição"
                                multiline
                                rows={3}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Preço (R$)"
                                type="number"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                                fullWidth
                                required
                                InputProps={{
                                    startAdornment: (
                                        <Typography sx={{ mr: 1, color: 'text.secondary' }}>R$</Typography>
                                    )
                                }}
                            />
                            <Button
                                variant="outlined"
                                component="label"
                                sx={{
                                    backgroundColor: '#003566',
                                    color: '#fff',
                                    border: 'none',
                                    '&:hover': {
                                        backgroundColor: 'rgb(25, 64, 122)'
                                    }
                                }}
                            >
                                Adicionar fotos
                                <input type="file" hidden accept="image/*" onChange={handleImagemChange} />
                            </Button>
                            {preview && (
                                <Box
                                    component="img"
                                    src={preview}
                                    alt="Pré-visualização"
                                    sx={{
                                        width: '100%',
                                        maxHeight: 200,
                                        objectFit: 'contain',
                                        borderRadius: 1,
                                        border: '1px solid #eee'
                                    }}
                                />
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: 'rgb(47, 115, 179)',
                                    '&:hover': {
                                        backgroundColor: 'rgb(25, 64,122)'
                                    }
                                }}
                            >
                                Publicar anúncio
                            </Button>
                        </Stack>
                    </Box>
                </Modal>
            </Box>
            <Footer />
        </Box>
    );
}

export default PaginaInicial;