import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import FormProvider from '../../components/hook-form/FormProvider';
import { RHFTextField } from '../../components/hook-form';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';
import { multiple } from './../../components/Conversation/MsgTypes';

const MEMBERS = ['Name 1', 'Name 2', 'Name 3' ];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const AddMemberForm = ({handleClose}) =>{
  const NewGroupSchema = Yup.object().shape({
    members: Yup.array()
  });

  const defaultValues = {
    members:[]
  }

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues
  });

  const {reset, watch, setError, handleSubmit, formState:{errors, isSubmitting, isSubmitSuccessful, isValid}}
   = methods;

   const onSubmit = async (data) => {
    try {
      //api call
      console.log('Data',data);
    } catch (error) {
      console.log(error);
    }
   };

   return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFAutocomplete name='members' label='Members' multiple freeSolo 
        options={MEMBERS.map((option) => option)} ChipProps={{size: 'medium'}}/>
        <Stack spacing={2} direction='row' alignItems='center' justifyContent='end'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} type='submit' variant='contained'>
            Add
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
   )
};

const AddMember = ({open, handleClose}) => {
  return (
    <Dialog fullWidth maxWidth='xs' open={open} TransitionComponent={Transition} keepMounted sx={{p:4}}>
        {/* Title */}
        <DialogTitle sx={{mb:3}}>Add New Members</DialogTitle>
        {/* Content */}
        <DialogContent>
          {/* Form */}
          <AddMemberForm handleClose={handleClose}/>
        </DialogContent>
    </Dialog>
  )
}

export default AddMember