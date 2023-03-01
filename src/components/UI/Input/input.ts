import Block from '../../../core/block'
import template from './template.hbs'

interface IputProps {
  id?: string
  styles?: string
  type?: string
  name?: string
  value?: string
  placeholder?: string
  events?: {
    [key: string]: (e: Event | undefined) => void
  }
}

export class Input extends Block<IputProps> {
  constructor(props: IputProps) {
    props = 'type' in props ? props : { ...props, type: 'text' }
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
