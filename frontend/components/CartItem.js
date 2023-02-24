import React from "react";
import { useStateContext } from "../lib/context";
import Counter from "./Counter";

const CartItem = ({ item }) => {
	const { cartItems, onAdd, onRemove } = useStateContext();

	return (
		<div>
			<li className="flex py-6 ">
				<div className="h-24 w-24 overflow-hidden rounded-md border border-gray-200 ">
					<img
						src={item.image.data[0].attributes.formats.thumbnail.url}
						className="object-contain h-24 w-24"
					/>
				</div>

				<div className="ml-4 flex flex-1 flex-col ">
					<div>
						<div className="flex justify-between text-xl font-medium text-gray-900  ">
							<h3>{item.title}</h3>
							<p className="flex-shrink-0 flex-nowrap">₹ {item.price}</p>
						</div>
					</div>
					<div className="flex flex-1 items-end justify-between text-sm pb-2">
						{/* <p className="text-gray-500">Qty: {item.quantity}</p> */}
						<Counter item={item} />

						{/* <div className="flex">
							<button
								type="button"
								className="font-medium text-indigo-600 hover:underline"
							>
								Remove
							</button>
						</div> */}
					</div>
				</div>
			</li>
		</div>
	);
};

export default CartItem;
