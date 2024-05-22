import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Slide, Stack, Typography} from '@mui/material'
import React, { useState } from 'react';
import {useTheme } from "@mui/material/styles";
import { Bell, Plus, CaretRight, Phone, Prohibit, Star,Users , Trash, VideoCamera, X ,SignOut} from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { ToggleSidebar, UpdateSidebarType } from '../redux/slices/groupe';
import { faker } from '@faker-js/faker';
import AntSwitch from './AntSwitch';
import '../css/global.css';
import AddMember from '../sections/main/AddMember';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LeaveDialog = ({open, handleClose}) =>{
  return (
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>leave group</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
       Are you sure you want to leave this group ?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Yes</Button>
    </DialogActions>
  </Dialog>
  )
}

const DeleteDialog = ({open, handleClose}) =>{
  return (
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>Delete this chat</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
       Are you sure you want to delete this chat?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Yes</Button>
    </DialogActions>
  </Dialog>
  )
}

const ContactGroupe = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openLeave, setOpenLeave] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseLeave= () =>{
    setOpenLeave(false);
  }

  const handleCloseDelete = () =>{
    setOpenDelete(false);
  }

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  return (
    <Box sx={{width:320, height:'100vh'}}>
      <Stack sx={{height:'100%'}}>
        {/* Header */}
        <Box sx={{
          boxShadow: '0px 0px 2px rgba(0.25)',
          width: '100%',
          backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background
        }}>
          <Stack sx={{height:'100%', p:2}} direction='row' alignItems='center'
           justifyContent='space-between' spacing={3}>
            <Typography variant='subtitle2'>Group Info</Typography>
            <IconButton onClick={()=>{
              dispatch(ToggleSidebar());
            }}>
              <X/>
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Stack className='scrollbar'  sx={{height:'100%', position:'relative', flexGrow:1, overflowY:'scroll'}} p={3}
        spacing={3}>
          <Stack alignItems={'center'} direction='row' spacing={2}>
            <Avatar src={faker.image.avatar()} alt={faker.name.firstName} sx={{height:64, width:64}}/>
            <Stack spacing={0.5}>
              <Typography variant='article' fontWeight={600}>
                {faker.name.fullName()}
              </Typography>
              
            </Stack>
          </Stack>
          <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
          </Stack>
          <Divider/>
          <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
            <Stack direction='row' spacing={2} alignItems={'center'}>
              <Users  size={21}/>
              <Typography variant='subtitle2'>Members</Typography>
            </Stack>
            <IconButton onClick={()=>{
              dispatch(UpdateSidebarType('Members'))
            }}><CaretRight/></IconButton>
          </Stack>
          <Divider/>
          <Button onClick={() => { setOpenDialog(true) }}>
                <Plus size={30} style={{ color: theme.palette.primary.main }} />
                <Typography variant='subtitle1'>Add Members</Typography>
          </Button>
          <Divider/>
          <Stack direction='row' alignItems={'center'} justifyContent='space-between' >
            <Typography variant='subtitle2'>Media, Links & Docs</Typography>
            <Button onClick={()=>{
              dispatch(UpdateSidebarType('SHARED'))
            }} endIcon={<CaretRight/>}>401</Button>
          </Stack>
          <Stack direction='row' spacing={2} alignItems={'center'}>
            {[1,2,3].map((el)=>(
              <Box>
                <img src={faker.image.food()} alt={faker.name.fullName()}/>
              </Box>
            ))}
          </Stack>
          <Divider/>
          <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
            <Stack direction='row' spacing={2} alignItems={'center'}>
              <Bell size={21}/>
              <Typography variant='subtitle2'>Mute Notifications</Typography>
            </Stack>
            <AntSwitch/>
          </Stack>
          <Divider/>
          
      
          <Stack direction='row' alignItems={'center'} spacing={2}>
            <Button onClick={()=>{setOpenLeave(true)}} startIcon={<SignOut/>} fullWidth variant='outlined'>
              Leave
            </Button >
            <Button onClick={()=>{setOpenDelete(true)}} startIcon={<Trash/>} fullWidth variant='outlined'>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openLeave && <LeaveDialog open={openLeave} handleClose={handleCloseLeave}/>}
      {openDelete && <DeleteDialog open={openDelete} handleClose={handleCloseDelete}/>}
      {openDialog && <AddMember open={openDialog} handleClose={handleCloseDialog} />}

    </Box>
  )
}

export default ContactGroupe