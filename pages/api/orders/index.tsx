import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await dbConnect();

    const { method } = req;

    if (method === "GET") {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (err: any) {
            res.status(500).json(err);
        }
    }

    if (method === "POST") {
        try {
            const order = await Order.create(req.body);
            res.status(201).json(order);
        } catch (err: any) {
            res.status(500).json(err);
        }
    }
}