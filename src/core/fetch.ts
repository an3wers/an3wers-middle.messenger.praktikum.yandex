/* eslint-disable no-shadow */
const enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

interface Options {
  headers?: { [key: string]: string }
  method?: Methods
  timeout?: number
  data?: any
}

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

class HTTPTransport {
  get = (
    url: string,
    options: Omit<Options, 'method'> = {}
  ): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: Methods.GET })
  }

  post = (url: string, options: Omit<Options, 'method'> = {}) => {
    return this.request(url, { ...options, method: Methods.POST })
  }

  put = (url: string, options: Omit<Options, 'method'> = {}) => {
    return this.request(url, { ...options, method: Methods.PUT })
  }

  delete = (url: string, options: Omit<Options, 'method'> = {}) => {
    return this.request(url, { ...options, method: Methods.DELETE })
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
        xhr.send(data)
      }
    })
  }
}
