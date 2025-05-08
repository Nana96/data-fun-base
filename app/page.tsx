/* eslint-disable @next/next/no-img-element */
"use client";

import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { pages } from "../data/detail_pages";

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
       {pages.map((page) => (
               <div key={page.slug}>
                 <Link href={`/detail/${page.slug}`}>{page.title}</Link>
               </div>
             ))}
      </main>
    </>
  );
}
