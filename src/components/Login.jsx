import { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import '../Css/SignUp.css'
import { toast } from 'react-toastify';
import axios from 'axios'

let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
const errorObj = {
  emailError: '',
  passwordError: '',
}
const userObj = {
  email: '',
  password: '',
}

const Login = () => {
  const [user, setUser] = useState(userObj);
  const [error, setError] = useState(errorObj)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
    
  const validate = () => {
    let flagValidate = false;
    if (!user.email) {
      setError((prev) => ({ ...prev, 'emailError': 'Email is required' }))
      flagValidate = true;
    }
    else if (!regexEmail.test(user.email)) {
      setError((prev) =>  ({ ...prev, 'emailError': 'Email is not valid' }))
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
    return flagValidate;
  }

  const isAuthenticated = async () => {
    console.log('function called')
    try {
      let data = await axios({
        url: 'https://examination.onrender.com/users/Login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(user)
      });
      let response = await data.data;
      if (response.statusCode === 200) {
        console.log(response?.data?.role);
        console.log(response?.data?.token);
        document.cookie = `token = ${response?.data?.token}`;
        setUser({ ...userObj });
        toast.success("Login successfully")
        navigate(`/${response?.data?.role}`)
      }
      else {
        toast.error('Invalid Credential or first visit mail and allow for access')
      }
    } catch (error) {
      toast.error('Server Error')
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(errorObj);
    (!validate()) && isAuthenticated();
  }
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', marginTop: "300px" }}>
      <form onSubmit={handleSubmit}>
        <h1>Login </h1>
        <label htmlFor='email'>Email:</label> <span className='error'>{error.emailError}</span> <br />
        <input type='email' value={user.email} onChange={(e) => handleChange(e)} id='email' name='email' /> <br />
        <label htmlFor='password'>Password:</label> <span className='error'>{error.passwordError}</span> <br />
        <input type='password' value={user.password} onChange={(e) => handleChange(e)} id='password' name='password' /> <br />
        <button>Login</button>
        <p><Link to='/forgetPassword'>Forget password</Link></p>
              <p>If you are not SingUp yet then  <Link to='/signup'> SignUp</Link></p>
      </form>
    </div>
  )
}

export default Login

