import { RTorrentClient } from './RTorrentClient';
import { Download } from './models';
import { stringify } from 'querystring';

const str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,._-!@$';
function rand(min: number, max: number) {
  return Math.floor(Math.random() * (+max - +min) + +min);
}

// tslint:disable-next-line: no-unused-expression
function generate(allowedCharacters: string = 'ABCDEFG0123456789', length: number = 5) {
  const charactersLength = allowedCharacters.length;
  return [...Array(length)]
    .map((x) => {
      return allowedCharacters.charAt(Math.floor(Math.random() * charactersLength));
    })
    .join('');
}

function generateMulti(
  separator: string[1] = '/',
  segmentMinLength: number = 3,
  segmentMaxLength: number = 10,
  segmentsCount: number,
  allowedCharacters: string = 'ABCDEFG0123456789',
) {
  return [...Array(segmentsCount)]
    .map(() => {
      const segmentLength = rand(segmentMinLength, segmentMaxLength);
      return generate(allowedCharacters, segmentLength);
    })
    .join(separator);
}

function torrentGenerator(count: number = 5) {
  return [...Array(count)].map((x) => {
    const torrent = new Download();
    torrent.directory = `/${generateMulti('/', 3, 10, rand(4, 5)).toLowerCase()}`;
    torrent.name = generate(str, rand(10, 50));
    torrent.hash = generate('ABCDEFG0123456789', 64);
    return torrent;
  });
}

const torrents = torrentGenerator(100);
// tslint:disable-next-line: variable-name
const torrent_id_list = torrents.map((x) => x.hash);
// tslint:disable-next-line: variable-name
const method_list = ['d.multicall2', 'system.listMethods', 'download_list'];
const methodCall = (method: string, parameters: any[], callback?: (err: any, val: any) => void) => {
  const error = parameters.filter((x) => x.error === true);
  if (error.length > 0) {
    callback(error[0], { method });
  } else {
    switch (method) {
      case 'd.multicall2':
        callback(undefined, torrents);
        break;
      case 'download_list':
        callback(undefined, torrent_id_list);
        break;
      case 'system.listMethods':
        callback(undefined, method_list);
        break;
    }
  }
};

jest.mock('davexmlrpc', () => {
  return {
    createClient: () => {
      return {
        methodCall,
      };
    },
    createSecureClient: () => {
      return {
        methodCall,
      };
    },
  };
});

describe('RTorrentClient', () => {
  const client = new RTorrentClient(
    {
      host: '192.168.1.100',
      port: 80,
      path: '/RPC2',
    },
    false,
  );

  it('should retreive the commands list', async () => {
    await expect(client.getCommands()).resolves.toBe(method_list);
  });
  it('should be able to fetch torrent list', async () => {
    await expect(client.getTorrents()).resolves.toBe(torrent_id_list);
  });

  it('should be able to fetch torrent details', async () => {
    const promise = client.getTorrentDetails(
      torrents.map((x) => x.hash),
      'directory',
      'name',
    );
    await expect(promise).resolves.toBeTruthy();
  });
});
