import express from 'express';
import startServer from './libs/boot';
import injectMiddlewares from './libs/middlewares';
import injectRoutes from './routes';

const server = express();

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;
