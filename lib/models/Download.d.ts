import { XmlRpcEntity } from '../XmlRpc';
export declare class Download extends XmlRpcEntity<Download> {
    name: string;
    directory: string;
    state: boolean;
    isOpen: boolean;
    isActive: boolean;
    bytesDone: number;
    complete: boolean;
    completedBytes: number;
    connectionCurrent: number;
    connectedLeeches: number;
    connectedSeeds: number;
    creationDate: string;
    downRate: number;
    hash: string;
    hashing: number;
    isPartiallyDone: boolean;
    isPrivate: boolean;
    bitfield: boolean;
    priority: number;
    peers: number;
    peersCompleted: number;
    connectedPeers: number;
    get IsClosed(): boolean;
    get IsPaused(): boolean;
    get IsStarted(): boolean;
}
