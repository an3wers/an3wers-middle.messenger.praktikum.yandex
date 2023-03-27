/* eslint-disable no-restricted-syntax */
/* eslint-disable default-case */
import Router from './core/router/router'
import { SigninPage } from './pages/signin/signin'
import { SignupPage } from './pages/signup/signup'
import { HomePage } from './pages/home/home'
import { ProfilePage } from './pages/profile/profile'
import authController from './controllers/authController'
import { NotfoundPage } from './pages/400/400'
import './style/main.css'

// eslint-disable-next-line no-shadow
export enum Routes {
  Index = '/',
  Signup = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger',
  NotFound = '/404'
}

var a = 0

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, SigninPage)
    .use(Routes.Signup, SignupPage)
    .use(Routes.Settings, ProfilePage)
    .use(Routes.Messenger, HomePage)
    .use(Routes.NotFound, NotfoundPage)

  let isProtectedRoute = true

  const path = window.location.pathname

  switch (path) {
    case Routes.Index:
    case Routes.Signup:
    case Routes.NotFound:
      isProtectedRoute = false
      break
    case Routes.Messenger:
    case Routes.Settings:
      isProtectedRoute = true
      break
    default:
      Router.go(Routes.NotFound)
  }

  try {
    await authController.fetchUser()

    Router.start()

    if (!isProtectedRoute) {
      Router.go(Routes.Messenger)
    }
  } catch (e) {
    Router.start()

    if (isProtectedRoute) {
      Router.go(Routes.Index)
    }
  }
})
