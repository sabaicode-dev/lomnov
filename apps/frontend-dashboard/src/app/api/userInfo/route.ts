import { NextResponse } from "next/server";
export async function GET(req: Request) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
            method: "GET",
            credentials: "include",
            headers: {
                Cookie: req.headers.get("cookie") || "",
            }
        });
        if (!response.ok) {
            console.log(response)
            return NextResponse.json({
                message: "Failed to fetch user info"
            }, { status: response.status }
            );
        }
        console.log(response);
        // If the response is 204 No Content, return an empty object
        if (response.status === 204) {
            return NextResponse.json({}, { status: 200 });
        }
        const data = await response.json();
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Error fetching user info", error: error },
            { status: 500 }
        );
    }
}