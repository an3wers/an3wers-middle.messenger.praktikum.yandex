import Block from '../../../core/block'
import { withStore } from '../../../core/store'
import template from './template.hbs'
import defaultAvatar from '../../../../static/images/default-avatar-profile.jpg'

// interface ProfileAvatarProps {
//   events: {
//     // changeHandler: () => void
//     [key: string]: (e: Event | undefined) => void
//   }
// }

export class ProfileAvatarBase extends Block {
  constructor(props: any) {
    super(props)
  }
  // protected init(): void {
    
  // }
  protected render(): DocumentFragment {
    // console.log(this.props)
    // console.log(this.props.avatar)
    // console.log(defaultAvatar)
    return this.compile(template, {avatar: defaultAvatar})
  }
}

const withUserAvatar = withStore(state => state.user.data)
export const ProfileAvatar = withUserAvatar(ProfileAvatarBase)
