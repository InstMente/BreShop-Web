import React from 'react';
import { Stack, Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Stack spacing={2}>
            <Box sx={{
                width: '100%',
                height: '70px',
                backgroundColor: '#003566',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant="body1" color="white">Footer</Typography>
            </Box>
        </Stack>
    );
}

export default Footer;
