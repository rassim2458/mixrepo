import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import React, { useRef, useState } from 'react';
import { styled, useTheme } from "@mui/material/styles";
import { LinkSimple, PaperPlaneTilt, Smiley, Camera, File, Image, Sticker, User } from 'phosphor-react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
//import { socket } from "../../socket";
import { Socket } from 'socket.io-client';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../contexts/SocketContext';
//import { io } from 'socket.io-client';


const token = localStorage.getItem("token");
const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: '12px',
    paddingBottom: '12px',
  }
}));



const ChatInput = ({ openPicker, setOpenPicker, setValue, value, inputRef }) => {
  
  
  const [openAction, setOpenAction] = useState(false);
  return (
    <StyledInput inputRef={inputRef}
    value={value}
    onChange={(event) => {
      setValue(event.target.value);
    }} fullWidth placeholder='Write a message...' variant='filled' InputProps={{
      disableUnderline: true,
        startAdornment:
          <Stack sx={{ width: 'max-content' }}>
            <Stack sx={{ position: 'relative', display: openAction ? 'inline-block' : 'none' }}>
              
            </Stack>
            <InputAdornment>
              <IconButton onClick={() => {
                setOpenAction((prev) => !prev)
              }}>
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ,
        endAdornment: <InputAdornment>
          <IconButton onClick={() => {
            setOpenPicker(!openPicker);
          }}>
            <Smiley />
          </IconButton>
        </InputAdornment>
      }} />
    )
  }
  
function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}

const Footer = ({user, socket}) => {
  // const socket = React.useContext(SocketContext);
  const theme = useTheme();
  console.log("footer rendered");
  console.log("usr",user)
  //const socket = io('http://localhost:5000');
  const { room_id } = useSelector((state) => state.app);
  //const current_userId = useSelector((state) => state.app.currentUserId);
  const current_userId = "664a811cdc0cd2557f81c2c6";
  
  const [openPicker, setOpenPicker] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  
  //handle emoji click
  function handleEmojiClick(emoji) {
    const input = inputRef.current;
    
    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
        emoji +
        value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }

  const sendMessageMutation = useMutation(message =>
    fetch('http://localhost:5000/conversations/sendmessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(message),
    })
  );

  // map of userid -> socketid
  

  const sendMessage = () => {
    console.log("sent", value);
    console.log("userfooter",user);
    // Emit the message using socket
    //socket.emit("text_message", {
      // message: linkify(value),
      // conversation_id: room_id,
      // from: user_id,
      // to: current_conversation.user_id,
      //});
      
      
      const message = {
        SenderId: current_userId,
        Content: value,
        ReceiverId: user._id,
      };
      console.log("messageobject", message);
      socket.emit("NewMessage",message);
      
    //socket.emit('NewMessage', message);

    // Send the message to the server
    //sendMessageMutation.mutate(message);
    


    //get socket id of receiver if he's online 
    // Send the message to the server
    sendMessageMutation.mutate({
     SenderId: current_userId,
     Content: value,
     ReceiverId: user._id,
    });


        //// Clear the input after sending the message
    // Clear the input after sending the message
    setValue("");
  };

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Stack direction="row" alignItems={"center"} spacing={3}>
        <Stack sx={{ width: "100%" }}>
          {/* Chat Input */}
          <Box
            sx={{
              display: openPicker ? "inline" : "none",
              zIndex: 10,
              position: "fixed",
              bottom: 81,
              right: 100,
            }}
          >
            <Picker
              theme={theme.palette.mode}
              data={data}
              onEmojiSelect={(emoji) => {
                handleEmojiClick(emoji.native);
              }}
            />
          </Box>
          <ChatInput
            inputRef={inputRef}
            value={value}
            setValue={setValue}
            openPicker={openPicker}
            setOpenPicker={setOpenPicker}
          />
        </Stack>

        <Box
          sx={{
            height: 48,
            width: 48,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}
        >
          <Stack
            sx={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton onClick={sendMessage}>
              <PaperPlaneTilt color="#fff" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Footer;
