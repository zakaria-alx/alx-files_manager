import express from "express";

/**
 * Adds middlewares to the given express application.
 * @param {express.Express} server The express application.
 */
const injectMiddlewares = (server) => {
    server.use(express.json({ limit: "200mb" }));
};

export default injectMiddlewares;
