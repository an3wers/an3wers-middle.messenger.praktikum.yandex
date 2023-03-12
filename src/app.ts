// import { renderDom, render } from './core/renderDom'
import Router from './core/router/router'
import { SigninPage } from './pages/signin/signin'
import { SignupPage } from './pages/signup/signup'
import { HomePage } from './pages/home/home'
import { ProfilePage } from './pages/profile/profile'
import authController from './controllers/authController'

// window.addEventListener('DOMContentLoaded', () => {
//   renderDom('#root', 'home')
// })

// eslint-disable-next-line no-shadow
export const enum Routes {
  Index = '/',
  Signup = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger'
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Index, SigninPage)
    .use(Routes.Signup, SignupPage)
    .use(Routes.Settings, ProfilePage)
    .use(Routes.Messenger, HomePage)

  let isProtectedRoute = true

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Signup:
      isProtectedRoute = false
      break
    default:
      isProtectedRoute = true
  }

  try {

    await authController.fetchUser()

    Router.start()
    
    console.log(123)

    if (!isProtectedRoute) {
      Router.go(Routes.Settings)
    }
  } catch (error) {
    Router.start()

    // if (isProtectedRoute) {
      Router.go(Routes.Index)
    // }
  }
})
