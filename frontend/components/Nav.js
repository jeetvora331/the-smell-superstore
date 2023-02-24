import { useStateContext } from "@/lib/context";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import User from "./User";

const Nav = () => {
	const { showCart, setShowCart, totalQuantities } = useStateContext();

	return (
		<div>
			<nav className="inset-x-0 top-0 z-30 mt-0 lg:max-w-7xl lg:mx-auto border-b border-lime-400 bg-white py-0 shadow-lg  mx-auto">
				<div className="mt-0 flex w-full items-center justify-between px-6 py-2">
					<div className="">
						<nav>
							<ul className="flex items-center justify-between px-2 text-base text-gray-600 items-center">
								<Link href="/">
									<p className="inline-block py-2  text-2xl font-medium no-underline  hover:text-black">
										THE SMELL
									</p>
								</Link>
							</ul>
						</nav>
					</div>

					<div className="mr-0 flex flex-wrap items-center justify-end">
						<div className="flex w-full items-center">
							<button
								onClick={() => setShowCart(true)}
								className="transition  gap-3 items-center mr-4 rounded border border-gray-300 bg-transparent px-2 py-1 text-gray-800 hover:bg-gray-100 hover:text-lime-700 flex"
							>
								<FiShoppingCart className="text-lg" />
								<p className="text-lg font-medium">Cart</p>
								<p>{totalQuantities}</p>
							</button>
							<User className="cursor-pointer" />
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Nav;
