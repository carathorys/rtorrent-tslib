import { ClientOptions, Cookies, HeadersProcessor } from './Types';
import { CreateMethodRequest } from './Serialization';
import { XmlRpcDeserializer } from './XmlRpcDeserializer';

export class XmlRpcClient {
  public headersProcessors: { processors: HeadersProcessor[] };
  public Cookies: Cookies;
  public isSecure: boolean;
  public options: ClientOptions;
  private readonly clientOptions: ClientOptions;

  constructor(options: ClientOptions) {
    this.clientOptions = Object.assign(
      {
        method: 'POST',
        isSecure: false,
      },
      options,
    );

    this.clientOptions.headers = Object.assign(
      {},
      {
        'User-Agent': 'NodeJS XML-RPC Client',
        'Content-Type': 'text/xml',
        'Accept': 'application/xml',
        'Accept-Charset': 'UTF8',
        'Connection': 'Keep-Alive',
        'Pragma': 'no-cache',
      },
      this.clientOptions.headers,
    );
    if (this.clientOptions.path?.startsWith('/') === true) {
      this.clientOptions.path = this.clientOptions.path.substr(1);
    }
  }

  public async methodCall<T extends any>(method: string, ...params: any[]): Promise<T> {
    // return new Promise<T>((resolve, resject) => {
    const body = await CreateMethodRequest(method, ...params);
    const url = `${this.clientOptions.isSecure === true ? 'https' : 'http'}://${this.clientOptions.host}:${
      this.clientOptions.port
    }/${this.clientOptions.path}`;
    const ds = new XmlRpcDeserializer();
    return fetch(url, {
      method: this.clientOptions.method,
      headers: this.clientOptions.headers,
      cache: 'no-cache',
      credentials: 'include',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: body,
    })
      .then(p => p.text())
      .then(p => ds.DeserializeResponse(p));
    // .then(p => ds.DeserializeResponse());
  }

  public getCookie(name: string): string {
    return this.Cookies.get('name');
  }

  public setCookie(name: string, value: string): XmlRpcClient {
    this.Cookies.set(name, value);
    return this;
  }
}
