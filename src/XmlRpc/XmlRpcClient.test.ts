import { XmlRpcClient } from './XmlRpcClient';

jest.mock('xmlrpc', () => ({
  createClient: () => {
    return {
      methodCall: (method: string, parameters: any[], callback?: (err: any, val: any) => void) => {
        console.log('Method call parameters: ', parameters);
        const error = parameters.filter((x) => !!x.error);
        callback(error[0], parameters);
      },
    };
  },
}));

describe('UnsecureXmlRpcClient', () => {
  const client: XmlRpcClient = new XmlRpcClient(
    {
      host: 'localhost',
      port: 41442,
      path: 'RPC_PATH',
    },
    false,
  );

  it('resolves the method call, returns the parameters', () => {
    const dummyParameters = ['parameters', { key: 'key', values: [1, 2, 3, 4, 5] }];
    expect(client.methodCall('methodName', ...dummyParameters)).resolves.toBe(dummyParameters);
  });
  it('rejects the method call, returns with the `parameters.reject` part', () => {
    const dummyParameters = [
      'parameters',
      { key: 'key', values: [1, 2, 3, 4, 5] },
      { error: true, message: 'unknown' },
    ];
    expect(client.methodCall('x', dummyParameters)).rejects.toBe(dummyParameters[2]);
  });
});
