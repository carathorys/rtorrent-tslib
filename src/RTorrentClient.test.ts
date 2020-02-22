import { RTorrentClient } from './RTorrentClient';

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


describe('RTorrentClient', () => {
  const client = new RTorrentClient({
    host: '192.168.1.100',
    port: 80,
    path: '/RPC2',
  });

  it('should retreive the commands list', async () => {
    expect(client.getCommands()).resolves.toBeDefined();
  });
  it('should torrent list', async () => {
    expect(client.getTorrents()).resolves.toBeDefined();
  });
  it('should torrent list', async () => {
    expect(client.getTorrents('directory', 'name')).resolves.toBeDefined();
  });
});
