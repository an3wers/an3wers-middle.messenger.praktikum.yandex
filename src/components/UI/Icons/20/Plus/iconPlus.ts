import Block from '../../../../../core/block'
import template from './template.hbs'

interface IconPlusProps {
  styles?: string
}

export class IconPlus extends Block {
  constructor(props: IconPlusProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
