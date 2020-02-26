import { XmlRpcClient } from './XmlRpcClient';
import 'jest-fetch-mock';
import { js2xml, xml2js } from 'xml-js';

describe('XmlRpcClient', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const client: XmlRpcClient = new XmlRpcClient({
    host: 'localhost',
    port: 31245,
    path: '/RPC2',
    isSecure: false,
  });
  it('resolves the method call, returns the parameters', async () => {
    fetchMock.mockResponse(async r => {
      // return r.text();
      return new Promise(async (res, rej) => {
        // const json: any = xml2js(await r.text(), { compact: true });
        console.log(await r.text());
        let obj: any = {};
        return res(obj);
      });
    });
    const dummyParameters = ['parameters', { key: 'value', values: [1, 2, 3, 4, 5] }];
    await client.methodCall('MyCustomMethodToCall', ...dummyParameters);
    // await expect(client.methodCall('methodName', ...dummyParameters)).resolves.toStrictEqual(dummyParameters);
  });

  // it('rejects the method call, returns with the `parameters.reject` part', async () => {
  //   fetchMock.mockResponse(async req => {
  //     return new Promise(async (res, rej) => {
  //       const requestBody = await req.json();
  //       rej(requestBody[2]);
  //     });
  //   });
  //   const dummyParameters = [
  //     'parameters',
  //     { key: 'key', values: [1, 2, 3, 4, 5] },
  //     { error: true, message: 'unknown' },
  //   ];
  //   await expect(client.methodCall('x', ...dummyParameters)).rejects.toStrictEqual(dummyParameters[2]);
  // });
});
