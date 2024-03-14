// eslint-disable-next-line no-unused-vars
import { Express } from "express";
import AppController from "../controllers/AppController";
import AuthController from "../controllers/AuthController";
import FilesController from "../controllers/FilesController";
import UsersController from "../controllers/UsersController";
import { basicAuthenticate, xTokenAuthenticate } from "../middlewares/auth";
import { APIError, errorResponse } from "../middlewares/error";

/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} server
 */
const injectRoutes = (server) => {
    server.get("/status", AppController.getStatus);
    server.get("/stats", AppController.getStats);

    server.get("/connect", basicAuthenticate, AuthController.getConnect);
    server.get("/disconnect", xTokenAuthenticate, AuthController.getDisconnect);

    server.post("/users", UsersController.postNew);
    server.get("/users/me", xTokenAuthenticate, UsersController.getMe);

    server.post("/files", xTokenAuthenticate, FilesController.postUpload);
    server.get("/files/:id", xTokenAuthenticate, FilesController.getShow);
    server.get("/files", xTokenAuthenticate, FilesController.getIndex);
    server.put("/files/:id/publish", xTokenAuthenticate, FilesController.putPublish);
    server.put("/files/:id/unpublish", xTokenAuthenticate, FilesController.putUnpublish);
    server.get("/files/:id/data", FilesController.getFile);

    server.all("*", (req, res, next) => {
        errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
    });
    server.use(errorResponse);
};

export default injectRoutes;
