
import { QueryClient, QueryClientProvider, useQuery, useQueries } from 'react-query';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { ChatList } from '../../data';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import ChatElement from '../../components/ChatElement';
import { socket } from '../../socket';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDirectConversations } from "../../redux/slices/conversation";
import { fetchConversations, fetchUserInfo } from '../../services/conversationdata.js';


const Chats = () => {
  const theme = useTheme();
  const userId = "6626b9ee6bd62e977623db98";

  const result = useQuery(['conversationsAndUserInfo', userId], async () => {
    const conversations = await fetchConversations(userId);
    const otherUserIds = conversations.reduce((ids, conversation) => {
      const otherUser = conversation.members.find(memberId => memberId !== userId);
      if (otherUser) {
        ids.push(otherUser);
      }
      return ids;
    }, []);
    const userInfo = await Promise.all(otherUserIds.map(id => fetchUserInfo(id)));
    return { conversations, userInfo };
  });

  const { conversations = [], userInfo = [] } = result.data || {};

  console.log("user info: ",userInfo);
  console.log("conversations :",conversations);

  return (
    <Box sx={{
      position: "relative", width: 320, height: "100%",
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
              return <ChatElement key={el.id} id={el.id} name={otherUserName} img={el.img} msg={el.msg} time={el.time} online="online" unread={el.unread} {...el} />;
            })}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

const queryClient = new QueryClient();

const ChatsWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <Chats />
  </QueryClientProvider>
);

export default ChatsWithQueryClient;