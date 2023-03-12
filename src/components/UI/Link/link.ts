import Block from '../../../core/block'
import { PropsWithRouter, withRouter } from '../../../hocs/withRouter'
// import router from '../../../core/router/router'
import template from './template.hbs'

interface LinkProps extends PropsWithRouter {
  to: string
  label?: string
  styles?: string
  icon?: Block
  events?: {
    click: (e: Event) => void
  }
}

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e) => {
          e.preventDefault()
          this.navigate()
        }
      }
    })
  }

  private navigate() {
    this.props.router.go(this.props.to)
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}

export const Link = withRouter(BaseLink)
