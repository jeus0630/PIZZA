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
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await dbConnect();

    const { method, query: { id } } = req;

    if (method === "GET") {
        try {
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (err: any) {
            res.status(500).json(err);
        }
    }

    if (method === "DELETE") {


        try {
            const product = await Product.findByIdAndDelete(id);
            res.status(200).json(product);
        } catch (err: any) {
            res.status(500).json(err);
        }
    }
}