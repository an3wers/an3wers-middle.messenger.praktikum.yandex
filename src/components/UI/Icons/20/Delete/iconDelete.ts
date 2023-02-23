import Block from '../../../../../core/block.ts'
import template from './template.hbs'

interface IconDeleteProps {
  styles?: string
}

export class IconDelete extends Block {
  constructor(props: IconDeleteProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}