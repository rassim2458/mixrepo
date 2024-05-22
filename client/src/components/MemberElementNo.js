import { Avatar, Badge, Box, Stack, Slide, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import StyledBadge from './StyledBadge';
import { Crown, XCircle } from 'phosphor-react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react';







const MemberElementNo = ({ id, name, img, online, admin }) => {
    const theme = useTheme();

    return (

        <Box sx={{
            width: "100%",
            borderRadius: 1,
            backgroundColor: theme.palette.mode === 'light' ? "#fff" : theme.palette.background.default
        }}
            p={2}>


            <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
                <Stack direction='row' spacing={2} alignItems={'center'}>
                    {online ? <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot">
                        <Avatar src={img} />
                    </StyledBadge> : <Avatar src={img} />}


                    <Typography variant='subtitle3'>
                        {name}
                    </Typography>
                </Stack>
                {{ admin } ?
                    <Crown /> : <Box></Box>
                }
            </Stack>








        </Box>



    )
}

export default MemberElementNo