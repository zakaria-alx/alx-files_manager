import envLoader from "../utils/env_loader";

/**
 * Starts Express application.
 * @param {Express} server
 */
const startServer = (server) => {
    envLoader();
    const port = process.env.PORT ?? 5000;
    const env = process.env.npm_lifecycle_event ?? "dev";
    server.listen(port, () => {
        console.log(`[${env}] Server started listening at port:${port}`);
    });
};

export default startServer;
