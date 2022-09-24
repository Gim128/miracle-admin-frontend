import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import {StaticConfig} from './src/app/app-static-config';

const fs = require('fs');

// The Express app is exported so that it can be used by serverless Functions.
export function app(webAppConfig) {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  server.get('/health', (req, res) => {
    res.status(200);
    res.send('OK');
    res.end();
  });

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // check language code.
  server.get('/', (req: any, res, next) => {
    if (req.path === '/') {
      res.writeHead(302, {Location: '/' + webAppConfig.LANGUAGE});
      res.end();
    } else {
      next();
    }
  });

  server.get('/:lan*', (req, res, next) => {
    webAppConfig.LANGUAGE = webAppConfig.DEFAULT_LANGUAGE || 'en';
    if (req.params.lan && StaticConfig.lanMap[req.params.lan]) {
      const lanCodeList = StaticConfig.lanCodeList;
      if (lanCodeList.indexOf(StaticConfig.lanMap[req.params.lan].lanKey) > -1) {
        webAppConfig.LANGUAGE = req.params.lan;
        next();
      } else {
        res.writeHead(302, {Location: '/' + webAppConfig.LANGUAGE});
        res.end();
      }
    } else {
      res.writeHead(302, {Location: '/' + webAppConfig.LANGUAGE});
      res.end();
    }
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: req.baseUrl
        },
        {
          provide: '__WEB_APP_CONFIG__',
          useValue: webAppConfig
        },
      ]
    });
  });

  return server;
}

function run(webAppConfig) {
  // Start up the Node server
  const PORT = process.env.PORT || webAppConfig.SERVER.PORT;
  const server = app(webAppConfig);
  server.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  fs.readFile('web-app.config.json', 'utf8', (err, json) => {
    if (err) {
      console.error(err);
    } else {
      const webAppConfig = JSON.parse(json);
      run(webAppConfig);
    }
  });
}

export * from './src/main.server';
