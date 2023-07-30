import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
	const expiresIn = 60 * 60 * 24 * 5 * 1000;

	const options = {
		name: "token",
		value: "login",
		maxAge: expiresIn,
	};
	cookies().set(options);

	return NextResponse.json({}, { status: 200 });
}

export async function GET(request: NextRequest) {
	const session = cookies().get("token")?.value || "";

	//Validate if the cookie exist in the request
	if (!session) {
		return NextResponse.json({ isLogged: false }, { status: 401 });
	}

	return NextResponse.json({ isLogged: true }, { status: 200 });
}
