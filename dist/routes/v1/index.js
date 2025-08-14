"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pingcontroller_1 = require("../../controllers/pingcontroller");
const submissionRoutes_1 = __importDefault(require("./submissionRoutes"));
const v1Router = express_1.default.Router();
v1Router.use("/submissions", submissionRoutes_1.default);
v1Router.get("/ping", pingcontroller_1.PingController);
exports.default = v1Router;
