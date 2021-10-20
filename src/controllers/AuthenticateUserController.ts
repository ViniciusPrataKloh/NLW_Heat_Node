import { Request, response, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticacteUserController {
    async handle(req: Request, res: Response) {
        try {
            const { code } = req.body;

            const service = new AuthenticateUserService();
            const result = await service.execute(code);

            console.log("retorno no controller....");

            return res.json(result);
        } catch (err) {
            res.json({
                message: err.message
            });
        }
    }
}

export { AuthenticacteUserController }