import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Header from '../../componentes/Header/Header'
import Footer from '../../componentes/Footer/Footer'

function PaginaPerfil() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
            <Header />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Container sx={{
                    width: '50%',
                    backgroundColor: 'white',
                    flexGrow: 1,
                    boxShadow: '0.5px 0.5px 3px 1px rgb(0,0,1,1)',
                    border: 'none',
                    borderRadius: '10px'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Stack spacing={2}>
                            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', color: "#003566" }}>Meu Perfil</h1>

                            <Box
                                component='img'
                                src='/user.png'
                                sx={{ width: '200px', height: '200px' }}
                            />

                        </Stack>
                    </Box>
                    <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4 }}>

                        <TextField
                            disabled
                            id="outlined-required"
                            label="Usuário:"
                            sx={{ width: '80%' }}
                        />
                        <TextField
                            disabled
                            id="outlined-required"
                            label="Email:"
                            sx={{ width: '80%' }}
                        />
                        <TextField
                            disabled
                            id="outlined-required"
                            type='number'
                            label="Telefone:"
                            sx={{ width: '80%' }}
                        />
                        <TextField
                            disabled
                            id="outlined-required"
                            type='date'
                            sx={{ width: '80%' }}
                        />
                        <TextField
                            disabled
                            id="outlined-required"
                            type='number'
                            label="CPF:"
                            sx={{ width: '80%' }}
                        />
                        <TextField
                            disabled
                            id="outlined-required"
                            type='number'
                            label="CEP:"
                            sx={{ width: '80%' }}
                        />
                        <TextField
                            disabled
                            id="outlined-required"
                            label="Cidade:"
                            sx={{ width: '80%' }}
                        />
                        <TextField
                            disabled
                            id="outlined-required"
                            label="Bairro:"
                            sx={{ width: '80%' }}
                        />
                        <TextField
                            disabled
                            id="outlined-required"
                            label="Rua:"
                            sx={{ width: '80%' }}
                        />
                        <TextField
                            disabled
                            id="outlined-required"
                            type='number'
                            label="Número:"
                            sx={{ width: '80%' }}
                        />
                        <TextField
                            disabled
                            id="outlined-password-input"
                            label="Senha:"
                            type="password"
                            sx={{ width: '80%' }}
                        />

                        <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                            <Button sx={{ width: '250px', backgroundColor: '#00509d', '&:hover': { backgroundColor: '#003566' }, }} variant="contained">
                                Editar Perfil
                            </Button>

                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Footer />

        </Box>
    )
}

export default PaginaPerfil