import { Avatar, Badge, Box, Stack, Slide, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import StyledBadge from './StyledBadge';
import { Crown, XCircle } from 'phosphor-react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const DeleteMember = ({ open, handleClose }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>kick this member</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to kick this member?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}




const MemberElement = ({ id, name, img, online, admin }) => {
    const theme = useTheme();
    const [openDelete, setOpenDelete] = useState(false);
    const handleCloseDelete = () => {
        setOpenDelete(false);
    }
    return (
       
        <Box sx={{
            width: "100%",
            borderRadius: 1,
            backgroundColor: theme.palette.mode === 'light' ? "#fff" : theme.palette.background.default
        }}
            p={2}>
            

                <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
                    <Stack direction='row' spacing={2} alignItems={'center'}>
                        {online ? <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot">
                            <Avatar src={img} />
                        </StyledBadge> : <Avatar src={img} />}


                        <Typography variant='subtitle3'>
                            {name}
                        </Typography>
                    </Stack>
                    
                     <XCircle style={{ cursor: 'pointer' }} size={25} onClick={() => { setOpenDelete(true) }} />
                    
                </Stack>


        




            {openDelete && <DeleteMember open={openDelete} handleClose={handleCloseDelete} />}
        </Box>

       

    )
}

export default MemberElement