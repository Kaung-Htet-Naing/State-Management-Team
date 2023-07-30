"use client";
import { UserContext } from "@/ContextProvider/ContextProvider";
import { UserContextType } from "@/types/UserContextType";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";

export default function Home() {
	const { setUserName } = useContext<UserContextType>(UserContext);
	const [value, setValue] = useState<string>("");
	const [error, setError] = useState<string>("");

	const router = useRouter();

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (value.length >= 0) {
			setUserName(value);
			fetch("http://localhost:3000/api/login", {
				method: "POST",
			})
				.then(() => {
					sessionStorage.setItem("username", value);
					router.push("/");
				})
				.catch((error) => console.log(error));
		}
		if (value.length <= 0) setError("Type Something");
	};

	return (
		<div className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12">
			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				<div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-blue-300 to-blue-600 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
				<div className="relative px-4 py-10 bg-white w-[500px]  shadow-lg sm:rounded-3xl sm:p-20">
					<div className="max-w-md mx-auto ">
						<div>
							<h1 className="text-2xl font-semibold">Login Form</h1>
						</div>
						<div className="divide-y divide-gray-200">
							<div className="pt-2 space-y-2 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
								<label
									htmlFor="username"
									className="block text-sm font-medium leading-6 text-gray-600"
								>
									Username <span className="text-red-400">*</span>
								</label>
								<input
									value={value}
									onChange={(e) => setValue(e.target.value)}
									className="block w-full px-3 py-3 placeholder-gray-400 rounded-md shadow-sm appearance-none bg-secondary-gray sm:text-sm"
									id="username"
									type="text"
									placeholder="username"
								/>
								{error.length > 0 && (
									<p className="m-1 text-sm text-red-900">{error}</p>
								)}
								<div className="relative w-full pt-3 text-center">
									<button
										type="submit"
										className="w-full px-4 py-1 text-sm text-white bg-blue-500 rounded-md cursor-pointer"
										onClick={handleSubmit}
									>
										Login
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
