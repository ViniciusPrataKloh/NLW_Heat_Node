import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
    async handle(req: Request, res: Response) {
        try {
            const { message } = req.body;
            const { user_id } = req;

            const service = new CreateMessageService();
            const results = await service.execute(message, user_id);

            return res.json(results);
        } catch (err) {
            res.json({
                message: err.message
            });
        }
    }

}

export { CreateMessageController }