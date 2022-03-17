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
        try {
            const order = await Order.findById(id);
            res.status(200).json(order);
        } catch (err: any) {
            res.status(500).json(err);
        }
    }

    if (method === "PUT") {
        try {
            const order = await Order.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json(order);
        } catch (err: any) {
            res.status(500).json(err);
        }
    }

    if (method === "DELETE") {

    }
}