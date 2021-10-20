import { Router } from "express";
import { AuthenticacteUserController } from "./controllers/AuthenticateUserController";

const router = Router();

router.post("/authenticate", new AuthenticacteUserController().handle);

router.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

router.get("/signin/callback", (request, response) => {
    const { code } = request.query;
    return response.json(code);
});

export { router };