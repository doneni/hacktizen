import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './error-page'
import Home, { loader as homeLoader } from './routes/home'
import Login from './routes/login'
import { Profile } from './routes/profile'
import Register from './routes/register'
import Root from './routes/root'
import Users, { loader as usersLoader } from './routes/users'
import Challenge from './routes/challenge'
import Story from './routes/story'
import Records from './routes/record'

export const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'users',
        element: <Users />,
        loader: usersLoader,
      },
      {
        path: 'challenge',
        element: <Challenge />,
      },
      {
        path: 'story',
        element: <Story />,
      },
      {
        path: 'records',
        element: <Records />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
