import React from 'react'
import styles from "../styles/PizzaList.module.scss";
import PizzaCard from './PizzaCard';

type Props = {
    pizzaList: {
        _id: string,
        title: string,
        desc: string,
        img: string,
        prices: number[],
        extraOptions: { text: string, price: number }[]
    }[]
}

export default function PizzaList({ pizzaList }: Props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos repellendus culpa nobis. Dolorum, illum deleniti? Sed aperiam iure excepturi, dicta eligendi vitae fugit praesentium voluptatem voluptate, libero, sint vel dolore.
            </p>
            <div className={styles.wrapper}>
                {
                    pizzaList.map(pizza => <PizzaCard key={pizza._id} pizza={pizza}></PizzaCard>)
                }
            </div>
        </div>
    )
}