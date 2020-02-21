import { XmlRpcKey, XmlRpcEntity } from '../XmlRpc';

export class Download extends XmlRpcEntity<Download> {
  @XmlRpcKey<Download>('d.name')
  public name: string;

  @XmlRpcKey<Download>('d.directory')
  public directory: string;

  @XmlRpcKey<Download>('d.state')
  public state: boolean;

  @XmlRpcKey<Download>('d.is_open')
  public isOpen: boolean;

  @XmlRpcKey<Download>('d.is_active')
  public isActive: boolean;

  @XmlRpcKey<Download>('d.bytes_done')
  public bytesDone: number;

  @XmlRpcKey<Download>('d.complete')
  public complete: boolean;

  @XmlRpcKey<Download>('d.completed_bytes')
  public completedBytes: number;

  @XmlRpcKey<Download>('d.connection_current')
  public connectionCurrent: number;

  @XmlRpcKey<Download>('d.connection_leech')
  public connectedLeeches: number;

  @XmlRpcKey<Download>('d.connection_seed')
  public connectedSeeds: number;

  @XmlRpcKey<Download>('d.creation_date')
  public creationDate: string;

  @XmlRpcKey<Download>('d.down.rate')
  public downRate: number;

  @XmlRpcKey<Download>('d.hash')
  public hash: string;

  @XmlRpcKey<Download>('d.hashing')
  public hashing: number;

  @XmlRpcKey<Download>('d.is_partially_done')
  public isPartiallyDone: boolean;

  @XmlRpcKey<Download>('d.is_private')
  public isPrivate: boolean;

  @XmlRpcKey<Download>('d.bitfield')
  public bitfield: boolean;

  @XmlRpcKey<Download>('d.priority')
  public priority: number;

  @XmlRpcKey<Download>('d.peers_accounted')
  public peers: number;

  @XmlRpcKey<Download>('d.peers_complete')
  public peersCompleted: number;

  @XmlRpcKey<Download>('d.peers_connected')
  public connectedPeers: number;

  public get IsClosed(): boolean {
    return this.isOpen === false && this.state === false;
  }
  public get IsPaused(): boolean {
    return this.isOpen === true && this.isActive === false && this.state === false;
  }
  public get IsStarted(): boolean {
    return this.isOpen === true && this.isActive === true && this.state === true;
  }
}
