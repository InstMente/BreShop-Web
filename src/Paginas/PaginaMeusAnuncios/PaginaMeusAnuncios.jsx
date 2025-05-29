import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material"
import Footer from "../../componentes/Footer/Footer"
import Header from "../../componentes/Header/Header"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";

function PaginaMeusAnuncio() {
  const navigate = useNavigate()
  return (
    <Box sx={{ m: 0, p: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <Header />
      <Box flexGrow={1}>

      <Button
                sx={{
                    width: '7%',
                    top: 20,
                    left: 20,
                    color: '#003566',
                    p: 1.2,
                    borderRadius: '8px',
                    zIndex: 10
                }}
                onClick={() => navigate('/home')}
            >
                <ArrowBackIosNewIcon
                    onClick={() => navigate('/home')}
                    sx={{ ml: 2, color: '#003566', fontSize: '25px', mr: 1 }}
                />
                Voltar
            </Button>

        <Container sx={{ mt: 2, width: '100vw', height: '50vh', display: 'flex', justifyContent: 'center', background: 'linear-gradient(195deg, #003566 50%,rgb(43, 36, 33) 100%)', borderRadius: '16px' }}>

          <Box
            component='img'
            src="/image.png"
            sx={{ height: '290px', marginTop: '5%', marginRight: 5 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>

              <TextField disabled label='Titulo:' type="text" sx={{ backgroundColor: 'white', width: '40vw', borderRadius: '12px' }} />
              <TextField disabled label='Descrição:' type="text" sx={{ backgroundColor: 'white', width: '40vw', borderRadius: '12px' }} />
              <TextField disabled label="Preço:" type="number" sx={{ backgroundColor: 'white', width: '40vw', borderRadius: '12px' }} />

              <Stack direction="row" spacing={2} justifyContent="center" >
                <Button sx={{ width: '10vw', backgroundColor: '#CC5500', color: 'white', p: 1.5, top: '30px' }}>Editar</Button>
                <Button sx={{ width: '10vw', backgroundColor: 'rgba(240, 15, 15, 0.81)', color: 'white', p: 1.5, top: '30px' }}>DELETAR</Button>
              </Stack>

            </Stack>

          </Box>

        </Container>

      </Box>

      <Footer />

    </Box>
  )
}

export default PaginaMeusAnuncio
