import chai from "chai";
import supertest from "supertest";
import server from "../server";

global.app = server;
global.request = supertest(server);
global.expect = chai.expect;
global.assert = chai.assert;
