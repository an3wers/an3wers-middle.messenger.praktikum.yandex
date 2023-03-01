import Block from '../../../../../core/block'
import template from './template.hbs'

interface IconSettingsProps {
  styles: string
}

export class IconSettings extends Block<IconSettingsProps> {
  constructor(props: IconSettingsProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
