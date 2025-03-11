import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import InputCom from '../CommonComponent/InputCom';
import ButtonCom from '../CommonComponent/ButtonCom';
let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgetPassword = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const searchUser = async () => {
        try {
            const output = await axios({
                url: "https://examination.onrender.com/users/ForgotPassword",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({ email: search }),
            })
            const response = await output.data;
            if (response.statusCode === 200) {
                console.log(response);
                toast.success('Mail successfully send to you account. reset password and than go to login page')
            }
            else {
                toast.error('User not find! try another email id or sign up')
            }
        } catch (error) {
            console.log(error);
            toast.error('Server Error')
        }
    }
    const handleSubmit = (e) => {
        setError('')
        e.preventDefault()
        if (!search) {
            setError('Email is required');
        }
        else if (!regexEmail.test(search)) {
            setError('enter valid emil');
        }
        else {
            searchUser();
        }   
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: "center", padding: '20px' }}>
            <form onSubmit={handleSubmit} onReset={() => { setSearch(''); setError('') }} style={{ maxWidth: '500px', width: '100%' }}>
                    <h1>Find Your Account</h1> <br />
                    <p>Please enter your email address  to search for your account.</p>
                    <InputCom type='email' name='search' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <span>{error}</span>
                    <div style={{display:'flex', gap:'20px'}}>
                    <ButtonCom style={{ display: 'inline-block', marginRight: '20px' }} text='Search' />
                     <ButtonCom onClick={() => navigate(-1)} text='Back'/>
                    </div>
                </form> 

        </div>
    )
}

export default ForgetPassword
