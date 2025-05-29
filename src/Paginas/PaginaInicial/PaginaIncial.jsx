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
    Modal
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
    backgroundColor: '#A9A9A9',
    borderRadius: 2,
    boxShadow: 24,
    p: 5,
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
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
            <Header />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', p: 5, flexDirection: 'column', gap: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            sx={{ width: '100%', borderTopRightRadius: 0, borderBottomRightRadius: 0, '& fieldset': { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
                            id="outlined-search"
                            label="Pesquisar"
                            type="search"
                            value={termoPesquisa}
                            onChange={(e) => setTermoPesquisa(e.target.value)}
                        />
                        <Box
                            sx={{
                                backgroundColor: '#003566',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: '8px',
                                borderBottomRightRadius: '8px',
                                width: 50,
                                height: 56,
                                cursor: 'pointer'
                            }}
                        >
                            <SearchIcon />
                        </Box>
                    </Box>

                    <Grid container spacing={3}>
                        {anunciosFiltrados.map((anuncio) => (
                            <Grid item key={anuncio.id} size={3}>
                                <Card sx={{ width: '100%', minHeight: 450, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: 'ButtonShadow', borderRadius: '16px', boxShadow: '0.5px 0.5px 3px 1px rgba(0, 0, 1, 1)' }}>
                                    {anuncio.imagem && (
                                        <CardMedia
                                            component="img"
                                            height={200}
                                            image={anuncio.imagem}
                                            alt={anuncio.titulo}
                                            sx={{
                                                borderRadius: 2,
                                                margin: '16px auto 8px',
                                                display: 'block',
                                                objectFit: 'cover',
                                                backgroundColor: '#fff',
                                                width: '90%',
                                                maxWidth: 300,
                                                maxHeight: 200
                                            }}
                                        />
                                    )}
                                    <CardContent sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                        <Stack spacing={2} sx={{ color: '#003566' }}>
                                            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                                {anuncio.titulo}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, wordBreak: 'break-word' }}>
                                                {anuncio.descricao.length > 20 ? anuncio.descricao.slice(0, 20) + '...' : anuncio.descricao}
                                            </Typography>
                                            <Typography>
                                                {`R$ ${Number(anuncio.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={{ width: '100%', p: 1, backgroundColor: '#00509d', '&:hover': { backgroundColor: '#003566' } }}
                                                onClick={() => navigate('/anuncio', { state: { anuncio } })}
                                            >
                                                Ver Detalhes
                                            </Button>

                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                <SpeedDial
                    ariaLabel="Menu rápido"
                    sx={{ position: 'fixed', bottom: 120, right: 25 }}
                    icon={<SpeedDialIcon />}
                    FabProps={{
                        sx: {
                            backgroundColor: '#003566',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#00264d'
                            }
                        }
                    }}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={action.onClick}
                            sx={{ backgroundColor: '#003566', color: 'white' }}
                        />
                    ))}
                </SpeedDial>

                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                    <Box component="form" onSubmit={handleSubmit} sx={modalStyle}>
                        <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'center', fontFamily: 'Montserrat, sans-serif', fontWeight: '800', fontSize: '35px', mb: 2, color:'#003566' }}>
                            Cadastrar Anúncio
                        </Typography>
                        <Stack spacing={2}>
                            <TextField label="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} fullWidth required sx={{}} />
                            <TextField label="Descrição" multiline rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} fullWidth required sx={{  }} />
                            <TextField label="Valor (R$)" type="number" value={valor} onChange={(e) => setValor(e.target.value)} fullWidth required sx={{  }} />
                            <Button variant="contained" component="label" sx={{ color: 'white', fontSize: '17px' }}>
                                Upload de Imagem
                                <input type="file" hidden accept="image/*" onChange={handleImagemChange} />
                            </Button>
                            {preview && (
                                <Box component="img" src={preview} alt="Pré-visualização da imagem" sx={{ width: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 2 }} />
                            )}
                            <Button type="submit" variant="contained" sx={{ backgroundColor: '#003566', color: 'white', fontSize: '17px' }}>
                                Cadastrar
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
