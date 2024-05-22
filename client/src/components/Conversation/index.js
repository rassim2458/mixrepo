import {  Box, Stack} from '@mui/material';
import { useEffect, useState,useRef } from 'react';
import { useTheme } from "@mui/material/styles";
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import { DocMsg ,LinkMsg,MediaMsg,TimeLine, TextMsg} from './MsgTypes';
import { useQuery } from 'react-query';
import { fetchConversationMessages } from '../../services/conversationdata';
import { useSelector} from 'react-redux';

const Conversation = ({data,user,socket}) => {
  const { room_id } = useSelector((store) => store.app);
  const roomId = room_id;
  console.log("convrend")
  console.log("reduxroomid in conversation",roomId);
   
    console.log("userinconversation",user);
    const { conversations = [], userInfo = [], messages = [] } = data || {};
    console.log("userinfo from conversation:",userInfo);
    console.log("conversations in index(conversation) coming from generalapp",conversations);
    const theme = useTheme();

    
    const messagesContainerRef = useRef(null);


    useEffect(() => {
      scrollToBottom();
    }, []); // Add an empty dependency array to ensure it runs only once when the component mounts
  
    const scrollToBottom = () => {
      setTimeout(() => {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }, 130); // Adjust the delay as needed
    };

  return (
    <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>

        {/* Chat header */}
        <Header user={user} conversations={conversations} userInfo={userInfo}/>
        {/* Msg */}
        <Box  className='scrollbar' ref={messagesContainerRef} width={"100%"} sx={{flexGrow:1, height:'100%', overflowY:'scroll'}}>
        <Message  socket={socket} roomId={roomId} user={user} menu={true} data={data} />
       
        </Box>
        {/* Chat footer */}
       <Footer socket={socket} user={user}/>
    </Stack>
  )
}

export default Conversation