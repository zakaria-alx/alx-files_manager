import mongodb from "mongodb";
// eslint-disable-next-line no-unused-vars
import Collection from "mongodb/lib/collection";
import envLoader from "./env_loader";

/**
 * MongoDB client.
 */
class DBClient {
    /**
     * Creates a new DBClient instance.
     */
    constructor() {
        envLoader();
        const host = process.env.DB_HOST ?? "localhost";
        const port = process.env.DB_PORT ?? 27017;
        const database = process.env.DB_DATABASE ?? "files_manager";
        const dbURL = `mongodb://${host}:${port}/${database}`;

        this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
        this.client.connect();
    }

    /**
     * Checks if this client's connection is active.
     * @returns {boolean}
     */
    isAlive() {
        return this.client.isConnected();
    }

    /**
     * Retrieves the number of users in the db.
     * @returns {Promise<Number>}
     */
    async nbUsers() {
        return this.client.db().collection("users").countDocuments();
    }

    /**
     * Retrieves the number of files in the db.
     * @returns {Promise<Number>}
     */
    async nbFiles() {
        return this.client.db().collection("files").countDocuments();
    }

    /**
     * Retrieves the `users` collection.
     * @returns {Promise<Collection>}
     */
    async usersCollection() {
        return this.client.db().collection("users");
    }

    /**
     * Retrieves the `files` collection.
     * @returns {Promise<Collection>}
     */
    async filesCollection() {
        return this.client.db().collection("files");
    }
}

export const dbClient = new DBClient();
export default dbClient;
