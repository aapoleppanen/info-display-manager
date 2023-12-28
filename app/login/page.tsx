import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";

import Link from "next/link";
import Form from "../_components/form";

const Page = async () => {
	const session = await getPageSession();
	if (session) redirect("/");
	return (
		<>
			<h1>Sign in</h1>
			<Form action="/api/login">
				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<input type="submit" />
			</Form>
		</>
	);
};

export default Page;
