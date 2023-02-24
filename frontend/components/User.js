import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";

const User = () => {
	const route = useRouter();
	const { user } = useUser();
	if (!user)
		return (
			<div>
				<div className="has-tooltip">
					<span className="tooltip rounded shadow-lg p-2 bg-gray-800 text-white my-8">
						Login
					</span>
					<Link href={"/api/auth/login"}>
						<FaUserCircle className=" h-8 w-8 text-gray-600 " />
					</Link>
				</div>
			</div>
		);
	return (
		<div>
			<div className="has-tooltip">
				<span className="tooltip rounded shadow-lg p-2 bg-red-500 text-white my-8">
					LOGOUT
				</span>
				<Link href={"/api/auth/logout"}>
					<div className="cursor-pointer">
						<img
							src={user.picture}
							alt={user.name}
							className="rounded-full h-10"
						/>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default User;
