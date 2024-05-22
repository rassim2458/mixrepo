import React from 'react'
import { Box, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';

import { useDispatch } from 'react-redux';
import { UpdateSidebarType } from '../redux/slices/groupe';
import { CaretLeft, X } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import { SHARED_DOCS, SHARED_LINKS } from '../data';
import {DocMsg, LinkMsg} from './Conversation/MsgTypes'

import { MembersList } from '../data';

import { Avatar, Badge,} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import StyledBadge from './StyledBadge';
import MemberElement from './MemberElement';
import MemberElementNo from './MemberElementNo';



const Members = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
const admin = true;
  return (
    <Box sx={{
        position: "relative", width: 320, height: "100%",
        backgroundColor: theme.palette.mode === 'light' ? "#F8FAFF" : theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
      }}>
        <Stack sx={{height:'100%'}}>
        {/* Header */}
        <Box sx={{
          boxShadow: '0px 0px 2px rgba(0.25)',
          width: '100%',
          backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background
        }}>
          <Stack sx={{height:'100%', p:2}} direction='row' alignItems='center' spacing={3}>
             <IconButton onClick={()=>{
              dispatch(UpdateSidebarType('CONTACT'));
            }}>
              <CaretLeft/>
            </IconButton>
            <Typography variant='subtitle2'>Members</Typography>
           
          </Stack>
        </Box>

        {/* Body */}
        <Stack className='scrollbar' sx={{height:'100%', position:'relative', flexGrow:1, overflowY:'scroll'}} p={3}
        spacing={3}>
        
       
        {MembersList.map((el) => {
             return <MemberElement {...el} />}
)}
       
      
            
      
        </Stack>
        </Stack>
    </Box>
  )
}

export default Members