import ChatsAPI from '../api/chatsApi'

class ChatsController {
  private api: ChatsAPI

  constructor() {
    this.api = new ChatsAPI()
  }

  async getChats() {
    try {
      const res = await this.api.getChats() as XMLHttpRequest
      console.log('getChats', res)
    } catch (error) {
      console.log(error)
    }
  }

}

export default new ChatsController()
