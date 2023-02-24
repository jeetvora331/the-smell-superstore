import Link from "next/link";
const Product = ({ product }) => {
	const imgThumbUrl =
		product.attributes.image.data[0].attributes.formats.thumbnail.url;
	const slug = product.attributes.slug;
	return (
		<Link href={`/products/${slug}`}>
			<div className="flex flex-col border border-gray-200 rounded-lg shadow bg-stone-100 min-h-fit ">
				<div className="">
					<a className="flex justify-center m-3 bg-white rounded-lg shadow-md">
						<img className="p-4 rounded-t-lg" src={imgThumbUrl} alt="" />
					</a>
				</div>
				<div className="px-5 ">
					<div>
						<h2 className="text-2xl font-semibold tracking-tight text-gray-900">
							{product.attributes.title}
						</h2>
						<h2>{product.attributes.description}</h2>
					</div>
				</div>

				<div className="flex flex-wrap items-center justify-between  mt-auto pt-2 px-5 pb-5">
					<span className="text-2xl font-bold text-gray-900 dark:text-white">
						<h3>₹{product.attributes.price}</h3>
					</span>
					<button
						className="button-green
					"
					>
						<div className="relative uppercase text-sm text-white">Buy Now</div>
					</button>
				</div>
			</div>
		</Link>
	);
};

export default Product;
