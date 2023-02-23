import Block from '../../../../../core/block.ts'
import template from './template.hbs'

interface IconArrowForwardProps {
  styles?: string
}

export class IconArrowForward extends Block {
  constructor(props: IconArrowForwardProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}