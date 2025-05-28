import { Stack, Box, Typography, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHub from '@mui/icons-material/GitHub'; 

function Footer() {
    return (
        <Stack spacing={2}>
            <Box
                sx={{
                    width: '100%',
                    height: '100px',
                    backgroundColor: '#003566',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    px: 4,
                }}
            >
                <Typography variant="body2" p={3}>
                    © 2025 BreShop E-commerce. Todos os direitos reservados.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link href="https://instagram.com/bre.shoponline" target="_blank" color="inherit">
                        <InstagramIcon />
                    </Link>
                    <Link href="https://github.com/InstMente" target="_blank" rel="noopener noreferrer" color="inherit">
                        <GitHub />
                    </Link>
                </Box>
            </Box>
        </Stack>
    );
}

export default Footer;
