import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import Header from '../../componentes/Header/Header'
import Footer from '../../componentes/Footer/Footer'

function PaginaAnuncio() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
            <Header />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>

                    <Container maxWidth='lg' sx={{ display: 'flex', borderRadius: '10px', p: 3, backgroundColor: 'whitesmoke', height: '50vh', width: '900px', boxShadow: '0.5px 0.5px 3px 1px rgb(0, 0, 0,1)', flexDirection:'column', alignItems: 'center' }}>

                       <Box sx={{backgroundColor:'white', width:'100%', height: 225, display:'flex', alignItems:'center', justifyContent:'center', boxShadow: '0.5px 0.5px 3px 1px rgb(0, 0, 0,1)', borderRadius:'8px' }}>
                        <Box 
                        component='img'
                        src='/fiat.webp'
                        alt='img-produto'
                        sx={{width:'50%', height:'100%'}}
                        />

                       </Box>

                        <Box sx={{display:'flex', flexDirection:'column', mr:'70%', p: 2}}>

                        <Stack spacing={1}>
                        <h2 style={{fontFamily:'"Gill Sans", sans-serif', color:'#003566', fontWeight:'300px'}}>Nome:</h2> <Typography></Typography>
                        <h2 style={{fontFamily:'"Gill Sans", sans-serif', color:'#003566', fontWeight:'300px'}}>Descrição:</h2> <Typography></Typography>
                        <h2 style={{fontFamily:'"Gill Sans", sans-serif', color:'#003566', fontWeight:'300px'}}>R$</h2> <Typography></Typography>
                        </Stack>
                        </Box>
                       
                        <Button sx={{backgroundColor:'#003566', color:'white', p: 1.5, width:'60%', borderRadius:'10px', mt:'15px'}}>COMPRAR</Button>
            
                    </Container>
                    <Container maxWidth='lg' sx={{ display: 'flex', borderRadius: '10px', p: 5, backgroundColor: 'whitesmoke', height: '20vh', width: '900px', boxShadow: '0.5px 0.5px 3px 1px rgb(0, 0, 0, 1)', justifyContent:'space-around' }}>

                        <Box sx={{mr: 50}}>
                        <Stack spacing={1}>
                            <h3 style={{fontFamily:'"Gill Sans", sans-serif', color:'#003566', fontWeight:'300px'}}>Nome:</h3> <Typography></Typography>
                            <h3 style={{fontFamily:'"Gill Sans", sans-serif', color:'#003566', fontWeight:'300px'}}>Email:</h3> <Typography></Typography>
                            <h3 style={{fontFamily:'"Gill Sans", sans-serif', color:'#003566', fontWeight:'300px'}}>Número:</h3> <Typography></Typography>
                        </Stack>
                        </Box>
                        <Box sx={{mr: 60}}>
                            <Stack spacing={1}>

                            <h3 style={{fontFamily:'"Gill Sans", sans-serif', color:'#003566', fontWeight:'300px'}}>Cidade:</h3> <Typography></Typography>
                            <h3 style={{fontFamily:'"Gill Sans", sans-serif', color:'#003566', fontWeight:'300px'}}>Rua:</h3> <Typography></Typography>
                            <h3 style={{fontFamily:'"Gill Sans", sans-serif', color:'#003566', fontWeight:'300px'}}>CEP:</h3> <Typography></Typography>
                            </Stack>
                        </Box>
                    </Container>
                </Stack>
            </Box>
            <Footer />
        </Box>
    )
}

export default PaginaAnuncio