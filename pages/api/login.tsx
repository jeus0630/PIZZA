import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

type Data = {
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const { username, password } = req.body;
        if (username === process.env.USERNAME && password === process.env.PASSWORD) {
            res.setHeader("Set-Cookie", cookie.serialize("token", process.env.TOKEN, {
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/",
            }));
            res.status(200).json("Successful");
        }
    } else {
        res.status(500).json("Wrong Credentials");
    }
}