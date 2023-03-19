import Block from '../../../../../core/block'
import template from './template.hbs'

interface IconMinusProps {
  styles?: string
}

export class IconMinus extends Block<IconMinusProps> {
  constructor(props: IconMinusProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
