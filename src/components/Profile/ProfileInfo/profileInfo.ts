import Block from '../../../core/block'
import { withStore } from '../../../core/store'
import template from './template.hbs'

class ProfileInfoBase extends Block {
  protected render(): DocumentFragment {
    console.log('rerender profile info', this.props)
    return this.compile(template, this.props)
  }
}

const withUser = withStore(state => ({ ...state.user.data }))
export const ProfileInfo = withUser(ProfileInfoBase)
