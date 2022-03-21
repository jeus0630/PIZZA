import styles from "../styles/Navbar.module.scss";
import Image from 'next/image'
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Props = {}

export default function Navbar({ }: Props) {
    const state = useSelector((state: RootState) => state.cart);

    return (
        <div className={styles.container}>
            <Link href={"/"} passHref>
                <div className={styles.item} style={{ cursor: 'pointer' }}>
                    <div className={styles.callButton}>
                        <Image src="/img/telephone.png" alt="phone image" width="32" height="32"></Image>
                    </div>
                    <div className={styles.texts}>
                        <div className={styles.text}>ORDER NOW!</div>
                        <div className={styles.text}>012 345 678</div>
                    </div>
                </div>
            </Link>
            <div className={styles.item}>
                <ul className={styles.list}>
                    <li className={styles.listItem}>Homepage</li>
                    <li className={styles.listItem}>Products</li>
                    <li className={styles.listItem}>Menu</li>
                    <Image src="/img/logo.png" width="160px" height="69px" alt="logo image"></Image>
                    <li className={styles.listItem}>Events</li>
                    <li className={styles.listItem}>Blog</li>
                    <li className={styles.listItem}>Contact</li>
                </ul>
            </div>
            <div className={styles.item}>
                <Link href={"/cart"} passHref>
                    <div className={styles.cart} style={{ cursor: 'pointer' }}>
                        <Image src="/img/cart.png" alt="cart image" width="30px" height="30px"></Image>
                        <div className={styles.counter}>{state.total}</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}