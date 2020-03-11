import * as process from 'process';

export * from './RTorrentClient';
export * from './models';


if (typeof window !== 'undefined') {
  (window as any).process = process;
}
