import React, { useState, useContext } from 'react';
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
    Chip
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';

const estiloModal = {
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
    const [abrirModal, setAbrirModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState(null);
    const { anuncios, setAnuncios } = useContext(GlobalContext);
    const [termoPesquisa, setTermoPesquisa] = useState('');
    const navegar = useNavigate();

    const acoes = [
        { icon: <FileCopyIcon />, name: 'Cadastrar Anúncio', onClick: () => setAbrirModal(true) }
    ];

    const alterarImagem = (e) => {
        const arquivo = e.target.files[0];
        setImagem(arquivo);
        if (arquivo) {
            const leitor = new FileReader();
            leitor.onloadend = () => {
                setPreview(leitor.result);
            };
            leitor.readAsDataURL(arquivo);
        } else {
            setPreview(null);
        }
    };

    const enviarFormulario = (e) => {
        e.preventDefault();
        const novoAnuncio = {
            id: Date.now(),
            titulo,
            descricao,
            valor,
            imagem: preview,
            data: new Date().toISOString()
        };
        const atualizados = [...anuncios, novoAnuncio];
        setAnuncios(atualizados);
        alert('Anúncio cadastrado com sucesso!');
        setTitulo('');
        setDescricao('');
        setValor('');
        setImagem(null);
        setPreview(null);
        setAbrirModal(false);
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

                    <Grid container spacing={3}>
                        {anunciosFiltrados.map((anuncio) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={anuncio.id}>
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
                                    onClick={() => navegar('/anuncio', { state: { anuncio } })}
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
                                            <Stack sx={{ padding: '20px' }}>
                                                <Button sx={{ backgroundColor: '#003566', color: 'white', ":hover": { backgroundColor: 'rgb(10, 72, 131)' } }}>
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
                    {acoes.map((acao) => (
                        <SpeedDialAction
                            key={acao.name}
                            icon={acao.icon}
                            tooltipTitle={acao.name}
                            onClick={acao.onClick}
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

                <Modal open={abrirModal} onClose={() => setAbrirModal(false)}>
                    <Box component="form" onSubmit={enviarFormulario} sx={estiloModal}>
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
                                inputProps={{ maxLength: 250}}
                            />
                            <TextField
                                label="Preço (R$)"
                                type="number"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                                fullWidth
                                required
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
                                <input required type="file" hidden accept="image/*" onChange={alterarImagem} />
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
