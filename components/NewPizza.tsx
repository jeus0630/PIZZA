import React from 'react'
import styles from "../styles/NewPizza.module.scss"
import axios from 'axios'

type Props = {
    setNewPizza: React.Dispatch<React.SetStateAction<boolean>>
}

import { useState } from 'react';

type Pizza = {
    title: string;
    desc: string;
    img: string;
    prices: number[],
    extraOptions: { text: string; price: number; }[] | [];
    option: string;
    price: string;
}

export default function NewPizza({ setNewPizza }: Props) {

    const [pizza, setPizza] = useState<Pizza>({
        title: '',
        desc: '',
        img: '',
        prices: [0],
        extraOptions: [],
        option: '',
        price: ''
    })

    const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e.target.files;
        const data = new FormData();
        let file;
        if (files) {
            file = files[0];

            data.append("file", file);
            data.append("upload_preset", "uploads");

            const res = await axios.post("https://api.cloudinary.com/v1_1/dj8maapik/image/upload", data);

            const { url } = res.data;

            setPizza({
                ...pizza,
                img: url
            })
        } else {
            return;
        }

    }

    const changeHandler = async (e: React.ChangeEvent) => {
        const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;

        setPizza({
            ...pizza,
            [name]: value
        })
    }

    const priceHandler = (e: React.ChangeEvent, num: number) => {
        const { value } = e.target as HTMLInputElement;
        let prices = pizza.prices;
        prices[num] = parseInt(value, 10);

        setPizza({
            ...pizza,
            prices
        })
    }

    const extraHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        let extraOptions = [...pizza.extraOptions];

        const option = {
            text: pizza.option,
            price: parseInt(pizza.price, 10)
        }

        extraOptions.push(option)

        setPizza({
            ...pizza,
            extraOptions
        })
    }

    const createHandler = async () => {

        try {
            const res = await fetch("/api/products/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pizza)
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.container}>
            <form action="">
                <div className={styles.close} onClick={() => setNewPizza(false)}>X</div>
                <h1>Add a new Pizza</h1>
                <div className={styles.imageWrapper}>
                    <label htmlFor="image">Choose an image</label>
                    <input type="file" id="image" name="img" className={styles.imageInput} onChange={uploadImg} />
                </div>
                <div className={styles.titleWrapper}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name={"title"} id="title" onChange={changeHandler} />
                </div>
                <div className={styles.descWrapper}>
                    <label htmlFor="desc">Desc</label>
                    <textarea name="desc" id="desc" onChange={changeHandler}></textarea>
                </div>
                <div className={styles.priceWrapper}>
                    <label htmlFor="">Prices</label>
                    <div>
                        <input type="text" id="" placeholder='Small' onChange={(e) => priceHandler(e, 0)} />
                        <input type="text" id="" placeholder='Medium' onChange={(e) => priceHandler(e, 1)} />
                        <input type="text" id="" placeholder='Large' onChange={(e) => priceHandler(e, 2)} />
                    </div>
                </div>
                <div className={styles.extraWrapper}>
                    <label htmlFor="">Extra</label>
                    <div>
                        <input type="text" id="" placeholder='Option' name="option" onChange={changeHandler} />
                        <input type="text" id="" placeholder='Price' name="price" onChange={changeHandler} />
                        <button onClick={extraHandler}>Add</button>
                    </div>
                </div>
                {
                    pizza.extraOptions.length !== 0 ? pizza.extraOptions.map(extra => (
                        <div key={extra.text} className={styles.extraList}>
                            Option : {extra.text} &nbsp;&nbsp;
                            Price : {extra.price}
                        </div>
                    )) : null
                }
                <button className={styles.submitBtn} onClick={createHandler}>Create</button>
            </form>
        </div>
    )
}