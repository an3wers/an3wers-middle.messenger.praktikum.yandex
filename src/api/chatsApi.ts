import BaseAPI from './baseApi'

class ChatsAPI extends BaseAPI {

  constructor() {
    super('/chats')
  }

  getChats() {
    return this.http.get('')
  }


  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export default ChatsAPI
