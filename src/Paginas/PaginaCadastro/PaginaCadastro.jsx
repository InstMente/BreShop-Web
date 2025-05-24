import { Box, Button, Container, Link, Stack, TextField, Typography } from '@mui/material'
import Header from '../../componentes/Header/Header'
import Footer from '../../componentes/Footer/Footer'

function PaginaCadastro() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
            <Header />
            <Box sx={{ flexGrow: 1, p: 10, overflowY: 'auto' }}>
                <Container sx={{
                    width: '400px',
                    backgroundColor: '#F2F0EF',
                    boxShadow: '4px 4px 4px 4px solid black',
                    borderRadius: '10px',
                }}>
                    <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4 }}>
                        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', color: "#003566" }}>Cadastro</h1>

                        <TextField
                            required
                            id="outlined-required"
                            label="Usuário:"
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Email:"
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            type='number'
                            label="Telefone:"
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            type='date'
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            type='number'
                            label="CPF:"
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            type='number'
                            label="CEP:"
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Cidade:"
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Bairro:"
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Rua:"
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            type='number'
                            label="Número:"
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Senha:"
                            type="password"
                            sx={{ width: '300px' }}
                        />
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Confirmar Senha:"
                            type="password"
                            sx={{ width: '300px' }}
                        />
                        <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                            <Button sx={{ width: '250px', backgroundColor: '#00509d', '&:hover': { backgroundColor: '#003566' }, }} variant="contained">
                                Cadastrar
                            </Button>
                            <Typography sx={{ color: '#003566' }}>Já possui conta? <a style={{ color: '#003566' }} href='/'>Entrar</a></Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </Box>
    )
}

export default PaginaCadastro
