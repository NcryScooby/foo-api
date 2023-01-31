import { Request, Response } from "express";
import { Message } from "../../models/Message";
import { StatusCodes } from "http-status-codes";

export const sendMessage = async (req: Request, res: Response) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Please fill all fields",
    });
  }

  const newMessage = new Message({
    firstName,
    lastName,
    email,
    message,
  });
  await newMessage.save();
  return res.status(StatusCodes.OK).json({
    message: "Message sent successfully",
  });
};
