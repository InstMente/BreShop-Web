import React from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';

function Header() {
    return (
        <Stack spacing={2}>
            <Box sx={{ width: '100%', height: '70px', backgroundColor: '#003566', display: 'flex', alignItems: 'center', paddingLeft: 2 }}>
                <Typography variant="h6" color="white">Header</Typography>
            </Box>
        </Stack>
    );
}

export default Header;
