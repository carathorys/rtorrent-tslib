import { createClient, createSecureClient, Client } from 'xmlrpc';
import { ClientOptions } from './types';
export class XmlRpcClient {
  private readonly client: Client;
  constructor(clientOptions: ClientOptions | string, secure: boolean = true) {
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

  public get Cookies() {
    return this.client.cookies;
  }

  public get isSecure() {
    return this.client.isSecure;
  }

  public get options() {
    return this.client.options;
  }

  public getCookie(name: string) {
    return this.client.getCookie(name);
  }

  public setCookie(name: string, value: string) {
    return this.client.setCookie(name, value);
  }
}
