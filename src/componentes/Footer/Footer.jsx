import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#003566',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              BreShop E-commerce
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Sua loja online confiável com os melhores produtos e preços competitivos.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                href="https://instagram.com/bre.shoponline" 
                target="_blank" 
                aria-label="Instagram"
                sx={{ color: 'white' }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                href="https://github.com/InstMente" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{ color: 'white' }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton 
                href="mailto:breshopcommerce.com.br@gmail.com" 
                aria-label="Email"
                sx={{ color: 'white' }}
              >
                <EmailIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Links Rápidos
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Início
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Sobre Nós
            </Link>
          </Grid>

          {/* Policies */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Políticas
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Termos de Serviço
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" mb={1}>
              Privacidade
            </Link>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Contato
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: breshopcommerce.com.br@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Telefone: (48) 99123-5088
            </Typography>
            <Typography variant="body2">
              Horário: Seg-Sex, 9h-20h
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.12)', 
          mt: 4, 
          pt: 3,
          textAlign: 'center'
        }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} BreShop E-commerce. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;