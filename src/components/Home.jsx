import { toast } from 'react-toastify'
import { Outlet, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    document.cookie = ('token =')
    navigate('/login')
    toast.success('Logout Successfully')
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
          <h1>Home page</h1>
          <Outlet/>
    </div>
  )
}

export default Home
