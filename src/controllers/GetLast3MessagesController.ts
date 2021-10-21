import { Request, Response } from "express";
import { GetLast3MessagesService } from "../services/GetLast3MessagesService";

class GetLast3MessagesController {
    async handle(req: Request, res: Response) {
        try {
            const service = new GetLast3MessagesService();
            const results = await service.execute();

            return res.json(results);
        } catch (err) {
            res.json({
                message: err.message
            });
        }
    }

}

export { GetLast3MessagesController }