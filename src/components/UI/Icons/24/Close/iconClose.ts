import Block from '../../../../../core/block'
import template from './template.hbs'

interface IconCloseProps {
  styles?: string
}

export class IconClose extends Block<IconCloseProps> {
  constructor(props: IconCloseProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
