import { GetXmlRpcPropertyKey, GetFieldsToPopulate } from './XmlRpc/XmlPropertyDecorator';
import { WritableKeys } from '../helpers';
import { Download } from './models/Download';
import { XmlRpcClient } from './XmlRpc/base';

export class XmlRpcRepository extends XmlRpcClient {
  protected readonly downloadInstance: Download;

  constructor() {
    super(
      {
        host: '192.168.1.100',
        port: 80,
        path: '/RPC2',
      },
      false,
    );
    this.downloadInstance = new Download();
  }

  public async getTorrents(...keys: WritableKeys<Download>[]) {
    const torrentIds = await this.methodCall<Array<string>>('download_list', ['']);
    return await this.getTorrentDetails(torrentIds, ...keys);
  }

  public async getTorrentDetails(torrentIds: string[], ...keys: WritableKeys<Download>[]) {
    if (keys?.length <= 0) {
      keys = GetFieldsToPopulate(new Download());
    }
    const mappedKeys = this.PrepareQuery(keys)?.map((x) => `${x}=`);
    return (await this.methodCall('d.multicall2', torrentIds, '', ...mappedKeys)).map((x) => {
      const obj: Download = new Download();
      keys.forEach((key, index) => {
        obj.setValue(key, x[index]);
      });
      return obj;
    });
  }

  public async getCommands() {
    await this.methodCall('system.listMethods', []);
  }

  public PrepareQuery(
    keysToInclude: WritableKeys<Download> | Array<WritableKeys<Download>>,
  ): string[] {
    if (keysToInclude instanceof Array) {
      return keysToInclude.map((keyToInclude) => {
        return GetXmlRpcPropertyKey<Download>(this.downloadInstance, keyToInclude);
      });
    } else {
      return [GetXmlRpcPropertyKey<Download>(this.downloadInstance, keysToInclude)];
    }
  }
}
