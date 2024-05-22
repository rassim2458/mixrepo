import React, { useState, useEffect, useRef } from 'react';
import { Box, Stack } from '@mui/material';
import { TextMsg } from './MsgTypes';
import { fetchConversationMessages } from '../../services/conversationdata';
import { useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';

const Message = ({ user, menu, data, selectedRoomId, socket }) => {
  //const current_userId = useSelector((state) => state.app.currentUserId);
  const current_userId = "664a811cdc0cd2557f81c2c6";
  const room_id = useSelector((state) => state.app.room_id);
  const messageListRef = useRef(null);
  const queryClient = useQueryClient();
  const [localMessages, setLocalMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false); // Loading state for messages

  const { data: messages_in_conversation, isLoading, refetch } = useQuery(
    ['messages', room_id],
    () => fetchConversationMessages(room_id),
    {
      enabled: !!room_id,
      onSuccess: (data) => {
        setLocalMessages(data);
      },
    }
  );

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    }, 130); // Adjust the delay as needed
  };

  useEffect(() => {
    if (socket) {
      const handleNewMessage = () => {
        console.log("New message received");
        setIsMessagesLoading(true);
        refetch().then(({ data }) => {
          console.log("Refetch complete", data);
          setLocalMessages(data);
          setIsMessagesLoading(false);
        }).catch(() => {
          setIsMessagesLoading(false);
        });
      };

      socket.on('NewMessage', handleNewMessage);

      return () => {
        socket.off('NewMessage', handleNewMessage);
      };
    }
  }, [socket, room_id, queryClient, refetch]);

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]); // Scroll to bottom whenever localMessages changes

  const sendMessage = (messageContent) => {
    socket.emit('sendMessage', { content: messageContent, roomId: room_id });

    setIsMessagesLoading(true);
    queryClient.invalidateQueries(['messages', room_id]);
    refetch().then(({ data }) => {
      setLocalMessages(data);
      setIsMessagesLoading(false);
    }).catch(() => {
      setIsMessagesLoading(false);
    });
  };

  if (isLoading || isMessagesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={3}>
      <Stack ref={messageListRef} spacing={3}>
        {localMessages && localMessages.map((message) => (
          <TextMsg
            key={message._id}
            el={{
              message: message.Content,
              incoming: message.SenderId !== current_userId
            }}
            menu={menu}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Message;
