/* eslint-disable no-shadow */
const enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  headers?: { [key: string]: string }
  method?: Methods
  timeout?: number
  data?: any
}

type HTTPMethod = (
  url: string,
  options?: Omit<Options, 'method'>
) => Promise<unknown>

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: { [key: string]: any }) {
  // Можно делать трансформацию GET-параметров в отдельной функции
  if (typeof data !== 'object') {
    throw new Error('Нужно передавать объект')
  }

  const dataArray = Object.entries(data)
  return `?${dataArray.map(el => el.join('=')).join('&')}`
}

export default class HTTPTransport {

  // baseUrl: string
  endpoint: string

  constructor(baseUrl: string, endpoint: string) {
    // this.baseUrl = baseUrl
    this.endpoint = baseUrl + endpoint
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(this.endpoint + url, { ...options, method: Methods.GET })
  }

  post: HTTPMethod = (url, options = {}) => {
    return this.request(this.endpoint + url, { ...options, method: Methods.POST })
  }

  put: HTTPMethod = (url, options = {}) => {
    return this.request(this.endpoint + url, { ...options, method: Methods.PUT })
  }

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(this.endpoint + url, { ...options, method: Methods.DELETE })
  }

  request = (url: string, options: Options = {}): Promise<XMLHttpRequest> => {
    const {
      method = Methods.GET,
      data,
      headers = { 'Content-Type': 'application/json' },
      timeout = 5000
    } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      if (method === Methods.GET || method === Methods.DELETE) {
        url = !!data ? `${url}${queryStringify(data)}` : url
        xhr.open(method, url)
      } else {
        xhr.open(method, url)
      }

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key])
      })

      xhr.onload = () => {
        resolve(xhr)
      }

      xhr.timeout = timeout
      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (method === Methods.GET) {
        xhr.send()
      } else if (method === Methods.DELETE) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
