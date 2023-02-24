import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Product from "@/components/Product";
import { PRODUCT_QUERY } from "@/lib/query";
import styles from "@/styles/Home.module.css";
import { Inter } from "@next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useQuery } from "urql";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	//Fetching from Strapi
	const [results] = useQuery({
		query: PRODUCT_QUERY,
	});
	const { data, fetching, error } = results;
	while (fetching) {
		return <p>Loading...</p>;
	}
	const products = data.products.data;
	return (
		<>
			<div>
				<Head>
					<title>The Smell</title>
					<meta name="description" content="Online perfume store" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					{/* <link rel="icon" href="/favicon.ico" /> */}
					{/* <link rel="shortcut icon" href="/favicon.ico" /> */}
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
				</Head>
			</div>
			<div>
				<Hero />
				{/* <Link href={"/about"}>About</Link> */}
				<div className="grid grid-cols-1 gap-4 p-5 mx-auto md:grid-cols-3 lg:grid-cols-4 max-w-max">
					{products.map((product) => (
						<Product key={product.attributes.slug} product={product} />
					))}
				</div>
				<img src="" alt="" />
			</div>
		</>
	);
}
