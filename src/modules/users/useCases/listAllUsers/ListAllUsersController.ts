import { Request, Response } from "express";

import { AppError } from "../../../../errors/AppError";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.headers;

      const userId = user_id as string;

      const users = this.listAllUsersUseCase.execute({ user_id: userId });
      return response.json(users);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      }

      return response.status(500).json({
        status: "error",
        message: `Internal server error - ${error.message}`,
      });
    }
  }
}

export { ListAllUsersController };
