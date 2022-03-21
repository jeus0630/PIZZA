import Image from 'next/image';
import React from 'react'
import styles from "../../styles/Admin.module.scss";
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import { useState } from 'react';
import NewPizza from '../../components/NewPizza';

type Props = {}

type Product = {
    createdAt: string;
    desc: string;
    extraOptions: { text: string; price: number; _id: string; }[]
    img: string;
    prices: number[];
    title: string;
    updatedAt: string;
    __v: number;
    _id: string;
}

type Order = {
    address: string;
    createdAt: string;
    customer: string;
    method: number;
    status: number;
    total: number;
    updatedAt: string;
    __v: number;
    _id: string;
}

export default function Index({ products, orders }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [productList, setProductList] = useState(products);
    const [orderList, setorderList] = useState(orders);
    const [newPizza, setNewPizza] = useState(false);
    const status = ["preparing", "on the way", "delivered"];

    const productEditHandler = async (id: string) => {
        console.log(id);
    }

    const productDeleteHandler = async (id: string) => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            setProductList(productList.filter(product => product._id !== id));

        } catch (err) {
            console.log(err);
        }

    }

    const stageHandler = async (id: string) => {

        const item = orderList.filter(order => order._id === id)[0];
        const currentStatus = item.status;

        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: currentStatus + 1
                })
            });

            const data = await res.json();

            setorderList([
                data,
                ...orderList.filter(order => order._id !== id)
            ])
        } catch (err) {
            console.log(err);
        }
    }

    const addPizzaHandler = async () => {
        setNewPizza(true);
    }

    return (
        <div className={`${styles.container} ${newPizza ? styles.modal : ''}`}>
            {
                newPizza && <NewPizza setNewPizza={setNewPizza}></NewPizza>
            }
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>

                <table className={styles.table}>
                    <thead>
                        <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productList.map(product => (
                                <tr className={styles.trTitle} key={product._id}>
                                    <td>
                                        <Image
                                            src={product.img}
                                            width={50}
                                            height={50}
                                            objectFit="cover"
                                        >

                                        </Image>
                                    </td>
                                    <td>{product._id.slice(0, 5)}...</td>
                                    <td>{product.title}</td>
                                    <td>{product.prices[0]}</td>
                                    <td>
                                        <button className={styles.button} onClick={() => productDeleteHandler(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <div className={styles.btnWrap}>
                    <button className={styles.newPizza} onClick={addPizzaHandler}>Add New Pizza</button>
                </div>
            </div>
            <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.trTitle}>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderList.map(order => (
                                <tr className={styles.trTitle} key={order._id}>
                                    <td>
                                        {
                                            "6116181613".slice(0, 5)
                                        }...
                                    </td>
                                    <td>{order.customer}</td>
                                    <td>${order.total}</td>
                                    <td>{order.method === 0 ? <span>Cash</span> : <span>Paid</span>}</td>
                                    <td>{status[order.status]}</td>
                                    <td>
                                        <button onClick={() => stageHandler(order._id)}>Next Stage</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >

        </div >
    )
}

export const getServerSideProps: GetServerSideProps<{ products: Product[], orders: Order[] }> = async ({ params, req }) => {
    const myCookie = req.cookies.token || "";

    if (myCookie !== process.env.TOKEN) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        }
    }

    try {
        const productRes = await fetch(`/api/products/`);
        const products = await productRes.json();

        const orderRes = await fetch(`/api/orders`);
        const orders = await orderRes.json();

        return {
            props: {
                products,
                orders
            }
        }
    } catch (err) {
        return {
            notFound: true
        }
    }
}