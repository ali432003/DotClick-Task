import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';


export default function AdminModal({open,settings}) {
    const [data,setData] = React.useState({
        email:"",
        password:""
    })
    const nav = useNavigate()
    const login = async()=>{
        try {
            const res = await axios.post(`${BASE_URL}/loginAdmin`,data)
            if(res.data.status){
                localStorage.setItem("admin",res.data.data._id)
                console.log(res.data)
                nav("/dashboard")
                return
            
            }
            console.log(res.data.messsage)
        } catch (error) {
            console.log(error.messsage)
        }
        
    }
  
  return (
    <React.Fragment>
      
      <Modal open={open} >
        <ModalDialog>
            
          <DialogTitle className='flex justify-between mb-2'>Admin Login Panel<p onClick={()=>settings(false)} ><CloseIcon/></p></DialogTitle>
          <DialogContent>Fill in the information</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              settings(false);
              login()
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input autoFocus required  type='email' onChange={(e)=>setData({...data,email:e.target.value})}/>
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input required type='password' onChange={(e)=>setData({...data,password:e.target.value})}/>
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
