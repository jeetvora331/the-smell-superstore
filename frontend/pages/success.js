import Link from "next/link";
import { useRouter } from "next/router";
import { BsCheck2Circle } from "react-icons/bs";
import Stripe from "stripe";
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export async function getServerSideProps(params) {
	const order = await stripe.checkout.sessions.retrieve(
		params.query.session_id,
		{
			expand: ["line_items"],
		}
	);

	return { props: { order } };
}

const success = ({ order }) => {
	return (
		<div>
			<div className="h-screen bg-gray-100">
				<div className=" flex flex-col  bg-white p-6 md:mx-auto my-10 ">
					<div className="text-center text-xl">
						<BsCheck2Circle className=" justify-center text-8xl mx-auto text-lime-400" />
						<h3 className="text-center text-3xl  font-semibold text-gray-900 ">
							Done!
						</h3>
						<p className="my-2 text-gray-600 text-2xl">
							Thank you for your order!
						</p>
						<p>A confirmation email has been sent to</p>
						<h2>{order.customer_details.email}</h2>
						<p className="mt-4">Have a great day!</p>
						<Link href={"/"}>
							<div className="py-10 text-center">
								<button className="bg-lime-600 px-12 py-3 font-semibold text-white hover:bg-lime-500 rounded-lg">
									Continue Shopping
								</button>
							</div>
						</Link>
					</div>
				</div>
			</div>

			<div>
				<h1>Thank you for your order!</h1>
				<h2>A confirmation email has been sent to</h2>
				<h2>{order.customer_details.email}</h2>
				<div>
					<h3>Address</h3>
					<h3>address info</h3>
				</div>
				<div>
					<h3>product</h3>
					<h3>all product</h3>
				</div>
				<Link href={"/"}>
					<button>Continue Shopping</button>
				</Link>
			</div>
		</div>
	);
};

export default success;
