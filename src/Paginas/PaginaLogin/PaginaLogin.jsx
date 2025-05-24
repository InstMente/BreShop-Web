import { Box, Button, Container, Link, Stack, TextField, Typography } from '@mui/material'
import Header from '../../componentes/Header/Header'
import Footer from '../../componentes/Footer/Footer'

function PaginaLogin() {
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
                        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', color: "#003566" }}>LOGIN</h1>

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
                            id="outlined-password-input"
                            label="Senha:"
                            type="password"
                            autoComplete="current-password"
                            sx={{ width: '300px' }}
                        />
                        <Typography sx={{ color: '#003566' }}>Esqueceu a senha? <a style={{ color: '#003566' }} href='/recuperacaoSenha'>Clique Aqui</a></Typography>
                        <Stack sx={{display:'flex', justifyContent:'center', alignItems:'center', gap: 2}}>
                            <Button sx={{ width: '250px', backgroundColor: '#00509d', '&:hover': { backgroundColor: '#003566' }, }} variant="contained">
                                Logar
                            </Button>
                            <Typography sx={{ color: '#003566' }}>Não possui conta? <a style={{ color: '#003566' }} href='/cadastro'>Cadastra-se</a></Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </Box>
    )
}

export default PaginaLogin
