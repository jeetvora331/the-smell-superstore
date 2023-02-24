import CartItem from "./CartItem";
//Import State
import { useStateContext } from "../lib/context";
//   import getStripe from "../lib/getStripe";
import { IoCloseSharp } from "react-icons/io5";
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
			body: JSON.stringify(cartItems),
		});
		const data = await response.json();
		await stripePromise.redirectToCheckout({ sessionId: data.id });
	};

	if (!showCart) return null;
	return (
		<div>
			<div
				className="relative z-20"
				aria-labelledby="slide-over-title"
				role="dialog"
				aria-modal="true"
			>
				{/* <!--
    Background backdrop, show/hide based on slide-over state.

    Entering: "ease-in-out duration-500"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in-out duration-500"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className=" fixed inset-y-0 right-0 flex max-w-full pl-10 ">
							{/* <!--
          Slide-over panel, show/hide based on slide-over state.

          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        --> */}
							<div className="pointer-events-auto w-screen max-w-md ">
								<div
									id="#white-area"
									className="flex h-full flex-col overflow-y-scroll bg-white shadow-3xl relative z-10"
								>
									<div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
										<div className="flex items-start justify-between">
											<h2
												className="text-lg font-medium text-gray-900"
												id="slide-over-title"
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
													{/* //! CartITems */}
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
										<div className="flex justify-between text-base font-medium text-gray-900">
											<p>Subtotal</p>
											<p>$262.00</p>
										</div>
										<p className="mt-0.5 text-sm text-gray-500">
											Shipping and taxes calculated at checkout.
										</p>
										<div className="mt-6">
											<a
												href="#"
												className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
											>
												Checkout
											</a>
										</div>
										<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
											<p>
												or{"  "}
												<button
													type="button"
													className="font-medium text-indigo-600 hover:text-indigo-500"
												>
													Continue Shopping
													<span aria-hidden="true"> &rarr;</span>
												</button>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
