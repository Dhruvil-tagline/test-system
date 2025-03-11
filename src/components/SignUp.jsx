import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Css/SignUp.css'
import axios from 'axios';
import { toast } from 'react-toastify';

let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
let regexName = /^[a-zA-Z ]{3,30}$/;
const errorObj = {
  nameError: '',
  emailError: '',
  passwordError: '',
  roleError: ''
}
const userObj = {
  name: '',
  email: '',
  password: '',
  role: '',
}

const SignUp = () => {
  const [user, setUser] = useState(userObj);
  const navigate = useNavigate();
  const [error, setError] = useState(errorObj)
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const validate = () => {
    let flagValidate = false;
    if (!user.name) {
      setError((prev) => ({ ...prev, 'nameError': 'Name is required' }))
      flagValidate = true;
    }
    // else if (!regexName.test(user.name)) {
    //   setError((prev) => ({ ...prev, 'nameError': 'Name is not valid'}))
    //   flagValidate = true;
    // }
    if (!user.email) {
      setError((prev) => ({ ...prev, 'emailError': 'Email is required' }))
      flagValidate = true;
    }
    else if (!regexEmail.test(user.email)) {
      setError((prev) => ({ ...prev, 'emailError': 'Email is not valid' }))
      flagValidate = true;
    }
    if (!user.password) {
      setError((prev) => ({ ...prev, 'passwordError': 'Password is required' }))
      flagValidate = true;
    }
    // else if (!regexPassword.test(user.password)) {
    //   setError((prev) =>  ({ ...prev, 'passwordError': 'Password is too weak it ,it contains at least 8 character, one upperCase letter, one lowerCase letter,  one digit , one special character' }))
    //   flagValidate = true;
    // }
    if (!user.role) {
      setError((prev) => ({ ...prev, 'roleError': 'role is required' }))
      flagValidate = true;
    }
    return flagValidate;
  }
  const addUser = async () => {
    try {
      let data = await axios({
        url: "https://examination.onrender.com/users/SignUp",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: user,
      });
      let response = await data.data;
      if (response) {
        console.log(response)
      }
      if (response.statusCode === 200) {
        console.log(response);
        toast.success('Signup successfully')
        console.log(response?.data?.role)
        setUser({ ...userObj });
        navigate('/login');
      }
      else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Server Error')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(errorObj);
    (!validate()) && addUser()
    
  }
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', marginTop: "300px" }}>
      <form onSubmit={handleSubmit}>
        <h1>SignUp </h1>
        <label htmlFor='name'>Name:</label> <span className='error'>{error.nameError}</span> <br />
        <input type='text' id='name' name='name' value={user.name} onChange={(e) => handleChange(e)} /> <br />
        <label htmlFor='email'>Email:</label> <span className='error'>{error.emailError}</span> <br />
        <input type='email' value={user.email} onChange={(e) => handleChange(e)} id='email' name='email' /> <br />
        <label htmlFor='password'>Password:</label> <span className='error'>{error.passwordError}</span> <br />
        <input type='password' value={user.password} onChange={(e) => handleChange(e)} id='password' name='password' /> <br />
        <label htmlFor='role'>Role:</label> <span className='error'>{error.roleError}</span> <br />
        <select value={user.role} onChange={(e) => handleChange(e)} id='role' name='role'>
          <option value=''>Select role</option>
          <option value='teacher'>Teacher</option>
          <option value='student'>Student</option>
        </select><br />
        <button>SignUp</button>
        <p>If you are already SignUp than sing in <Link to='/login'> Login</Link></p>
      </form>
    </div>
  )
}

export default SignUp

