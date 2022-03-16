import React from 'react'
import styles from "../styles/OrderDetail.module.scss";
import { useState } from 'react';

type Props = {
    createOrder: (data: {
        customer: string;
        address: string;
        total: number;
        method: number;
    }) => Promise<void>;
    total: number;
}

export default function ({ total, createOrder }: Props) {
    const [info, setInfo] = useState({
        name: "",
        address: ""
    })

    const changeHandler = (e: React.ChangeEvent) => {
        const { name, value } = e.target as HTMLInputElement;

        setInfo({
            ...info,
            [name]: value
        })
    }

    const handleClick = () => {
        createOrder({ customer: info.name, address: info.address, total, method: 0 });
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>You Will pay ${total} after delivery</h1>
                <div className={styles.item}>
                    <label htmlFor="" className={styles.label}>Name Surname</label>
                    <input type="text" name="name" placeholder='John Doe' className={styles.input} onChange={changeHandler} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Phone Number</label>
                    <input
                        type="text"
                        placeholder="+1 234 567 89"
                        className={styles.input}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Address</label>
                    <textarea
                        rows={5}
                        placeholder="Elton St. 505 NY"
                        name="address"
                        className={styles.textarea}
                        onChange={changeHandler}
                    />
                </div>
                <button className={styles.button} onClick={handleClick}>
                    Order
                </button>
            </div>
        </div>
    )
}