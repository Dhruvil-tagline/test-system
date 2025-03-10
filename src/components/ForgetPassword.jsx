import React, { useState } from 'react'
import axios from 'axios';
let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgetPassword = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const searchUser = async () => {
        try {
            const output = await axios({
                url: "https://examination.onrender.com/users/ForgotPassword",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(search),
            })
            const response = await output.data;
            if (response) {
                console.log(response)
            }
        } catch (error) {
            console.log(error);
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
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', marginTop: "300px" }}>
            <form onSubmit={handleSubmit} onReset={() => { setSearch(''); setError('') }}>
                <h1>Find Your Account</h1>
                <p>Please enter your email address  to search for your account.</p>
                <input type='email' name='search' value={search} onChange={(e) => setSearch(e.target.value)} />
                <span>{error}</span>
                <br/>
                <button>Search</button>
                <button type="reset">Cancel</button>
            </form>
        </div>
    )
}

export default ForgetPassword
