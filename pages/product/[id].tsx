import Image from "next/image"
import styles from "../../styles/Product.module.scss"
import React, { useState, useEffect, useReducer } from 'react';
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import { useRouter } from "next/router";
import { totalmem } from "os";

type Props = {}

type stateType = { price: number; size: 0 | 1 | 2; ingredients: number; total: number }
type ActionType = | { type: "sizeChoose"; payload: { size: 0 | 1 | 2, price: number }; } | { type: "ingredientChoose"; payload: number; } | { type: "totalChoose"; payload: number; } | { type: "initPrice"; payload: number; }
type reducerType = (state: stateType, action: ActionType) => stateType;

const reducer: reducerType = (state, action) => {
    switch (action.type) {
        case "sizeChoose":
            if (action.payload.size > state.size) {
                const price = state.total * action.payload.price;
                return {
                    ...state,
                    size: action.payload.size,
                    price: state.price + price
                }
            } else if (action.payload.size === state.size) {
                return {
                    ...state
                }
            } else {
                const price = state.total * action.payload.price;
                return {
                    ...state,
                    size: action.payload.size,
                    price: state.price + price
                }
            }
        case "ingredientChoose":
            const ingredient = action.payload * state.total;
            return {
                ...state,
                price: state.price + ingredient
            }
        case "totalChoose":
            const eachPrice = state.price / state.total;
            const addPrice = eachPrice * (action.payload - state.total);
            return {
                ...state,
                price: state.price + addPrice,
                total: action.payload
            }
        case "initPrice":
            return {
                ...state,
                price: state.price + action.payload
            }
        default:
            return initialState;
    }
};

const initialState: stateType = {
    price: 0,
    size: 0,
    ingredients: 0,
    total: 1
};


export default function Product({ pizza }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "initPrice", payload: pizza.prices[0] });

        return () => {

        }
    }, [])

    const sizeHandler = (chosenSize: 0 | 1 | 2) => {
        const price = pizza.prices[chosenSize] - pizza.prices[state.size];
        dispatch({ type: "sizeChoose", payload: { size: chosenSize, price } });
    }

    const optionHandler = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const price = target.dataset.price;

        if (target.checked) {
            price && dispatch({ type: "ingredientChoose", payload: parseInt(price, 10) });
        } else {
            price && dispatch({ type: "ingredientChoose", payload: -parseInt(price, 10) });
        }
    }

    const totalHandler = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const value = parseInt(target.value, 10);
        dispatch({ type: "totalChoose", payload: value });
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.img} alt="" layout="fill" objectFit="contain"></Image>
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{pizza.name}</h1>
                <span className={styles.price}>${state.price}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() => sizeHandler(0)}>
                        <Image src="/img/size.png" layout="fill" alt=""></Image>
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={() => sizeHandler(1)}>
                        <Image src="/img/size.png" layout="fill" alt=""></Image>
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={() => sizeHandler(2)}>
                        <Image src="/img/size.png" layout="fill" alt=""></Image>
                        <span className={styles.number}>Large</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Choose additional ingredients</h3>
                <div className={styles.ingredients}>
                    {
                        pizza.extraOptions.map((opt: { text: string, price: string, _id: string }) => (
                            <div className={styles.option} key={opt._id}>
                                <input
                                    type="checkbox"
                                    id={opt.text}
                                    name={opt.text}
                                    className={styles.checkbox}
                                    onChange={optionHandler}
                                    data-price={opt.price}
                                />
                                <label htmlFor={opt.text}>{opt.text}</label>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.add}>
                    <input type="number" defaultValue={1} className={styles.quantity} onChange={totalHandler} min={1} />
                    <button className={styles.button}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    try {
        const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
        const data = await res.json();
        console.log(data);

        return {
            props: {
                pizza: data
            }
        }
    } catch (err) {
        console.log(err);

        return {
            props: {
                pizza: 1
            }
        }
    }
}