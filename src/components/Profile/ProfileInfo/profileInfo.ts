import Block from '../../../core/block'
import { User } from '../types'
import template from './template.hbs'

interface ProfileInfoProps {
  user: User[]
}

export class ProfileInfo extends Block<ProfileInfoProps> {
  constructor(props: ProfileInfoProps) {
    super(props)
  }
  protected render(): DocumentFragment {
    return this.compile(template, {...this.props})
  }
}
