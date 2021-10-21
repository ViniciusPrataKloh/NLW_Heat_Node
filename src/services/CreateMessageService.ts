import prismaClient from "../prisma"

import { io } from "../app";

class CreateMessageService {
    async execute(text: string, user_id: string) {

        const result = prismaClient.messages.create({
            data: {
                text,
                user_id
            },
            include: {
                user: true
            }
        });

        const infoWS = {
            text: (await result).text,
            user_id: (await result).user_id,
            created_at: (await result).create_at,
            user: {
                name: (await result).user.name,
                avatar_url: (await result).user.avatar_url
            },
        };

        io.emit("new_message", infoWS);

        console.log(result.user.name);

        return result;
    }
}

export { CreateMessageService }