import Block from '../../../../../core/block'
import template from './template.hbs'

interface IconArrowForwardProps {
  styles?: string
}

export class IconArrowForward extends Block<IconArrowForwardProps> {
  constructor(props: IconArrowForwardProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
