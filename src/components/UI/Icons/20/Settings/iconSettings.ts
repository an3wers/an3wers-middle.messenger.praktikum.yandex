import Block from '../../../../../core/block.ts'
import template from './template.hbs'

interface IconSettingsProps {
  styles: string
}

export class IconSettings extends Block {
  constructor(props: IconSettingsProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
