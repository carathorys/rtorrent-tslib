import { GetXmlRpcPropertyKey, GetFieldsToPopulate } from './XmlRpc/XmlPropertyDecorator';
import { WritableKeys } from './helpers';
import { Download } from './models';
import { XmlRpcClient, ClientOptions } from './XmlRpc';

export class RTorrentClient {
  protected readonly downloadInstance: Download;
  protected readonly client: XmlRpcClient;

  constructor(clientOptions: ClientOptions) {
    this.client = new XmlRpcClient(clientOptions);
    this.downloadInstance = new Download();
  }

  public async getTorrents(
    fetchDetails: boolean = false,
    ...keys: WritableKeys<Download>[]
  ): Promise<Download[] | string[]> {
    const torrentIds = await this.client.methodCall<string[]>('download_list', ['']);
    if (fetchDetails === true) {
      return this.getTorrentDetails(torrentIds, ...keys);
    }
    return torrentIds;
  }

  /**
   * @description downloads the details of a torrent using `d.multicall2` method
   * @param torrentIds torrent hashes to be fetched
   * @param keys properties of a torrent (download) entity, which should be fetched
   */
  public async getTorrentDetails(torrentIds: string[], ...keys: WritableKeys<Download>[]): Promise<Download[]> {
    if (keys?.length <= 0) {
      keys = GetFieldsToPopulate(new Download()).map(x => x.key);
    }
    const mappedKeys = this.PrepareQuery(keys)?.map((x: string) => `${x}=`);
    return (await this.client.methodCall('d.multicall2', torrentIds, '', ...mappedKeys)).map((x: []) => {
      console.log('Method call done, results: ', x);
      const obj: Download = new Download();
      keys.forEach((key, index) => {
        obj.setValue(key, x[index]);
      });
      return obj;
    });
  }

  public async getCommands(): Promise<string[]> {
    const values = await this.client.methodCall('system.listMethods');
    return values;
  }

  public PrepareQuery(keysToInclude: WritableKeys<Download> | WritableKeys<Download>[]): string[] {
    if (keysToInclude instanceof Array) {
      return keysToInclude.map(keyToInclude => {
        return GetXmlRpcPropertyKey<Download>(this.downloadInstance, keyToInclude);
      });
    } else {
      return [GetXmlRpcPropertyKey<Download>(this.downloadInstance, keysToInclude)];
    }
  }
}
