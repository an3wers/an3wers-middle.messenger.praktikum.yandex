import Block from '../../../../../core/block'
import template from './template.hbs'

interface IconPhotoFileProps {
  styles?: string
}

export class IconPhotoFile extends Block {
  constructor(props: IconPhotoFileProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}