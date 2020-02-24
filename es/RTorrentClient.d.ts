import { WritableKeys } from './helpers';
import { Download } from './models';
import { XmlRpcClient, ClientOptions } from './XmlRpc';
export declare class RTorrentClient {
    protected readonly downloadInstance: Download;
    protected readonly client: XmlRpcClient;
    constructor(clientOptions: ClientOptions);
    getTorrents(fetchDetails?: boolean, ...keys: WritableKeys<Download>[]): Promise<Download[] | string[]>;
    getTorrentDetails(torrentIds: string[], ...keys: WritableKeys<Download>[]): Promise<Download[]>;
    getCommands(): Promise<string[]>;
    PrepareQuery(keysToInclude: WritableKeys<Download> | WritableKeys<Download>[]): string[];
}
