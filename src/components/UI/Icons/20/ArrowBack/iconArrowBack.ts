import Block from '../../../../../core/block.ts'
import template from './template.hbs'

interface IconArrowBackProps {
  styles?: string
}

export class IconArrowBack extends Block {
  constructor(props: IconArrowBackProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
