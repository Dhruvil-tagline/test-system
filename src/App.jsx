import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/login'
import Home from './components/Home'
import { ToastContainer } from 'react-toastify';
import TeacherPage from './components/TeacherPage'
import StudentPage from './components/StudentPage'
import Protected from './components/Protected'
import ForgetPassword from './components/ForgetPassword'
import PageNotFound from './components/PageNotFound'
import NewPassword from './components/NewPassword'
import TeacherDashboard from './components/TeacherDashboard'
import TeacherStu from './components/TeacherStu'
import TeacherProfile from './components/TeacherProfile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected><Home /></Protected>,
    children: [
      {
        path: '/teacher',
        element: <TeacherPage />,
        children: [
          {
            path: '/teacher/dashboard',
            element: <TeacherDashboard />,
          },
          {
            path: '/teacher/student',
            element: <TeacherStu />,
          },
          {
            path: '/teacher/profile',
            element: <TeacherProfile />,
          }
        ]
      },
      {
        path: '/student/',
        element: <StudentPage/>,
      },
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
  {
    path: '/forgetPassword',            
    element: <ForgetPassword/>
  }, {
    path: '/newPassword',
    element: <NewPassword/>
  }
  , {
    path: '*',
    element: <PageNotFound />
  }
])

function App() {
  return (
    <>
      <div className='rootContainer'>
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
