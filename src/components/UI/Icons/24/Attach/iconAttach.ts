import Block from '../../../../../core/block.ts'
import template from './template.hbs'

interface IconAttachProps {
  styles?: string
}

export class IconAttach extends Block {
  constructor(props: IconAttachProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}