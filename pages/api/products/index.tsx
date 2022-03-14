import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    _id: string,
    title: string,
    desc: string,
    img: string,
    prices: number[],
    extraOptions: { text: string, price: number }[]
}[]

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    dbConnect();

    const { method } = req;

    if (method === "GET") {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch (err: any) {
            res.status(500).json(err);
        }
    }

    if (method === "POST") {
        try {
            const product = await Product.create(req.body);
            res.status(201).json([product]);
        } catch (err: any) {
            res.status(500).json(err);
        }
    }

}