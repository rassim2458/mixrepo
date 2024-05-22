import { Box, Stack, Typography } from '@mui/material';
import { MagnifyingGlass } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import ChatElement from '../../components/ChatElement';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

const Chats = ({data,setUser,handleChatElementClick}) => {
  const theme = useTheme();
  
  const userId = "6626b9ee6bd62e977623db98"; 
  const { conversations = [], userInfo = [], messages = [] } = data || {};
  console.log("messages in chats from destructured result:",messages);

  return (
    <Box sx={{
      position: "relative", width: 270, height: "100%",
      backgroundColor: theme.palette.mode === 'light' ? "#F8FAFF" : theme.palette.background.paper,
      boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
    }}>
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack direction="row" alignItems='center' justifyContent='space-between'>
          <Typography variant='h5'>
            Chats
          </Typography>
        </Stack>

        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />
          </Search>
        </Stack>

        <Stack className='scrollbar' spacing={2} direction='column' sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}>
          <Stack spacing={2.4}>
            {conversations.map((el,index) => {
                const otherUserName = userInfo[index] ? `${userInfo[index].firstname} ${userInfo[index].lastname}` : '';
                //console.log(otherUserName);
                //const lastMessage = messages.find(msg => msg.ChatId === el._id);
                const flatMessages = messages.flat();
                const messagesInConversation = flatMessages.filter(msg => msg.ChatId === el._id);
                //const lastMessage = flatMessages.find(msg => msg.ChatId === el._id);
                const lastMessage = messagesInConversation.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
                const msgcontent = lastMessage.Content;
                console.log("last message :",lastMessage);
                const timestamp = lastMessage.timestamp;
                const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
               // const lastMessageContent = lastMessage[index] ? lastMessage[index].Content : 'No messages yet';
                //console.log('last message content:',lastMessageContent);
              return <ChatElement handleChatElementClick={handleChatElementClick} setUser={setUser} conversations={conversations} userInfo ={userInfo} Chat_id={el._id} name={otherUserName} img={el.img} msg={msgcontent} time={timeAgo} online="online" unread={el.unread}  />;
              
            })}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}



export default Chats;