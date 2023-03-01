import Block from '../../../../../core/block'
import template from './template.hbs'

interface IconSearchProps {
  styles?: string
}

export class IconSearch extends Block<IconSearchProps> {
  constructor(props: IconSearchProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
