import Block from '../../../../../core/block'
import template from './template.hbs'

interface IconCheckProps {
  styles?: string
}

export class IconCheck extends Block<IconCheckProps> {
  constructor(props: IconCheckProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
