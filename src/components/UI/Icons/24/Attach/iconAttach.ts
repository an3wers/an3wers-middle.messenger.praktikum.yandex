import Block from '../../../../../core/block'
import template from './template.hbs'

interface IconAttachProps {
  styles?: string
}

export class IconAttach extends Block<IconAttachProps> {
  constructor(props: IconAttachProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
