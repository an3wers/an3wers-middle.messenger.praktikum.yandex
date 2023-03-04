import { Route } from './route'
import Block from '../block'

class Router {
  public routes: Route[] = []
  public history: History | undefined
  private _currentRoute: Route | null = null
  private _rootQuery
  private static __instance: Router

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes.push(route)
    return this
  }

  public start() {
    window.onpopstate = event => {
      this._onRoute((event.currentTarget as Window).location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname)
    if (!route) {
      return
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  public go(pathname: string) {
    this.history!.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  public back() {
    this.history!.back()
  }

  public forward() {
    this.history!.forward()
  }

  public getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname))
  }
}

export default new Router('#root')
