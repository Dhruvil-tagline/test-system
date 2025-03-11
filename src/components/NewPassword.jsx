import axios from 'axios';
import React, {useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';


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
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', marginTop: "300px" }}>
          
          <form onSubmit={handleSubmit} >
          <h1>Reset Account password</h1>
          <br/>
              <input placeholder='New password' value={password} onChange={(e)=> setPassword(e.target.value)} /> <br/> <br/>
              <input placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirm(e.target.value)} /><br /> <br />
              <button>Submit</button>
          </form>
    </div>
  )
}

export default NewPassword
