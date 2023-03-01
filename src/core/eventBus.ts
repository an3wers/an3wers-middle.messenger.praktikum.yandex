type Callback = (...args: any[]) => void
type Event = string

export class EventBus {
  private readonly listeners: {
    [key: string]: Callback[]
  }

  constructor() {
    this.listeners = {}
    /* {
         'eventName': []
        } */
  }

  on(event: Event, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event: Event, callback: Callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    )
  }

  emit(event: Event, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }
    // listener callback
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
  }
}
