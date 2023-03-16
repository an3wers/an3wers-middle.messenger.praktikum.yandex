/* eslint-disable no-shadow */
/* eslint-disable max-classes-per-file */
import { Chat } from '../api/types/chatTypes'
import { User } from '../components/Profile/types'
// import isEqual from '../helpers/isEqual'
import set from '../helpers/set'
import Block from './block'
import { EventBus } from './eventBus'

interface State {
  user: {
    data?: User
    isError: null | string
    isLoading: boolean
  }
  chatList: {
    data: Chat[]
  }
  selectedChat: number
}

export enum StoreEvents {
  Updated = 'updated'
}

export class Store extends EventBus {
  private state: State = {
    user: {
      data: undefined,
      isError: null,
      isLoading: false
    },
    chatList: {
      data: []
    },
    selectedChat: 0
  }

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data)
    this.emit(StoreEvents.Updated, this.getState())
  }

  public getState() {
    return this.state
  }
}

const store = new Store()

export function withStore<T>(mapStateToProps: (state: any) => any) {
  return function wrap<P extends { [key: string]: any }>(
    Component: typeof Block<T & P>
  ) {
    let state: any

    return class WithStore extends Component {
      constructor(props: Omit<P, keyof T>) {
        state = mapStateToProps(store.getState())

        super({ ...(props as P), ...state })

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState())
          // if (!isEqual(state, newState)) {
          this.setProps({ ...newState })
          // }

          state = newState
        })
      }
    }
  }
}

export default store
