import Block from '../../../../../core/block.ts'
import template from './template.hbs'

interface IconLocationProps {
  styles?: string
}

export class IconLocation extends Block {
  constructor(props: IconLocationProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
