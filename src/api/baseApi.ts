import HTTPTransport from "../core/fetch";

export default abstract class BaseAPI {

  static BASE_URL = 'https://ya-praktikum.tech/api/v2'

  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(BaseAPI.BASE_URL, endpoint);
  }

  // eslint-disable-next-line func-names
  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier?: string): Promise<unknown>;

  public abstract update?(identifier: string, data: unknown): Promise<unknown>;

  public abstract delete?(identifier: string): Promise<unknown>;
}
