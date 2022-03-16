import Image from "next/image"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "../../styles/Cart.module.scss"
import { useState, useEffect } from 'react';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import cartSlice, { resetCart } from "../../redux/cartSlice";
import OrderDetail from "../../components/OrderDetail";
type Props = {}

export default function index({ }: Props) {

    // This values are the props in the UI
    const currency = "USD";
    const style: { layout: "vertical" } = { "layout": "vertical" };
    const [open, setOpen] = useState(false);
    const state = useSelector((state: RootState) => state.cart);
    const [total, setTotal] = useState(0);
    const [cash, setCash] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        let total = 0;

        state.products.map(product => {
            total += product.total;
        })

        setTotal(total);

        return () => {

        }
    }, [])

    const createOrder = async (data: {
        customer: string;
        address: string;
        total: number;
        method: number;
    }) => {
        try {
            const res = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const resData = await res.json();

            res.status === 201 && router.push("/orders/" + resData._id);

            dispatch(resetCart());
        } catch (err) {
            console.log(err);
        }

    }

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }: any) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);


        return (<>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[total, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: total.toString(),
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions: any) {
                    return actions.order.capture().then(function (details: any) {
                        const shipping = details.purchase_units[0].shipping;
                        createOrder({
                            customer: shipping.name.full_name,
                            address: shipping.address.address_line_1,
                            total: total,
                            method: 1
                        })
                    });
                }}
            />
        </>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.trTitle}>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Extras</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>${total}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b>$0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>${total}
                    </div>
                    {
                        open ? (
                            <div className={styles.paymentMethods}>
                                <button className={styles.payButton} onClick={() => setCash(true)}>CASH ON DELIVERY</button>
                                <PayPalScriptProvider
                                    options={{
                                        "client-id": "AalRqZ9gQ9jB2-Qvsqu30ii9z7TMiffhT_fqu7JfQelZ31LgjZ-cOYIoNAVYvhvfsVvy3kEZxEpTAaS6",
                                        components: "buttons",
                                        currency: "USD",
                                        "disable-funding": "credit,card,p24"
                                    }}
                                >
                                    <ButtonWrapper
                                        currency={currency}
                                        showSpinner={false}
                                    />
                                </PayPalScriptProvider>
                            </div>) : (<button onClick={() => setOpen(true)} className={styles.button}>CHECKOUT NOW!</button>)
                    }
                </div>
            </div>
            {
                cash && (
                    <OrderDetail total={total} createOrder={createOrder}></OrderDetail>
                )
            }
        </div >
    );
}