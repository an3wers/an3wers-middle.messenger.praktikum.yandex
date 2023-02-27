import Block from '../../../../../core/block'
import template from './template.hbs'

interface IconMoreProps {
  styles?: string
}

export class IconMore extends Block {
  constructor(props: IconMoreProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}