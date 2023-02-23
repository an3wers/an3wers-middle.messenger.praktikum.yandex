import Block from '../../../../../core/block.ts'
import template from './template.hbs'

interface IconFileProps {
  styles?: string
}

export class IconFile extends Block {
  constructor(props: IconFileProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}