import { Avatar, Box, Button, Dialog, Slide, DialogActions, DialogContent, DialogContentText, DialogTitle,Stack, Typography} from '@mui/material'
import { useTheme } from "@mui/material/styles";
import React, { useState } from 'react';
import {Prohibit} from 'phosphor-react';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Unblock this contact</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to unblock this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}
const Block = () => {

  const theme = useTheme();
  const [openBlock, setOpenBlock] = useState(false);
  const handleCloseBlock = () => {
    setOpenBlock(false);
  }

  return (
    <Box p={2} alignItems='center' sx={{
      width: '100%', backgroundColor: 
        theme.palette.background.paper, boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
    }}>



      <Stack direction='column' align="center" alignItems='center' justifyContent='space-between'>

        <Typography align="center" sx={{ color: theme.palette.text }}>
          You Blocked this contact
        </Typography>
        <Button onClick={() => { setOpenBlock(true) }}  variant='outlined'>
          Unblock
        </Button >
      </Stack>
      {openBlock && <BlockDialog open={openBlock} handleClose={handleCloseBlock} />}
    </Box>
  )
}

export default Block