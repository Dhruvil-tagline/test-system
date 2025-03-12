import { useContext, useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import '../Css/SignUp.css'
import { toast } from 'react-toastify';
import { errorObj, userObj } from '../StaticData/staticObj';
import InputCom from '../CommonComponent/InputCom';
import ButtonCom from '../CommonComponent/ButtonCom';
import { postRequest } from '../utils/api';
import { validateEmail, validatePassword } from '../utils/validation';
import { AuthContext, useAuth } from '../Context/AuthProvider';

const Login = () => {
  const [user, setUser] = useState(userObj);
  const { setToken } = useAuth();

  const [error, setError] = useState(errorObj)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const validate = () => {
    const errors = {};
    errors.emailError = validateEmail(user.email);
    errors.passwordError = validatePassword(user.password);
    setError(errors);
    return Object.values(errors).every((val) => !val);
  }

  const isAuthenticated = async () => {
    console.log('function called');
    let response = await postRequest('Login', user)
      if (response.statusCode === 200) {
        console.log(response?.data?.role);
        console.log(response?.data?.token);
        // document.cookie = `token = ${response?.data?.token}`;
        setToken(response?.data?.token)
        setUser({ ...userObj });
        toast.success("Login successfully")
        navigate(`/${response?.data?.role}`)
      }
      else {
        toast.error('Invalid Credential')
      }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(errorObj);
    (validate()) && isAuthenticated();
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

