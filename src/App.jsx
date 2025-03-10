import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/login'
import Home from './components/Home'
import TeacherPage from './components/TeacherPage'
import StudentPage from './components/StudentPage'
import Protected from './components/Protected'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected><Home /></Protected>,
    children: [
      {
        path: '/teacher',
        element: <TeacherPage/>
      },
      {
        path: '/student',
        element: <StudentPage/>
      }
    ]
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />
  },
])

function App() {
  return (
    <>
      <div className='rootContainer'>
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
