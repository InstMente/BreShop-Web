import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material"
import Footer from "../../componentes/Footer/Footer"
import Header from "../../componentes/Header/Header"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";

function PaginaMeusAnuncio() {
  const navigate = useNavigate()
  return (
    <Box sx={{ m: 0, p: 0, height: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <Header />
      <Box flexGrow={1} sx={{ pb: 2, pt: 1 }}>

        <Button
          sx={{
            width: '9%',
            top: 10,
            color: '#003566',
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

        <Container sx={{ mt: 2, width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around', background: 'linear-gradient(195deg, #003566 50%,rgb(43, 36, 33) 100%)', borderRadius: '16px' }}>
          <Box
            component='img'
            src="/image.png"
            sx={{ width: '30%', display: 'flex', justifyContent: 'left' }}
          />

          <Box sx={{ p: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>

            <Stack spacing={2} sx={{ width: '90%', height: '70%', display: 'flex', flexDirection: 'column' }}>

              <TextField disabled label='Titulo:' type="text" sx={{ backgroundColor: 'white', width: '100%', borderRadius: '12px' }} />
              <TextField disabled label='Descrição:' type="text" sx={{ backgroundColor: 'white', width: '100%', borderRadius: '12px' }} />
              <TextField disabled label="Preço:" type="number" sx={{ backgroundColor: 'white', width: '100%', borderRadius: '12px' }} />

              <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', }}>
                <Button sx={{ width: '45%', height: '20%', backgroundColor: '#CC5500', color: 'white' }}>Editar</Button>
                <Button sx={{ width: '45%', height: '20%', backgroundColor: 'rgba(240, 15, 15, 0.81)', color: 'white' }}>DELETAR</Button>
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
