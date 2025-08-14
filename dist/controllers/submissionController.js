"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSubmission = void 0;
const addSubmission = (req, res) => {
    const submissionDto = req.body;
    res.status(201).json({
        success: true,
        message: "Successfully collected submission",
        error: {},
        data: submissionDto,
    });
};
exports.addSubmission = addSubmission;
