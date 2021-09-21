import { Request, Response } from "express";

import { AppError } from "../../../../errors/AppError";
import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.params;
      const user = this.turnUserAdminUseCase.execute({ user_id });
      return response.json(user);
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

export { TurnUserAdminController };
