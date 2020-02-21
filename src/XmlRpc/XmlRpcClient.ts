import { XmlRpcClientOptions, XmlRpcCookies, XmlRpcHeadersProcessor } from './Types';
import { createClient, createSecureClient, Client } from 'xmlrpc';

export class XmlRpcClient {
  private client: Client;
  constructor(clientOptions: XmlRpcClientOptions | string, secure: boolean = true) {
    this.client = secure === true ? createSecureClient(clientOptions) : createClient(clientOptions);
  }

  public async methodCall<T extends any>(method: string, ...params: any): Promise<T> {
    console.log(method, params);
    return new Promise((resolve, reject) => {
      this.client.methodCall(method, params, (error, value) => {
        if (!!error) {
          reject(error);
        }
        resolve(value);
      });
    });
  }

  public get headersProcessors(): { processors: XmlRpcHeadersProcessor[] } {
    return this.client.headersProcessors;
  }

  public get Cookies(): XmlRpcCookies {
    return this.client.cookies;
  }

  public get isSecure(): boolean {
    return this.client.isSecure;
  }

  public get options(): XmlRpcClientOptions {
    return this.client.options;
  }

  public getCookie(name: string): string {
    return this.client.getCookie(name);
  }

  public setCookie(name: string, value: string): XmlRpcClient {
    // TODO: Check if this is valid usage
    this.client = this.client.setCookie(name, value);
    return this;
  }
}
