import { Request, Response, NextFunction, RequestHandler } from 'express';

const myLogger: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`//////// new request >>>>>>>>>>>>>>>>>>>>>>>>`);
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);
  console.log(`Request Query params: ${JSON.stringify(req.query)}`);
  console.log(`Request IP: ${req.ip}`);
  console.log(`Request date: ${new Date()}`);

  next();
};

export default myLogger;
