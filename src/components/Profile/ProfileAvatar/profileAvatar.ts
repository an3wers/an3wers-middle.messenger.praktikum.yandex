import Block from '../../../core/block.ts'
import template from './template.hbs'

interface ProfileAvatarProps {
  avatar: string
}

export class ProfileAvatar extends Block {
  constructor(props: ProfileAvatarProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
