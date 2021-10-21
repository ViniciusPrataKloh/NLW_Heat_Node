import { Request, Response } from "express";
import { GetProfileUserService } from "../services/GetProfileUserService";

class GetProfileUserController {
    async handle(req: Request, res: Response) {

        const { user_id } = req;

        try {
            const service = new GetProfileUserService();
            const result = await service.execute(user_id);

            return res.json(result);
        } catch (err) {
            res.json({
                message: err.message
            });
        }
    }

}

export { GetProfileUserController }