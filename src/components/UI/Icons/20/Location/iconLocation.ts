import Block from '../../../../../core/block'
import template from './template.hbs'

interface IconLocationProps {
  styles?: string
}

export class IconLocation extends Block<IconLocationProps> {
  constructor(props: IconLocationProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
