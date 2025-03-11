import { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import '../Css/SignUp.css'
import { toast } from 'react-toastify';
import axios from 'axios'
import { regexEmail, regexPassword } from '../StaticData/regex';
import { errorObj, userObj } from '../StaticData/staticObj';
import InputCom from '../CommonComponent/InputCom';
import ButtonCom from '../CommonComponent/ButtonCom';

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
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: "center", padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: "20px" }}>Login </h1>
        <label htmlFor='email'>Email:</label> <span className='error'>{error.emailError}</span> <br />
        <InputCom type='email' value={user.email}  onChange={(e) => handleChange(e)} id='email' name='email'/>
        <br/>
        <label htmlFor='password'>Password:</label> <span className='error'>{error.passwordError}</span> <br />
        <InputCom type='password' value={user.password} onChange={(e) => handleChange(e)} id='password' name='password' /> <br />
        <div style={{ textAlign: 'center', marginBottom: "20px" }}>
        <ButtonCom text='Submit' type='submit'/>
        </div>
        <p><Link to='/forgetPassword'>Forget password</Link></p>
        <br/>
              <p>If you are not SingUp yet?  <Link to='/signup'> SignUp</Link></p>
      </form>
    </div>
  )
}

export default Login

