import http, { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { URL } from 'url';

const getViewUrl = (url: string) => {
  return `views${url}.html`;
};

/**
 * Handles the HTTP request and sends the res.
 * @param req - The incoming request.
 * @param res - The server res.
 */
function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  const { url, method } = req as { url: string | undefined; method: string | undefined };

  const baseURL = `http://${req.headers.host}/`;
  const newUrl = url && new URL(url, baseURL);
  const pathname = newUrl && newUrl.pathname;
  const path = `${__dirname}/`;
  const FAVICON = './public/images/favicon.ico';

  if (method === HttpMethod.GET && pathname === '/favicon.ico') {
    res.setHeader('Content-Type', 'image/x-icon');

    fs.createReadStream(FAVICON).pipe(res);

    return;
  }

  if (url) {
    if (url.indexOf('.') === -1) {
      switch (url) {
        case '/':
          customReadFile(path.concat(getViewUrl('/homepage')), res);
          return;

        case '/message-saved':
          customReadFile(path.concat(getViewUrl(url)), res);
          return;

        case '/health':
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ok, server is healthy' }));

          return;

        case '/message':
          if (method === HttpMethod.GET) {
            customReadFile(path.concat(getViewUrl(url)), res);
          }

          if (method === HttpMethod.POST) {
            try {
              const body: Buffer[] = [];
              req.on('data', (chunk: Buffer) => {
                body.push(chunk);
              });

              req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                const message = parsedBody.split('=')[1];

                fs.writeFile('message.txt', message, (_err) => {
                  if (_err) {
                    console.error('message error : ', _err);
                    sendErrorres(res);
                  }

                  res.statusCode = 302;
                  res.setHeader('Location', '/message-saved');
                  res.end();
                });
              });
            } catch (err) {
              console.error('err write file', err);
            }
          }
          return;

        default:
          return sendErrorres(res);
      }
    } else if (url.indexOf('.js') !== -1) {
      res.writeHead(StatusCodes.OK, {
        'Content-Type': 'text/javascript',
      });
      customReadFile(`./public/js${url}`, res);
    } else if (url.indexOf('.css') !== -1) {
      res.writeHead(StatusCodes.OK, {
        'Content-Type': 'text/css',
      });
      customReadFile(`./public/css${url}`, res);
    } else if (url.indexOf('.png') !== -1) {
      res.writeHead(StatusCodes.OK, {
        'Content-Type': 'image/png',
      });
      customReadFile(`./public/images${url}`, res);
    } else {
      sendErrorres(res);
    }
  }
}

const server = http.createServer(handleRequest);

const hostname: string = '127.0.0.1';
const port: number = 3000;

server.listen(port, hostname, () => {
  console.log(`Server is listening at https://${hostname}:${port}`);
});

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const customReadFile = (file_path: string | Buffer | URL, res: http.ServerResponse<http.IncomingMessage>) => {
  if (fs.existsSync(file_path)) {
    fs.readFile(file_path, (error, data) => {
      if (error) {
        sendErrorres(res);
        return;
      }
      res.writeHead(StatusCodes.OK, {
        'Content-Type': 'text/html',
      });
      res.write(data);
      res.end();
    });
  } else {
    sendErrorres(res);
  }
};

const sendErrorres = (res: http.ServerResponse<http.IncomingMessage>) => {
  res.writeHead(StatusCodes.NOT_FOUND, {
    'Content-Type': 'text/html',
  });
  res.write('<h1>File Not Found!</h1>');
  res.end();
};
