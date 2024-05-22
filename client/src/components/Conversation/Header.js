import { Avatar, Box, Typography, IconButton, Divider, Stack, } from '@mui/material'
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react'
import React from 'react';
import { useTheme } from "@mui/material/styles";
import { faker } from '@faker-js/faker';
import StyledBadge from '../StyledBadge';
import { ToggleSidebar } from '../../redux/slices/app';
import { useDispatch } from 'react-redux';

const Header = ({conversations,userInfo,user}) => {
    console.log("userInfo in header",userInfo);
    console.log("userinheader:",user);
    console.log("conversations from header",conversations);
    const dispatch = useDispatch();
    const theme = useTheme();
    return (
        <Box p={2} sx={{ width: '100%', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper, boxShadow: '0px 0px 2px rgba(0,0,0,0.25)' }}>
            <Stack alignItems={'center'} direction='row' justifyContent={'space-between'}
                sx={{ width: '100%', height: '100%' }}>
                <Stack direction={'row'} spacing={2}>
                    <Box>
                        <StyledBadge overlap="circular"
                            anchorOrigin={{ // position
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            variant="dot">
                            <Avatar  src={user ? user.picturePath : ''}/>
                        </StyledBadge>

                    </Box>
                    <Stack spacing={0.2}>
                        <Typography variant='subtitle2'>
                                {user ? `${user.firstname} ${user.lastname}` : 'No user selected'}
                        </Typography>
                        <Typography variant='caption'>
                            Online
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction='row' alignItems='center' spacing={3}>
                    
                    <IconButton>
                        <Phone />
                    </IconButton>
                    <IconButton>
                        <MagnifyingGlass />
                    </IconButton>
                    <Divider orientation='vertical' flexItem />
                    <IconButton onClick={() => {
                    dispatch(ToggleSidebar());
                    }}>
                        <CaretDown />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Header