import { ClientOptions, Cookies, HeadersProcessor } from './Types';
// import * as url from 'url';

export class XmlRpcClient {
  private readonly clientOptions: ClientOptions;

  constructor(options: ClientOptions) {
    this.clientOptions = options;
    this.clientOptions.headers = {
      'User-Agent': 'NodeJS XML-RPC Client TS',
      'Content-Type': 'text/xml',
      Accept: 'text/xml',
      'Accept-Charset': 'UTF8',
      Connection: 'Keep-Alive',
    };

    if (this.clientOptions.useCookies === true) {
      // TODO: implemnent something...
    }
  }

  public async methodCall<T extends any>(method: string, ...params: any): Promise<T> {
    console.log('Calling method: ', method, this.options);
    return fetch(
      `${this.clientOptions.isSecure ? 'http' : 'https'}://${this.clientOptions.host}:${
        this.clientOptions.port
      }/${this.clientOptions.path}`,
      {
        method: this.clientOptions.method,
        headers: this.clientOptions.headers,
        keepalive: true,
        body: JSON.stringify(params),
      },
    ).then((d) => d.json());
    return new Promise((resolve, reject) => {
      // this.client.methodCall(method, params, (error, value) => {
      //   if (!!error) {
      //     reject(error);
      //   }
      //   resolve(value);
      // });
    });
  }

  public headersProcessors: { processors: HeadersProcessor[] };

  public Cookies: Cookies;

  public isSecure: boolean;

  public options: ClientOptions;

  public getCookie(name: string): string {
    return this.Cookies.get('name');
  }

  public setCookie(name: string, value: string): XmlRpcClient {
    this.Cookies.set(name, value);
    return this;
  }
}
