import BaseAPI from './baseApi'
import { CreateChatData } from './types/chatTypes'

class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }

  getChats() {
    return this.http.get('/')
  }

  createChat(data: CreateChatData) {
    return this.http.post('/', { data })
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export default ChatsAPI
