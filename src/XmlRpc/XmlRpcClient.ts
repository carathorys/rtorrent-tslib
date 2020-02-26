import { ClientOptions, Cookies, HeadersProcessor } from './Types';
import { js2xml, xml2js } from 'xml-js';
import { create, XMLNode, XMLElement, XMLText } from 'xmlbuilder';
import { RTorrentClient } from '../RTorrentClient';

export class XmlRpcClient {
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

  public async objectToXml(jsObject: any, root: XMLElement): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof jsObject === 'string') {
        root.ele('value').ele('string', {}, jsObject);
      } else if (typeof jsObject === 'number') {
        root.ele('value').ele('int', {}, jsObject);
      } else if (typeof jsObject === 'object') {
        if (jsObject instanceof Array) {
          const array = root.ele('array').ele('data');
          jsObject.forEach(d => this.objectToXml(d, array));
        } else {
          const struct = root.ele('struct');
          Object.keys(jsObject).forEach(async sKey => {
            const member = struct.ele('member');
            member.ele('name', {}, sKey);
            await this.objectToXml(jsObject[sKey], member);
          });
        }
      }
      resolve();
    });
  }

  public async methodCall<T extends any>(method: string, ...params: any): Promise<T> {
    // return new Promise<T>((resolve, resject) => {
    const jsObj: any = {
      methodCall: {
        methodName: method,
        params: null,
      },
    };
    if (params?.length > 0) {
      // TODO: parse data
      // jsObj.methodCall.params = { param: this.serializeParameters(params) };
    }
    const root = create('methodCall');
    root.ele('methodName', {}, method);
    const paramsSection = root.ele('params');
    Object.keys(params).forEach(async param => {
      await this.objectToXml(params[param], paramsSection.ele('param'));
    });
    console.log(root.end({ pretty: false }).toString());
    return {} as any;
    // const sxStream = createStream(false);
    // sxStream.push(jsObj, 'utf8');
    // console.log('SAX: ', sxStream.read());
    // await this.objectToXml(jsObj, root);
    // const body = js2xml(jsObj, { compact: true });

    // const url = `${this.clientOptions.isSecure === true ? 'https' : 'http'}://${this.clientOptions.host}:${
    //   this.clientOptions.port
    // }/${this.clientOptions.path}`;

    // return fetch(url, {
    //   method: this.clientOptions.method,
    //   headers: this.clientOptions.headers,
    //   cache: 'no-cache',
    //   credentials: 'include',
    //   redirect: 'follow',
    //   referrerPolicy: 'no-referrer',
    //   keepalive: true,
    //   body: body.toString(),
    // })
    //   .then(p => p.text())
    //   .then(x => {
    //     const response = xml2js(x, { compact: true }) as any;
    //     return response.methodResponse.params;
    //   });
  }

  private serializeParameters(params: any[]) {
    return params.map(x => ({
      ...this.toXml(x),
    }));
  }

  private toXml(param: any): any {
    switch (typeof param) {
      case 'number':
        if (Number.isInteger(param.valueOf())) {
          return { value: { int: param } };
        }
        return { value: { double: param } };
      case 'string':
        return { value: { string: param } };
      case 'bigint':
        return { value: { double: param } };
      case 'object':
        if (param instanceof Array) {
          return { value: { array: { data: param.map(x => this.toXml(x)) } } };
        } else {
          return {
            value: {
              struct: {
                member: [...Object.keys(param).map(key => ({ name: key, ...this.toXml(param[key]) }))],
              },
            },
          };
        }
    }
  }

  private toObject(param: { value: any }): any {
    switch (typeof param.value) {
      case 'bigint':
      case 'number': {
        return param.value;
        break;
      }
    }
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
