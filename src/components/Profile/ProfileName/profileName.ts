import Block from '../../../core/block'
import { withStore } from '../../../core/store'
import template from './template.hbs'

interface ProfileNameProps {
  name?: string
}

class ProfileNameBase extends Block<ProfileNameProps> {
  constructor(props: ProfileNameProps) {
    super(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}

const withName = withStore(state => ({ ...state.user.data }))
export const ProfileName = withName(ProfileNameBase)
