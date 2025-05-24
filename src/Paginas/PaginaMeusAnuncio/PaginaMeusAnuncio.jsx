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
        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
          <ArrowBackIosNewIcon
            onClick={() => navigate('/home')}
            sx={{ ml: 2, color: '#003566', fontSize: '25px', mr: 1 }}
          />
          <Typography variant="h5" sx={{ fontWeight: 70 }}>Voltar</Typography>
        </Box>

        <Container sx={{ mt: 2, width: '100vw', height: '55vh', display: 'flex', justifyContent: 'center', background: 'linear-gradient(195deg, #003566 50%,rgb(43, 36, 33) 100%)', borderRadius: '16px' }}>
          <Box
            component='img'
            src="/image.png"
            sx={{ height: '250px', marginTop: '3%', marginRight: 20 }}
          />
          <Box p={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField disabled label='Titulo:' type="text" sx={{ backgroundColor: 'white', width: '40vw', borderRadius: '12px' }} />
              <TextField disabled label='Descrição:' type="text" sx={{ backgroundColor: 'white', width: '40vw', borderRadius: '12px' }} />
              <TextField disabled label="Preço:" type="number" sx={{ backgroundColor: 'white', width: '40vw', borderRadius: '12px' }} />
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button sx={{ width: '10vw', backgroundColor: '#CC5500', color: 'white', p: 1 }}>Editar</Button>
                <Button sx={{ width: '10vw', backgroundColor: 'rgba(240, 15, 15, 0.81)', color: 'white', p: 1 }}>DELETAR</Button>
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
