import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import { XmlRpcRepository } from 'src/server';
import { Download } from 'src/server/models';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ng-mc/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    }),
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    }),
  );

  server.get('/api/*', async (req, res) => {
    try {
      const client = new XmlRpcRepository();
      const torrents = await client.getTorrents();
      res
        .status(200)
        .contentType('json')
        .send(torrents);
      // tslint:disable-next-line: only-arrow-functions
      // const fn = function(x?: Download, otherParams?: any) {
      //   console.log('FN parameter: ', x);
      //   return [x.hash, x.downRate, x.peers];
      // };
      // console.log(d.PrepareQuery(fn));
      // console.log(d.PrepareQuery(x => [x.hash, x.downRate, x.peers]));

      // console.log(d.PrepareQuery(['completedBytes', 'connectedSeeds']));
      // res.status(200).send('');
      // res.send(d.PrepareQuery('bytesDone', 'completedBytes'));

      // const torrents = await client.getTorrents();
      // res.send(torrents);
      // client.methodCall('system.listMethods', [], (error, value) => {
      //   console.log('Error:', error);
      //   console.log('Value:', value);
      //   try {
      //     res.status(200).setHeader('Content-Type', 'application/json');
      //     res.send(JSON.stringify({ value, error }));
      //   } catch {
      //     res.status(500);
      //     res.send('{"success": false}');
      //   }
      // });
    } catch (error) {
      console.log('error', error);
      res.status(500);
      res.send(error);
      return;
    }
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
