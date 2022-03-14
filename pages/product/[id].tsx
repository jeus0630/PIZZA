import Image from "next/image"
import styles from "../../styles/Product.module.scss"
import { useState } from 'react';
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import { useRouter } from "next/router";

type Props = {}

export default function Product({ pizza }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [size, setSize] = useState(0);

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.img} alt="" layout="fill" objectFit="contain"></Image>
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{pizza.name}</h1>
                <span className={styles.price}>${pizza.prices[size]}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() => setSize(0)}>
                        <Image src="/img/size.png" layout="fill" alt=""></Image>
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={() => setSize(1)}>
                        <Image src="/img/size.png" layout="fill" alt=""></Image>
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={() => setSize(2)}>
                        <Image src="/img/size.png" layout="fill" alt=""></Image>
                        <span className={styles.number}>Large</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Choose additional ingredients</h3>
                <div className={styles.ingredients}>
                    <div className={styles.option}>
                        <input
                            type="checkbox"
                            id="double"
                            name="double"
                            className={styles.checkbox}
                        />
                        <label htmlFor="double">Double Ingredients</label>
                    </div>
                    <div className={styles.option}>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            id="cheese"
                            name="cheese"
                        />
                        <label htmlFor="cheese">Extra Cheese</label>
                    </div>
                    <div className={styles.option}>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            id="spicy"
                            name="spicy"
                        />
                        <label htmlFor="spicy">Spicy Sauce</label>
                    </div>
                    <div className={styles.option}>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            id="garlic"
                            name="garlic"
                        />
                        <label htmlFor="garlic">Garlic Sauce</label>
                    </div>
                </div>
                <div className={styles.add}>
                    <input type="number" defaultValue={1} className={styles.quantity} />
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