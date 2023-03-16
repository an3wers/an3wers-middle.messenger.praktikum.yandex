import {
  // ChangeAvatarData,
  ChangePasswordData,
  ChangeProfileData
} from '../api/types/userTypes'
import UserAPI from '../api/userApi'
import store from '../core/store'

class UserController {
  private api: UserAPI

  constructor() {
    this.api = new UserAPI()
  }

  async changeProfile(data: ChangeProfileData) {
    try {
      const res = (await this.api.changeProfile(data)) as XMLHttpRequest
      if (res.status >= 400) {
        store.set('user.isError', res.response.reason)
      } else {
        store.set('user.data', res.response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async changePassword(data: ChangePasswordData) {
    try {
      const res = (await this.api.changePassword(data)) as XMLHttpRequest
      if (res.status >= 400) {
        store.set('user.isError', res.response.reason)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async changeAvatar(data: FormData) {
    try {
      const res = (await this.api.changeAvatar(data)) as XMLHttpRequest
      console.log('res avatar', res.response)

      if (res.status >= 400) {
        store.set('user.isError', res.response.reason)
      } else {
        store.set('user.data', res.response)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default new UserController()
