import { Box, Typography, Stack} from '@mui/material';
import { useTheme } from "@mui/material/styles";


const Blocked = () => {

    const theme = useTheme();

  return (
    <Box  p={2} alignItems='center' sx={{ width:'100%', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' :
    theme.palette.background.paper, boxShadow:'0px 0px 2px rgba(0,0,0,0.25)'}}>
   
  
       
   <Stack  direction='column'  sx={{width:'100%'}} alignItems='center' justifyContent='space-between'>
        
        <Typography fontSize={25} direction='row' alignItems='center' justifyContent='space-between' sx={{color: theme.palette.text }}>
            this contact Blocked you
        </Typography>
        
    </Stack>

</Box>
  )
}

export default Blocked