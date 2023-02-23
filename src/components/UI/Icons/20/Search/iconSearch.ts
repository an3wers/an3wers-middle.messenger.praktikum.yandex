import Block from '../../../../../core/block.ts'
import template from './template.hbs'

interface IconSearchProps {
  styles?: string
}

export class IconSearch extends Block {
  constructor(props: IconSearchProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
