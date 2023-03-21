import {
  ChangePasswordData,
  ChangeProfileData,
  SearchUserData
} from '../api/types/userTypes'
import UserAPI from '../api/userApi'
import { User } from '../components/Profile/types'
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
      console.error((error as Error).message)
    }
  }

  async changePassword(data: ChangePasswordData) {
    try {
      const res = (await this.api.changePassword(data)) as XMLHttpRequest
      if (res.status >= 400) {
        store.set('user.isError', res.response.reason)
      }
    } catch (error) {
      console.error((error as Error).message)
    }
  }

  async changeAvatar(data: FormData) {
    try {
      const res = (await this.api.changeAvatar(data)) as XMLHttpRequest
      if (res.status >= 400) {
        store.set('user.isError', res.response.reason)
      } else {
        store.set('user.data', res.response)
      }
    } catch (error) {
      console.error((error as Error).message)
    }
  }

  async searchUserByLogin(data: SearchUserData) {
    try {
      const res = (await this.api.searchUserByLogin(data)) as XMLHttpRequest
      if (res.status >= 400) {
        throw new Error(res.response.reason)
      } else {
        return res.response as User[]
      }
    } catch (error) {
      return error as Error
    }
  }

  clearUserError() {
    store.set('user.isError', null)
  }
}

export default new UserController()
