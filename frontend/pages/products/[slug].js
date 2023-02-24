/* eslint-disable @next/next/no-img-element */
import { useStateContext } from "@/lib/context";
import { GET_PRODUCT_QUERY } from "@/lib/query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "urql";
const ProductDetails = () => {
	// context
	const { increaseQty, decreaseQty, qty, onAdd, setQty } = useStateContext();
	const router = useRouter();
	const { query } = router;
	const [results] = useQuery({
		query: GET_PRODUCT_QUERY,
		variables: { slug: query.slug },
	});
	const { data, fetching, error } = results;

	useEffect(() => {
		setQty(1);
	}, []);

	while (fetching) {
		return <p>Loading...</p>;
	}
	if (error) return <p>Error Message: {error.message}</p>;
	const { title, description, image, price } = data.products.data[0].attributes;

	return (
		<div>
			<div className="relative flex items-center h-[calc(100vh-74px)]   max-h-min overflow-y-hidden p-5 overflow-hidden bg-stone-100 min-w-screen lg:p-16 ">
				<div className="relative w-full max-w-5xl p-10 mx-auto text-gray-800 bg-white rounded shadow-xl lg:p-20 md:text-left">
					<div className=" md:flex">
						<div className="w-full px-10 mb-10 md:w-1/2 md:mb-0">
							<div className="relative">
								<img
									src={image.data[0].attributes.formats.medium.url}
									className="relative z-10 object-contain w-full opacity-100 h-96"
									alt={title}
								/>
								<div className="absolute left-0 right-0 z-0 border-4 border-lime-200 top-10 bottom-10"></div>{" "}
							</div>
						</div>
						<div className="w-full px-10 my-auto mt-20 md:w-1/2">
							<div className="mb-10">
								<h1 className="mb-5 text-2xl font-bold uppercase">{title}</h1>
								<p className="text-sm">{description}</p>
							</div>
							{/* //add counter */}
							<div className="h-7 w-32 mb-3">
								<div className="flex h-7 w-full rounded-full  text-gray-700">
									<button
										onClick={decreaseQty}
										className=" bg-gray-300  hover:bg-gray-400 h-full w-24 rounded-l-full cursor-pointer flex items-center justify-center pl-1 pb-1"
									>
										<div className="text-2xl ">−</div>
									</button>
									<h1 className=" text-center w-full bg-gray-200 font-semibold text-md  md:text-basecursor-default flex items-center  flex justify-center ">
										{qty}
									</h1>
									<button
										onClick={increaseQty}
										className="bg-gray-300  hover:bg-gray-400 h-full w-24 rounded-r-full cursor-pointer pb-1 pr-1 flex items-center justify-center"
									>
										<span className="text-2xl ">+</span>
									</button>
								</div>
							</div>
							{/* //add counter */}

							<div className="flex flex-col md:flex-row justify-between ">
								<div className="inline-block mr-5 align-bottom">
									<span className="text-4xl font-bold leading-none align-baseline">
										₹{price}
									</span>
								</div>
								<div className="inline-block pr-10 align-bottom">
									<button className="button-green">
										<div
											onClick={() => {
												onAdd(data.products.data[0].attributes, qty);
												// notify();
											}}
											className="relative flex-shrink-0 text-sm text-white uppercase "
										>
											Add to Cart
										</div>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
