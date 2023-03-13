/* eslint-disable no-shadow */
/* eslint-disable max-classes-per-file */
import { User } from '../components/Profile/types'
import isEqual from '../helpers/isEqual'
import set from '../helpers/set'
import Block from './block'
import { EventBus } from './eventBus'

interface State {
  // user?: User
  user: {
    data?: User
    isError: null | string
  }

  // chats?: Chat[]
  // selectedChatId?: number
  // and more
}

export enum StoreEvents {
  Updated = 'updated'
}

export class Store extends EventBus {
  private state: State = {
    user: {
      data: undefined,
      isError: null
    }
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

export function withStore(mapStateToProps: (state: any) => any) {
  return function wrap(Component: typeof Block) {
    let state: any

    return class WithStore extends Component {
      constructor(props: any) {
        state = mapStateToProps(store.getState())

        super({ ...props, ...state })

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
