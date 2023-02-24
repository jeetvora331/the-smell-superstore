import Image from "next/image";
import React from "react";
import sale_banner from "../public/sale_banner.png";

const Hero = () => {
	return (
		<div className="max-w-7xl mx-auto">
			<Image src={sale_banner}></Image>
		</div>
	);
};

export default Hero;
