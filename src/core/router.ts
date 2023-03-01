import { routes } from './routes'

export function renderDom(query: string, block: string) {
  const root = document.querySelector(query) as HTMLElement

  root.innerHTML = ''
  const route = routes[block]()

  root.appendChild(route.getContent())
  route.dispatchComponentDidMount()
}
