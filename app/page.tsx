/* eslint-disable @next/next/no-img-element */
"use client";

import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>DataFunBase</title>
        <meta name="description" content="DataViz Functionality Database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>DataFunBase</h1>
        <a href={"/organic_shapes_d3"}>Creating organic shapes with d3.js</a>
      </main>
    </>
  );
}
