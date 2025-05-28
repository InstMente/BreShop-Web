import React from 'react'
import { Box, Button, Container, Stack, TextField } from '@mui/material'
import Header from '../../componentes/Header/Header'
import Footer from '../../componentes/Footer/Footer'
function PaginaRecuperarSenha() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
            <Header />

            <Box sx={{ flexGrow: 1, p: 10, overflowY: 'auto' }}>
                <Container sx={{
                    width: '30%',
                    backgroundColor: '#F2F0EF',
                    boxShadow: '0.5px 0.5px 0.5px 1px rgb(0,0,0,1)',
                    borderRadius: '10px'
                }}>

                    <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4 }}>
                        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', color: "#003566" }}>Recuperação de Senha:</h1>
                        <TextField
                            required
                            id="outlined-required"
                            label="Email:"
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Senha:"
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Confirmar senha:"
                            sx={{ width: '300px' }}
                        />

                        <Button sx={{ width: '250px', backgroundColor: '#00509d', '&:hover': { backgroundColor: '#003566' }, }} variant="contained">
                            Alterar Senha
                        </Button>
                    </Stack>

                </Container>
            </Box>
            <Footer />
        </Box>
    )
}

export default PaginaRecuperarSenha