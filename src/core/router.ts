import { HomePage } from '../pages/home/home.ts'
// import { AboutPage } from "../pages/About/index";

// import Block from './block.ts'

const routes = {
  home: HomePage
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
