import ChatsAPI from '../api/chatsApi'
import { CreateChatData } from '../api/types/chatTypes'
import store from '../core/store'

class ChatsController {
  private api: ChatsAPI

  constructor() {
    this.api = new ChatsAPI()
  }

  async getChats() {
    try {
      const res = (await this.api.getChats()) as XMLHttpRequest
      // console.log('getChats', res)
      if (res.status >= 400) {
        store.set('chatList.isError', res.response.reason)
      } else {
        store.set('chatList.data', res.response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async createChat(data: CreateChatData) {
    try {
      const res = await this.api.createChat(data) as XMLHttpRequest
      console.log('Create chat', res)
    } catch (error) {
      console.log(error)
    }
  }

}

export default new ChatsController()
