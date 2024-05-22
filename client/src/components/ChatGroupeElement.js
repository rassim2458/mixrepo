import { Avatar, Badge, Box, IconButton, Stack, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import StyledBadge from './StyledBadge';
import { useDispatch } from 'react-redux';
import { selectConversation } from '../redux/slices/groupe';

//single chat element
const ChatGroupElement = ({ id2, name, img, msg, time, online, unread }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (

    <Box onClick={() => {
      dispatch(selectConversation({ room_id2: id2 }));
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
          <Typography sx={{ fontWeight: 600 }} variant='caption'>
            {time}
          </Typography>
          <Badge color='primary' badgeContent={unread}>

          </Badge>
        </Stack>


      </Stack>


    </Box>

  )
};

export default ChatGroupElement