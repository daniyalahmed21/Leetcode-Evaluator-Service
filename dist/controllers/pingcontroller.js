"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingController = void 0;
const PingController = (req, res) => {
    console.log(req);
    return res.status(200).json({
        msg: "Ping controller up",
    });
};
exports.PingController = PingController;
