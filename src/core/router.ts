import { HomePage } from '../pages/home/home.ts'
import { ProfilePage } from '../pages/profile/profile.ts'
import { SigninPage } from '../pages/signin/signin.ts'
import { SignupPage } from '../pages/signup/signup.ts'

const routes = {
  home: HomePage,
  profile: ProfilePage,
  signin: SigninPage,
  signup: SignupPage
}

export function renderDom(query: string, block: string) {
  const root = document.querySelector(query) as HTMLElement

  root.innerHTML = ''

  const route = new routes[block]()

  root.appendChild(route.getContent())
  route.dispatchComponentDidMount()

  // return root;
}
