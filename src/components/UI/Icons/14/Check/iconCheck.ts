import Block from '../../../../../core/block.ts'
import template from './template.hbs'

interface IconCheckProps {
  styles?: string
}

export class IconCheck extends Block {
  constructor(props: IconCheckProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}