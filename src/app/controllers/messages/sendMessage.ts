import { Request, Response } from "express";
import { Message } from "../../models/Message";

export const sendMessage = async (req: Request, res: Response) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({
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
  return res.status(200).json({
    message: "Message sent successfully",
  });
};
