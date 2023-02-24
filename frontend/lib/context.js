import React, { createContext, useContext, useState } from "react";
const Context = createContext();
export const StateContext = ({ children }) => {
	//state data
	const [qty, setQty] = useState(1);
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	//Increase product quantity
	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1);
	};
	//Decrease product quantity
	const decreaseQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	};

	//add to cart
	const onAdd = (product, quantity) => {
		// increase total price
		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		//Increase total quantity
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
		const alreadyInCart = cartItems.find((i) => i.slug === product.slug);
		if (alreadyInCart) {
			setCartItems(
				cartItems &&
					cartItems.map((i) =>
						i.slug === product.slug
							? {
									...alreadyInCart,
									quantity: alreadyInCart.quantity + quantity,
							  } //! changed 1 to quantity recently
							: i
					)
			);
		} else {
			setCartItems([...cartItems, { ...product, quantity: quantity }]);
		}
	};
	const [q, setQ] = useState(0);

	//remove for cart
	const onRemove = (product) => {
		//Set Total Price
		setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);

		//Remove from total quantities
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);

		//Check if product exists
		const exist = cartItems.find((item) => item.slug === product.slug);
		if (exist.quantity === 1) {
			setCartItems(cartItems.filter((item) => item.slug !== product.slug));
		} else {
			setCartItems(
				cartItems &&
					cartItems.map((item) =>
						item.slug === product.slug
							? { ...exist, quantity: exist.quantity - 1 }
							: item
					)
			);
		}
	};

	return (
		<Context.Provider
			value={{
				qty,
				setQty,
				decreaseQty,
				increaseQty,
				showCart,
				setShowCart,
				cartItems,
				setCartItems,
				onAdd,
				onRemove,
				totalQuantities,
				totalPrice,
				setTotalPrice,
			}}
		>
			{children}
		</Context.Provider>
	);
};
export const useStateContext = () => useContext(Context);
