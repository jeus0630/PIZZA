import Image from "next/image";
import Link from "next/link";
import styles from "../styles/PizzaCard.module.scss";

type Props = {
  pizza: {
    _id: string,
    title: string,
    desc: string,
    img: string,
    prices: number[],
    extraOptions: { text: string, price: number }[]
  }
}

export default function PizzaCard({ pizza }: Props) {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`}>
        <div>
          <Image src={pizza.img} alt="" width="500" height={500}></Image>
          <h1 className={styles.title}>{pizza.title}</h1>
          <span className={styles.price}>${pizza.prices[0]}</span>
          <p className={styles.desc}>
            {pizza.desc}
          </p>
        </div>
      </Link>

    </div>
  )
}