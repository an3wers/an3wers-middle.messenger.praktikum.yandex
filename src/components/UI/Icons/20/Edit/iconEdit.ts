import Block from '../../../../../core/block.ts'
import template from './template.hbs'

interface IconEditsProps {
  styles?: string
}

export class IconEdit extends Block {
  constructor(props: IconEditsProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}