import { XmlRpcClient } from './XmlRpcClient';
import 'jest-fetch-mock';

import { CreateMethodResponse } from './Serialization';

describe('XmlRpcClient', () => {
  beforeEach(() => {
    // fetchMock.resetMocks();
    fetchMock.dontMock();
  });

  const client: XmlRpcClient = new XmlRpcClient({
    host: '192.168.1.100',
    port: 80,
    path: '/RPC2',
    isSecure: false,
  });

  it('resolves the method call, returns the parameters', async () => {
    // fetchMock.mockResponse(async r => {
    //   // return r.text();
    //   return new Promise(async (res, rej) => {
    //     // const json: any = xml2js(await r.text(), { compact: true });
    //     const txt = await r.text();
    //     // await ParseMethodRequest(txt);
    //     console.log(txt);
    //     return res(CreateMethodResponse('response', 'value'));
    //   });
    // });

    const value = await client.methodCall('download_list');
    const details = await client.methodCall('d.multicall2', [], '', 'd.directory=', 'd.name=', 'd.hash=');
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
