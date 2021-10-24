import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

/**
 * Receber o codigo
 * Recuperar o access token
 * Recuperar infos do user no GitHub
 * Verificar se user existe no db
 * --- sim: gera token
 * --- nao: cria no db e gera token
 * Retorna token e info do user na App
*/

interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthenticateUserService {
    async execute(code: string) {

        /**
         * Recuperar o access token
         */

        const url = "https://github.com/login/oauth/access_token";

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(
            url,
            null,
            {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                },
                headers: {
                    "Accept": "application/json"
                }
            }
        );


        /*
         * Recuperar infos do user no GitHub
         */

        const response = await axios.get<IUserResponse>(
            "https://api.github.com/user",
            {
                headers: { authorization: `Bearer ${accessTokenResponse.access_token}` },
            }
        );

        const { login, id, avatar_url, name } = response.data;


        /**
         * Verificar se user existe no DB
         */

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        });

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            });
        }


        /**
         * Retorna token e info do user na App
         */
        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id
                }
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "2h"
            }
        );

        return { token, user };
    }
}

export { AuthenticateUserService }