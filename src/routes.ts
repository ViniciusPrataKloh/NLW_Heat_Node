import { Router } from "express";
import { AuthenticacteUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { GetProfileUserController } from "./controllers/GetProfileUserController";
import { ensureAuthenticated } from "./midllewares/EnsureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticacteUserController().handle);

router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);

router.get("/messages/last3", new GetLast3MessagesController().handle);

router.get("/profile", ensureAuthenticated, new GetProfileUserController().handle);

export { router };