// type Callback = (...args: any[]) => void
// type Event = string

// export class EventBus {
//   private readonly listeners: {
//     [key: string]: Callback[]
//   }

//   constructor() {
//     this.listeners = {}
//     /* {
//          'eventName': []
//         } */
//   }

//   on(event: Event, callback: Callback) {
//     if (!this.listeners[event]) {
//       this.listeners[event] = []
//     }
//     this.listeners[event].push(callback)
//   }

//   off(event: Event, callback: Callback) {
//     if (!this.listeners[event]) {
//       throw new Error(`Нет события: ${event}`)
//     }

//     this.listeners[event] = this.listeners[event].filter(
//       listener => listener !== callback
//     )
//   }

//   emit(event: Event, ...args: any[]) {
//     if (!this.listeners[event]) {
//       throw new Error(`Нет события: ${event}`)
//     }
//     // listener callback
//     this.listeners[event].forEach(listener => {
//       listener(...args)
//     })
//   }
// }

type Handler<A extends any[] = unknown[]> = (...args: A) => void;
type MapInterface<P> = P[keyof P]

export class EventBus<
  E extends Record<string, string> = Record<string, string>,
  Args extends Record<MapInterface<E>, any[]> = Record<string, any[]>
> {
  private readonly listeners: {
    [K in MapInterface<E>]?: Handler<Args[K]>[]
  } = {};

  on<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }


    this.listeners[event]?.push(callback);
  }

  off<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback
    );
  }

  emit<Event extends MapInterface<E>>(event: Event, ...args: Args[Event]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]!.forEach(listener => {
      listener(...args);
    });
  }
}
