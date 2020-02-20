import { XmlRpcKey, XmlRpcEntity, GetFieldsToPopulate } from '../XmlRpc';

export class Download extends XmlRpcEntity<Download> {

  @XmlRpcKey('d.name', true)
  public name: string;

  @XmlRpcKey('d.directory')
  public directory: string;

  @XmlRpcKey('d.state')
  public state: boolean;

  @XmlRpcKey('d.is_open')
  public isOpen: boolean;

  @XmlRpcKey('d.is_active')
  public isActive: boolean;

  @XmlRpcKey('d.bytes_done')
  public bytesDone: number;

  @XmlRpcKey('d.complete')
  public complete: boolean;

  @XmlRpcKey('d.completed_bytes')
  public completedBytes: number;

  @XmlRpcKey('d.connection_current')
  public connectionCurrent: number;

  @XmlRpcKey('d.connection_leech')
  public connectedLeeches: number;

  @XmlRpcKey('d.connection_seed')
  public connectedSeeds: number;

  @XmlRpcKey('d.creation_date')
  public creationDate: string;

  @XmlRpcKey('d.down.rate')
  public downRate: number;

  @XmlRpcKey('d.hash')
  public hash: string;

  @XmlRpcKey('d.hashing')
  public hashing: number;

  @XmlRpcKey('d.is_partially_done')
  public isPartiallyDone: boolean;

  @XmlRpcKey('d.is_private')
  public isPrivate: boolean;

  @XmlRpcKey('d.bitfield')
  public bitfield: boolean;

  @XmlRpcKey('d.priority')
  public priority: number;

  @XmlRpcKey('d.peers_accounted')
  public peers: number;

  @XmlRpcKey('d.peers_complete')
  public peersCompleted: number;

  @XmlRpcKey('d.peers_connected')
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
