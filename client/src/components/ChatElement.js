import { Avatar, Badge, Box, IconButton, Stack, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import StyledBadge from './StyledBadge';
import { useDispatch } from 'react-redux';
import { SelectConversation } from '../redux/slices/app';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
//single chat element
const ChatElement = ({roomId,handleChatElementClick, userInfo,conversations,Chat_id, name, img, msg, time, online, unread, setUser }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  //const current_userId =  useSelector((state) => state.app.currentUserId); 
  const current_userId ="664a811cdc0cd2557f81c2c6";
  
  
  //onst [selectedConversation, setSelectedConversation] = useState(null);
  console.log("userinfo from chatelement",userInfo);
  console.log("conversations coming from chats displayed in chatelement",conversations)
  
    //const handleChatElementClick = () => {
    //  handleRoomSelect(roomId)
   // dispatch(SelectConversation({ room_id: Chat_id }));
  //};
 
  const otherUserId = conversations.find(conv => conv._id === Chat_id).members.find(member => member !== current_userId);
  console.log("otheruserid after search",otherUserId)
  // Retrieve User Information and Display the User's First Name
  const otherUserInfo = userInfo.find(user => user._id === otherUserId);
  console.log("otheruserinfo in chatelement after check",otherUserInfo);
  //const otherUserFirstName = otherUserInfo ? otherUserInfo.firstname : '';
  //console.log("otherUserInfo ----------> ",otherUserInfo);
  return (
    <Box onClick={() => {
      console.log("you clicked on :",Chat_id);
      const clickedConversation = conversations.find(conv => conv._id === Chat_id);
      console.log("clickedconversation value:",clickedConversation);
      
      
      console.log("conversation value true");
      const otherUser = clickedConversation.members.find(member =>member !== current_userId)
      console.log("otheruserinsideif",otherUser);
      
      console.log("editedotheruser",otherUser);
      const user = userInfo.find(user => user._id === otherUser);
      console.log("you clicked on the conversation with: ",user);
      setUser(user);
      //console.log("this is roomid chatelement",roomId);
      dispatch(SelectConversation({room_id: Chat_id}))
      //handleRoomSelect(Chat_id)
      handleChatElementClick(Chat_id)
      
    }}
      style={{ cursor: 'pointer' }}
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === 'light' ? "#fff" : theme.palette.background.default
      }}
      p={2}>

      <Stack direction="row" alignItems='center' justifyContent='space-between'>
        <Stack direction='row' spacing={2}>
          {online ? <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot">
            <Avatar src={img} />
          </StyledBadge> : <Avatar src={img} />}

          <Stack spacing={0.3}>
            <Typography variant='subtitle2'>
              {name}
            </Typography>
            <Typography variant='caption'>
              {msg}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems='center'>
          <Typography sx={{ fontWeight: 600 }} variant='caption' >
            {time}
          </Typography>
          <Badge color='primary' badgeContent={unread}>

          </Badge>
        </Stack>


      </Stack>


    </Box>

  )
};

export default ChatElement 