// import { routes } from './routes'
import Block from './block'

/*

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

*/

// export function renderDom(query: string, block: string) {
//   const root = document.querySelector(query) as HTMLElement

//   root.innerHTML = ''
//   const route = routes[block]()

//   root.appendChild(route.getContent())
//   route.dispatchComponentDidMount()
// }

export function render(query: string, block: Block) {
  const root = document.querySelector(query)

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`)
  }

  root.innerHTML = ''

  root.append(block.getContent()!)
  block.dispatchComponentDidMount()

  return root
}
