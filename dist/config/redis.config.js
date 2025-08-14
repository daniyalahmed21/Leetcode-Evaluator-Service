"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const server_config_1 = __importDefault(require("./server.config"));
const redisConfig = {
    port: Number(server_config_1.default.REDIS_PORT),
    host: server_config_1.default.REDIS_HOST,
    maxRetriesPerRequest: null, // <-- THE FIX IS HERE
};
const redisConnection = new ioredis_1.default(redisConfig);
exports.default = redisConnection;
