import { XmlRpcClient } from './XmlRpcClient';

jest.mock('xmlrpc', () => ({
  createClient: () => {
    return {
      methodCall: (method: string, parameters: any[], callback?: (err: any, val: any) => void) => {
        const error = parameters.filter((x) => x.error === true);
        if (error.length > 0) {
          callback(error[0], parameters);
        }
        callback(false, parameters);
      },
    };
  },
  createSecureClient: () => {
    return {
      methodCall: (method: string, parameters: any[], callback?: (err: any, val: any) => void) => {
        const error = parameters.filter((x) => x.error === true);
        if (error.length > 0) {
          callback(error[0], parameters);
        }
        callback(false, parameters);
      },
    };
  },
}));

describe('XmlRpcClient', () => {
  const client: XmlRpcClient = new XmlRpcClient(
    {
      host: 'localhost',
      port: 41442,
      path: 'RPC_PATH',
    },
    false,
  );
  it('resolves the method call, returns the parameters', async () => {
    const dummyParameters = ['parameters', { key: 'key', values: [1, 2, 3, 4, 5] }];
    expect(client.methodCall('methodName', ...dummyParameters)).resolves.toStrictEqual(
      dummyParameters,
    );
  });

  it('rejects the method call, returns with the `parameters.reject` part', async () => {
    const dummyParameters = [
      'parameters',
      { key: 'key', values: [1, 2, 3, 4, 5] },
      { error: true, message: 'unknown' },
    ];
    await expect(client.methodCall('x', ...dummyParameters)).rejects.toStrictEqual(
      dummyParameters[2],
    );
  });
});
