import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import NoChat from "../../assets/Illustration/NoChat";
import { fetchConversationMessages, fetchConversations, fetchUserInfo } from "../../services/conversationdata";
import { useState, useRef } from "react";
import conversation from "../../redux/slices/conversation";
import io from 'socket.io-client';
import { setSocketId , removeSocketId} from "../../redux/slices/socketId";
import { jwtDecode } from "jwt-decode"
import { setCurrentUserId } from "../../redux/slices/app";
import { SocketContext } from "../../contexts/SocketContext";


const GeneralApp = () => {
  const socketRef = useRef();
  const dispatch = useDispatch();
  const theme = useTheme();

  //get token
  const currentuser = "664a811cdc0cd2557f81c2c6";
  dispatch(setCurrentUserId(currentuser));
  console.log("currentuserid",currentuser);


  
  var [room_id, setRoomId] = useState(null);
  const [user,setUser] = useState(null);
  const [isChatClicked, setIsChatClicked] = useState(false);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:5000', {
        query: {
          userId: currentuser
        }
      });
    }

    const socket = socketRef.current;

    const handleConnect = () => {
      console.log('client connected to server');
      socket.emit("user_connected", {connectedUserId: currentuser, socketId: socket.id});
    };

    const handleDisconnect = () => {
      console.log('client disconnected');
    };

    const handleNewMessage = (newMessage) => {
      console.log("emit socket")
    };

    const handleUserSocketIdsUpdated = (updatedUserSocketIds) => {
      console.log('Received updated userSocketIds:', updatedUserSocketIds);
      for (let userId in updatedUserSocketIds) {
        const socketId = updatedUserSocketIds[userId];
        dispatch(setSocketId({ userId, socketId }));
      }
    };

    socket.on('connect', handleConnect);
    socket.on('update', handleUserSocketIdsUpdated);
    socket.on('disconnect', handleDisconnect);
    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off("connect",handleConnect);
      socket.off("disconnect",handleDisconnect);
      socket.off('newMessage', handleNewMessage);
    };
  }, []);

  const socketIdMap = useSelector((state) => state.socketId.socketIdMap);

  const handleChatElementClick = (Chat_id) => {
    setRoomId(prevRoomId => {
      const newRoomId = Chat_id;
      return newRoomId;
    });
    setIsChatClicked(true);
  };

  const result = useQuery(['conversationsAndUserInfo', currentuser], async () => {
    const conversations = await fetchConversations(currentuser);
    const otherUserIds = conversations.reduce((ids, conversation) => {
      const otherUser = conversation.members.find(memberId => memberId !== currentuser);
      if (otherUser) {
        ids.push(otherUser);
      }
      return ids;
    }, []);

    const userInfo = await Promise.all(otherUserIds.map(id => fetchUserInfo(id)));
    const messages = await Promise.all(conversations.map(conversation => fetchConversationMessages(conversation._id)));
    const flatmessages = messages.flat()
    const sortedMessages = flatmessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const mostRecentMessageChatId = sortedMessages[0].ChatId;
    setRoomId(mostRecentMessageChatId);
    return { conversations, userInfo, messages,mostRecentMessageChatId };
  });

  const { sidebar, chat_type} = useSelector((store) => store.app);

  return (
    <SocketContext.Provider value={socketRef.current}>
      <Stack direction='row' sx={{ width: '100%' }}>
        <Chats userId={currentuser} setUser={setUser}  data={result.data} handleChatElementClick={handleChatElementClick} />
        <Box sx={{
          height: '100%', width: sidebar.open ? 'calc(100vw - 740px)' : 'calc(100vw - 420px)',
          backgroundColor: theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.default
        }}>
          {isChatClicked && room_id !== null && chat_type === "individual" ?  <Conversation socket={socketRef.current} userId={currentuser} user={user} data={result.data} /> :
            <Stack spacing={2} sx={{ height: "100%", width: "100%" }} alignItems="center" justifyContent={"center"}>
              <NoChat />
              <Typography variant="subtitle2">
                Select a conversation
              </Typography>
            </Stack>
          }
        </Box>
        {sidebar.open && (() => {
          switch (sidebar.type) {
            case 'CONTACT':
              return <Contact user={user} />
            case 'SHARED':
              return <SharedMessages />
            default:
              break;
          }
        })()}
      </Stack>
    </SocketContext.Provider>
  );
};

const queryClient = new QueryClient();

const GeneralAppWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <GeneralApp />
  </QueryClientProvider>
);

export default GeneralAppWithQueryClient;