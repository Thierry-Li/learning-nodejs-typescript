import { Request, Response, NextFunction, RequestHandler } from 'express';

const myLogger: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  if (req.url === '/favicon.ico') {
    return next();
  }

  if (req.url === '/css/style.css') {
    return next();
  }

  console.log(`\n`);
  console.log(`>>>>>>>>>>>>>>>>>>>>>>>> INPUT REQUEST >>>>>>>>>>>>>>>>>>>>>>>>`);
  console.log(`Request date: ${new Date()}`);
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);
  console.log(`Request Query params: ${JSON.stringify(req.query)}`);
  console.log(`Request params: ${JSON.stringify(req.params)}`);
  console.log(`Request IP: ${req.ip}`);
  console.log(`\n`);

  next();
};

export default myLogger;
