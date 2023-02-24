import CartItem from "./CartItem";
//Import State
// import getStripe from "@/lib/getStripe";
import { isEnumType } from "graphql";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import { useStateContext } from "../lib/context";
import getStripe from "../lib/getStripe";
const { motion } = require("framer-motion");

//function starts here
export default function Cart() {
	const { cartItems, setShowCart, onAdd, onRemove, totalPrice, showCart } =
		useStateContext();

	//Payment
	const handleCheckout = async () => {
		const stripePromise = await getStripe();
		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cartItems), //sending cart items to stripe
		});
		const data = await response.json();
		console.log("data.id :>> ", data.id);
		await stripePromise.redirectToCheckout({ sessionId: data.id });
	};

	if (!showCart) return null;
	return (
		<motion.div>
			<div className="relative z-20" role="dialog" aria-modal="true">
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

				<div
					className="fixed inset-0 overflow-hidden 
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}"
				>
					<div
						className="absolute inset-0 overflow-hidden "
						id="black-area"
						onClick={() => setShowCart(false)}
					>
						<div
							className=" fixed inset-y-0 right-0 flex max-w-full pl-10"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="pointer-events-auto w-screen max-w-md ">
								<motion.div
									id="white-area"
									className="flex h-full flex-col overflow-y-scroll bg-white shadow-3xl relative z-10"
									initial={{ x: "50%" }}
									animate={{ x: 0 }}
									exit={{ x: "50%" }}
								>
									<div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
										<div className="flex items-start justify-between">
											<h2
												className="text-lg font-medium text-gray-900"
												// id="slide-over-title"
											>
												Shopping cart
											</h2>
											<button
												className="my-auto"
												onClick={() => setShowCart(false)}
											>
												{/* close button here */}
												<IoCloseSharp />
											</button>
										</div>

										<div className="mt-8 ">
											<div className="flow-root ">
												<ul
													role="list"
													className="-my-6 divide-y divide-gray-200"
												>
													{cartItems.length < 1 && (
														<motion.div
															initial={{ opacity: 0, y: "50%" }}
															animate={{ opacity: 1, y: "0%" }}
															transition={{ delay: 0.2 }}
															className="h-48 my-6 bg-slate-50 grid place-items-center  rounded-lg"
														>
															<div className="mx-auto">
																<h1 className="text-xl">
																	Your cart is empty!{" "}
																</h1>

																<h1>Let&aposs shop some fragrances</h1>
															</div>
														</motion.div>
													)}
													{cartItems &&
														cartItems.map((item) => (
															<CartItem key={item.slug} item={item} />
														))}
												</ul>
											</div>
										</div>
									</div>
									{/* BOTTOM PART */}
									<div className="border-t border-gray-200 py-6 px-4 sm:px-6 ">
										<div className="flex justify-between font-medium text-xl text-gray-900">
											<p>Subtotal</p>
											<p>₹{totalPrice}</p>
										</div>
										<p className="mt-0.5 text-sm text-gray-500">
											Shipping and taxes calculated at checkout.
										</p>
										<div className="mt-6">
											<button
												className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
												onClick={handleCheckout}
											>
												Checkout
											</button>
										</div>
										<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
											<p>
												or{"  "}
												<Link href={"/"}>
													<button
														onClick={() => setShowCart(false)}
														type="button"
														className="font-medium text-indigo-600 hover:text-indigo-500"
													>
														Continue Shopping
														<span aria-hidden="true"> &rarr;</span>
													</button>
												</Link>
											</p>
										</div>
									</div>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
