import { Request, Response } from "express";

export const PingController = (req: Request, res: Response) => {
  console.log(req);
  return res.status(200).json({
    msg: "Ping controller up",
  });
};
