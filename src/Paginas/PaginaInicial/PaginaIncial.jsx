import React, { useState } from 'react';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import {
    Box,
    Container,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Modal,
    Typography,
    TextField,
    Button,
    Stack
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SearchIcon from '@mui/icons-material/Search';
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    borderRadius: 2,
    boxShadow: 24,
    p: 5,
    backgroundColor:'#003566'
};

function PaginaInicial() {
    const [openModal, setOpenModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState(null);

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
        console.log({ titulo, descricao, valor, imagem });
        setOpenModal(false);
        setTitulo('');
        setDescricao('');
        setValor('');
        setImagem(null);
        setPreview(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
            <Header />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField sx={{ width: '650px', borderTopRightRadius: 0, borderBottomRightRadius: 0, '& fieldset': { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }} id="outlined-search" label="Pesquisar" type="search" />
                        <Box sx={{ backgroundColor: '#003566', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: '8px', borderBottomRightRadius: '8px', width: 50, height: 56, cursor: 'pointer' }}>
                            <SearchIcon />
                        </Box>
                    </Box>
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
                                backgroundColor: '#00264d',
                            },
                        },
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
                        <Typography
                            variant="h5"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                fontFamily: 'Montserrat, sans-serif',
                                fontWeight: '800',
                                color: "white",
                                fontSize:'35px'
                            }}
                            mb={2}
                        >
                            Cadastrar Anúncio
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                label="Título"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                fullWidth
                                required
                                sx={{backgroundColor:'white'}}
                            />
                            <TextField
                                label="Descrição"
                                multiline
                                rows={3}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                fullWidth
                                required
                                sx={{backgroundColor:'white'}}
                            />
                            <TextField
                                label="Valor (R$)"
                                type="number"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                                fullWidth
                                required
                                sx={{backgroundColor:'white'}}
                            />
                            <Button variant="contained" component="label" sx={{ backgroundColor: 'white', color:'#003566', fontSize:'17px' }}>
                                Upload de Imagem
                                <input type="file" hidden accept="image/*" onChange={handleImagemChange}/>
                            </Button>

                            {preview && (
                                <Box
                                    component="img"
                                    src={preview}
                                    alt="Pré-visualização da imagem"
                                    sx={{ width: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 2 }}
                                />
                            )}

                            <Button type="submit" variant="contained" sx={{ backgroundColor: 'white', color:'#003566', fontSize:'17px' }}>
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
