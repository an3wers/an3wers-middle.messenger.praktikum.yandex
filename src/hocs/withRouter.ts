import Block from '../core/block'
import router from '../core/router/router'

export function withRouter(Component: typeof Block<any>) {
  type Props = typeof Component extends typeof Block<
    infer P extends { [key: string]: any }
  >
    ? P
    : any

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router })
    }
  }
}

export interface PropsWithRouter {
  router: typeof router
}
