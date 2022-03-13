import styles from "../styles/Featured.module.scss"
import Image from 'next/image'
import { useState } from 'react'

type Props = {}

export default function Featrued({ }: Props) {

    const [index, setIndex] = useState(0);

    const handleArrow = (direction: "l" | "r") => {
        if (direction === "l") {
            setIndex(prev => prev !== 0 ? prev - 1 : 2)
        }
        if (direction === "r") {
            setIndex(prev => prev !== 2 ? prev + 1 : 0)
        }
    }

    const images = [
        "/img/feature.jpg",
        "/img/feature2.jpg",
        "/img/feature3.jpg",
    ]

    return (
        <div className={styles.container}>
            <div className={styles.arrowContainer} style={{ left: 0 }} onClick={() => handleArrow("l")}>
                <Image src="/img/arrowl.png" alt="" layout="fill" objectFit="contain" />
            </div>
            <div className={styles.wrapper} style={{ transform: `translateX(${-100 * index}vw)` }}>
                {
                    images.map((image, idx) => (
                        <div className={styles.imgContainer} key={idx}>
                            <Image src={image} alt="" layout="fill" objectFit="cover"></Image>
                        </div>
                    ))
                }
            </div>
            <div className={styles.arrowContainer} style={{ right: 0 }} onClick={() => handleArrow("r")}>
                <Image src="/img/arrowr.png" alt="" layout="fill" objectFit="contain" />
            </div>
        </div>
    )
}