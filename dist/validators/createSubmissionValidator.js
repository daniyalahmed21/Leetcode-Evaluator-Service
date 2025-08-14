"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateSubmissionDto = void 0;
const validateCreateSubmissionDto = (schema) => (req, res, next) => {
    try {
        schema.parse(Object.assign({}, req.body));
        next();
    }
    catch (error) {
        console.log("validateCreateSubmissionDto", error);
        return res.status(400).json({
            success: true,
            data: {},
            error: error,
            message: "Invalid request params recieved",
        });
    }
};
exports.validateCreateSubmissionDto = validateCreateSubmissionDto;
