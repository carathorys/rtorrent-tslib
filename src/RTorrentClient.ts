import { GetXmlRpcPropertyKey, GetFieldsToPopulate } from './XmlRpc/XmlPropertyDecorator';
import { WritableKeys } from './helpers';
import { Download } from './models';
import { XmlRpcClient, XmlRpcClientOptions } from './XmlRpc';

export class XmlRpcRepository extends XmlRpcClient {
  protected readonly downloadInstance: Download;

  constructor(clientOptions: XmlRpcClientOptions | string, secure: boolean = false) {
    super(clientOptions, secure);
    this.downloadInstance = new Download();
  }

  public async getTorrents(...keys: WritableKeys<Download>[]) {
    const torrentIds = await this.methodCall<string[]>('download_list', ['']);
    return await this.getTorrentDetails(torrentIds, ...keys);
  }

  public async getTorrentDetails(torrentIds: string[], ...keys: WritableKeys<Download>[]) {
    if (keys?.length <= 0) {
      keys = GetFieldsToPopulate(new Download()).map((x) => x.key);
    }
    const mappedKeys = this.PrepareQuery(keys)?.map((x: string) => `${x}=`);
    return (await this.methodCall('d.multicall2', torrentIds, '', ...mappedKeys)).map((x: []) => {
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

  public PrepareQuery(keysToInclude: WritableKeys<Download> | WritableKeys<Download>[]): string[] {
    if (keysToInclude instanceof Array) {
      return keysToInclude.map((keyToInclude) => {
        return GetXmlRpcPropertyKey<Download>(this.downloadInstance, keyToInclude);
      });
    } else {
      return [GetXmlRpcPropertyKey<Download>(this.downloadInstance, keysToInclude)];
    }
  }
}
