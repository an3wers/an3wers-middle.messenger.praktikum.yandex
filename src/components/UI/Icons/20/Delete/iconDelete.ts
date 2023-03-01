import Block from '../../../../../core/block'
import template from './template.hbs'

interface IconDeleteProps {
  styles?: string
}

export class IconDelete extends Block<IconDeleteProps> {
  constructor(props: IconDeleteProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
