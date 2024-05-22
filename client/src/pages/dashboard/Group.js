import { Box, Stack, Typography, Link, IconButton, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from 'phosphor-react';
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from '../../components/Scrollbar';
import '../../css/global.css';
import { socket } from "../../socket";
import { ChatList } from '../../data';
import ChatGroupElement from '../../components/ChatGroupeElement';
import CreateGroup from '../../sections/main/CreateGroup';
import Conversationn from '../../components/GroupeChat';
import NoChat from "../../assets/Illustration/NoChat";

import { useDispatch, useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";

import ContactGroupe from '../../components/ContactGroupe';

import Members from '../../components/Members';
import { fetchDirectConversations } from '../../redux/slices/conversationGroup';

const user_id = window.localStorage.getItem("user_id");

const Group = () => {
  const theme = useTheme();
  const {conversations2} = useSelector((state) => state.conversationn.group_chat);

  const dispatch = useDispatch();
  

  const { sidebar2, chat_type2, room_id2 } = useSelector((store) => store.app2);// access our store inside component


  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }
  // access our store inside component
  return (
    <>
      <Stack direction={'row'} sx={{ width: '100%' }}>
        {/* Left */}
        <Box sx={{
          height: '100vh',
          backgroundColor: (theme) => theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
          width: 270,
          boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
        }}>
          <Stack p={3} spacing={2} sx={{ maxHeight: '100vh' }}>
            <Stack>
              <Typography variant='h5'>Group</Typography>
            </Stack>
            <Stack sx={{ width: '100%' }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />
              </Search>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography variant='subtitle2' component={Link}>Create New Group</Typography>
              <IconButton onClick={() => { setOpenDialog(true) }}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack spacing={3} className='scrollbar' sx={{ flexGrow: 1, overflowY: 'scroll', height: '100%' }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.5}>
                  {/*  */}

                  {conversations2.map((el) => {
                    return <ChatGroupElement  {...el} />
                  })}


                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
        <Box sx={{
          height: '100%', width: sidebar2.open ? 'calc(100vw - 740px)' : 'calc(100vw - 420px)',
          backgroundColor: theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.default
        }}>
          {/* Conversation */}
          {room_id2 !== null && chat_type2 === "group" ? <Conversationn /> :
          <Stack spacing={2} sx={{ height: "100%", width: "100%" }} alignItems="center" justifyContent={"center"}>
            <NoChat />
            <Typography variant="subtitle2">
              Select a conversation
            </Typography>
          </Stack>
        }

        </Box>
        {/* Contact */}
        {sidebar2.open && (() => {
        switch (sidebar2.type) {
          case 'CONTACT':
            return <ContactGroupe />
          
            case 'Members':
              return <Members />

          case 'SHARED':
            return <SharedMessages />

          default:
            break;
        }
      })()}
      </Stack>
      {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog} />}
    </>
  )
}

export default Group