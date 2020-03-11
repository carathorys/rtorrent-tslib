import * as proc from 'process';

declare const global: any;
declare const window: any;
declare const process: any;

try {
  const _ = global === undefined;
} catch (err) {
  window['global'] = window;
}

try {
  const _ = process === undefined;
} catch (err) {
  window['process'] = proc;
}

export default window;
