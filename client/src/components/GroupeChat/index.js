import {  Box, Stack} from '@mui/material';
import React from 'react';
import { useTheme } from "@mui/material/styles";
import Headerr from './Headerr';
import Footerr from './Footerr';
import Messagee from './Messagee';

const Conversationn = () => {
    const theme = useTheme();
  return (
    <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>

        {/* Chat header */}
        <Headerr />
        {/* Msg */}
        <Box className='scrollbar' width={"100%"} sx={{flexGrow:1, height:'100%', overflowY:'scroll'}}>
        <Messagee menu={true}/>
        </Box>
        {/* Chat footer */}
       <Footerr />
    </Stack>
  )
}

export default Conversationn