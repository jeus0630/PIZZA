import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Featrued from '../components/Featrued'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best Pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Featrued></Featrued>

    </div>
  )
}

export default Home
