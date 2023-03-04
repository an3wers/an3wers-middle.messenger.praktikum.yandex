// import { renderDom, render } from './core/renderDom'
import Router from './core/router/router'
import { SigninPage } from './pages/signin/signin'
import { SignupPage } from './pages/signup/signup'
import { HomePage } from './pages/home/home'
import { ProfilePage } from './pages/profile/profile'

// window.addEventListener('DOMContentLoaded', () => {
//   renderDom('#root', 'home')
// })

// eslint-disable-next-line no-shadow
const enum Routes {
  Index = '/',
  Signup = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger'
}

window.addEventListener('DOMContentLoaded', () => {
  Router.use(Routes.Index, SigninPage)
    .use(Routes.Signup, SignupPage)
    .use(Routes.Settings, ProfilePage)
    .use(Routes.Messenger, HomePage)

  Router.start()
})
