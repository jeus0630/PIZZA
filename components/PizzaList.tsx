import React from 'react'
import styles from "../styles/PizzaList.module.scss";
import PizzaCard from './PizzaCard';

type Props = {}

export default function PizzaList({ }: Props) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos repellendus culpa nobis. Dolorum, illum deleniti? Sed aperiam iure excepturi, dicta eligendi vitae fugit praesentium voluptatem voluptate, libero, sint vel dolore.
            </p>
            <div className={styles.wrapper}>
                <PizzaCard></PizzaCard>
                <PizzaCard></PizzaCard>
                <PizzaCard></PizzaCard>
                <PizzaCard></PizzaCard>
                <PizzaCard></PizzaCard>
                <PizzaCard></PizzaCard>
            </div>
        </div>
    )
}