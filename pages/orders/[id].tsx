import Image from "next/image"
import styles from "../../styles/Order.module.scss"
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'

type Props = {}

export default function Order({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const status = 0;

    const statusClass = (index: number) => {
        if (index - status < 1) return styles.done;
        if (index - status === 1) return styles.inProgress;
        if (index - status > 1) return styles.undone;
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.row}>
                    <table className={styles.table}>
                        <tr className={styles.trTitle}>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Total</th>
                        </tr>
                        <tr className={styles.tr}>
                            <td>
                                <span className={styles.id}>{data._id}</span>
                            </td>
                            <td>
                                <span className={styles.name}>
                                    {data.customer}
                                </span>
                            </td>
                            <td>
                                <span className={styles.address}>{data.address}</span>
                            </td>
                            <td>
                                <span className={styles.total}>${data.total}</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className={styles.row}>
                    <div className={statusClass(0)}>
                        <Image src="/img/paid.png" width={30} height={30} alt="paid img"></Image>
                        <span>Payment</span>
                        <div className={styles.checkdIcon}>
                            <Image src="/img/checked.png" width={20} height={20} alt="check img"></Image>
                        </div>
                    </div>
                    <div className={statusClass(1)}>
                        <Image src="/img/bake.png" width={30} height={30} alt="bake img" />
                        <span>Preparing</span>
                        <div className={styles.checkedIcon}>
                            <Image
                                className={styles.checkedIcon}
                                src="/img/checked.png"
                                width={20}
                                height={20}
                                alt="checked icon"
                            />
                        </div>
                    </div>
                    <div className={statusClass(2)}>
                        <Image src="/img/bike.png" width={30} height={30} alt="bike img" />
                        <span>On the way</span>
                        <div className={styles.checkedIcon}>
                            <Image
                                className={styles.checkedIcon}
                                src="/img/checked.png"
                                width={20}
                                height={20}
                                alt="checked icon"
                            />
                        </div>
                    </div>
                    <div className={statusClass(3)}>
                        <Image src="/img/delivered.png" width={30} height={30} alt="delivered img" />
                        <span>Delivered</span>
                        <div className={styles.checkedIcon}>
                            <Image
                                className={styles.checkedIcon}
                                src="/img/checked.png"
                                width={20}
                                height={20}
                                alt="checked icon"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>${data.total}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b>$0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>${data.total}
                    </div>
                    <button disabled className={styles.button}>PAID</button>
                </div>
            </div>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    try {
        const res = await fetch(`/api/orders/${params?.id}`);
        const data = await res.json();

        return {
            props: {
                data
            }
        }
    } catch (err) {
        return {
            notFound: true
        }
    }
}