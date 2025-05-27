import { Box } from '@mui/material'
import React from 'react'
import Header from '../../componentes/Header/Header'
import Footer from '../../componentes/Footer/Footer'

function PaginaAnuncio() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
            <Header />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Container maxWidth='lg' sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>

                </Container>
            </Box>
            <Footer />
        </Box>
    )
}

export default PaginaAnuncio