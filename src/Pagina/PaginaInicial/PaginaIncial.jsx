import React from 'react';
import Header from '../../componentes/Header/Header';
import Footer from '../../componentes/Footer/Footer';
import { Box, Container, Typography } from '@mui/material';

function PaginaInicial() {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden'}}>
            <Header />
            <Box sx={{ flexGrow: 1 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ mt: 4 }}>
                        Home page
                    </Typography>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
}

export default PaginaInicial;
