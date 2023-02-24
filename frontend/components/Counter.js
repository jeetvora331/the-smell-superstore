import { useStateContext } from "@/lib/context";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const Counter = ({ item }) => {
	const { cartItems, onAdd, onRemove } = useStateContext();

	return (
		<div className="flex flex-row w-20 justify-between items-center text-lg text-gray-700">
			<AiFillMinusCircle className="text-2xl" onClick={() => onRemove(item)} />
			{item.quantity}
			<AiFillPlusCircle className="text-2xl" onClick={() => onAdd(item, 1)} />
		</div>
	);
};

export default Counter;