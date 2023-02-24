import { HomePage } from '../pages/home/home.ts'
import { ProfilePage } from '../pages/profile/profile.ts'
// import Block from './block.ts'

const routes = {
  home: HomePage,
  profile: ProfilePage
  //   about: AboutPage,
}

export function renderDom(query: string, block: string) {
  const root = document.querySelector(query) as HTMLElement

  root.innerHTML = ''

  const route = new routes[block]()

  root.appendChild(route.getContent())
  route.dispatchComponentDidMount()

  // return root;
}
