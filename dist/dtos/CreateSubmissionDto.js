"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubmissionZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateSubmissionZodSchema = zod_1.default.object({
    userId: zod_1.default.string(),
    problemId: zod_1.default.string(),
    language: zod_1.default.string(),
    code: zod_1.default.string(),
});
