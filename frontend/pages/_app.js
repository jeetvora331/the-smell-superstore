import Cart from "@/components/Cart";
import Nav from "@/components/Nav";
import { StateContext, useStateContext } from "@/lib/context";
import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { createClient, Provider } from "urql";

const client = createClient({
	url: process.env.NEXT_PUBLIC_BACKEND_API,
});

export default function App({ Component, pageProps }) {
	return (
		<div className="">
			<UserProvider>
				<StateContext>
					<Provider value={client}>
						<Nav />
						<Cart />

						<Component {...pageProps} />
					</Provider>
				</StateContext>
			</UserProvider>
		</div>
	);
}
