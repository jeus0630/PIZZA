import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Featrued from '../components/Featrued'
import PizzaList from '../components/PizzaList'
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'
import Product from '../models/Product'
import dbConnect from '../util/mongo'

type Data = {
  _id: string,
  title: string,
  desc: string,
  img: string,
  prices: number[],
  extraOptions: { text: string, price: number }[]
}[]

const Home: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(data);

  return (
    <div>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best Pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featrued></Featrued>
      <PizzaList pizzaList={data}></PizzaList>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    
    await dbConnect();
    const data = JSON.parse(JSON.stringify(await Product.find({})));

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

export default Home