import Image from "next/image"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "../../styles/Cart.module.scss"
import { useState, useEffect } from 'react';
type Props = {}

export default function index({ }: Props) {
    const state = useSelector((state: RootState) => state.cart);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let total = 0;

        state.products.map(product => {
            total += product.total;
        })

        setTotal(total);

        return () => {

        }
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <tr className={styles.trTitle}>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Extras</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                    {
                        state.products.length ? state.products.map((product, idx) => (
                            <tr className={styles.tr} key={idx}>
                                <td>
                                    <div className={styles.imgContainer}>
                                        <Image
                                            src={product.img}
                                            layout="fill"
                                            objectFit="cover"
                                            alt=""
                                        />
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.name}>{product.name}</span>
                                </td>
                                <td>
                                    <span className={styles.extras}>
                                        {
                                            product.extras.length && product.extras.map((extra, idx) => {
                                                if (extra) {
                                                    if (idx !== product.extras.length - 1) {
                                                        return `${extra}, `;
                                                    } else {
                                                        return extra;
                                                    }
                                                }
                                            })
                                        }
                                    </span>
                                </td>
                                <td>
                                    <span className={styles.price}>${product.price}</span>
                                </td>
                                <td>
                                    <span className={styles.quantity}>{product.quantity}</span>
                                </td>
                                <td>
                                    <span className={styles.total}>${product.total}</span>
                                </td>
                            </tr>
                        )) : null
                    }
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>{total}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b>$0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>{total}
                    </div>
                    <button className={styles.button}>CHECKOUT NOW!</button>
                </div>
            </div>
        </div>
    );
}