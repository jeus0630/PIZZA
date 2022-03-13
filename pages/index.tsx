import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Featrued from '../components/Featrued'
import PizzaList from '../components/PizzaList'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best Pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featrued></Featrued>
      <PizzaList></PizzaList>
    </div>
  )
}

export default Home