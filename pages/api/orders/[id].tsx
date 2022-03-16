import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    dbConnect();

    const { method, query: { id } } = req;

    if (method === "GET") {

    }

    if (method === "PUT") {

    }

    if (method === "DELETE") {
        
    }
}