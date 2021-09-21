import { Response, Request } from "express";

import { AppError } from "../../../../errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { name, email } = request.body;
      const user = this.createUserUseCase.execute({ name, email });
      return response.status(201).json(user);
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

export { CreateUserController };
