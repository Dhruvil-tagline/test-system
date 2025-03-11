import axios from 'axios';
import React, {useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputCom from '../CommonComponent/InputCom';
import ButtonCom from '../CommonComponent/ButtonCom';


const NewPassword = () => {
    const [password, setPassword] = useState('');
    let token;
    const [searchParams] = useSearchParams();
    const [confirmPassword, setConfirm] = useState('');
    token = searchParams.get('token');

    const fetchData = async () => {
        try {
            const output = await axios({
                url: `https://examination.onrender.com/users/ForgotPassword/Verify?token=${token}`,
                data: { Password: password, ConfirmPassword: confirmPassword },
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const response = await output.data;
            if (response) {
                console.log(response)
            }
            if (response.statusCode === 200) {
                toast.success('password reset successfully.');
                console.log(response);
                document.cookie = `token = ${token}`;
            }
            else {
                toast.error(response?.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Server Error')
        }
    }
    const validate = () => {
        if (!password) {
            toast.error('password is required');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('password is not matched with confirm password');
            return false;
        }
        return true
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        (validate()) && fetchData()
    }
  return (
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: "center", padding: '20px' }}>
          
          <form onSubmit={handleSubmit} style={{ maxWidth: '500px', width: '100%' }}>
          <h1>Reset Account password</h1>
          <br/>
              <InputCom placeholder='New password' value={password} onChange={(e)=> setPassword(e.target.value)} /> 
              <InputCom placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirm(e.target.value)} />
              <ButtonCom text='Submit' type='submit'/>
          </form>
    </div>
  )
}

export default NewPassword
