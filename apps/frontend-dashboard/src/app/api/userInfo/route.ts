import axiosInstance from "@/libs/axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
            headers: {
                Cookie: req.headers.get("cookie") || "",
            }
        });
        // If response is 204 No Content, return an empty object
        if (response.status === 204) {
            return NextResponse.json({}, { status: 200 });
        }

        // If the response is not successful, return an error response
        if (response.status >= 400) {
            console.log(response);
            return NextResponse.json({
                message: "Failed to fetch user info",
            }, { status: response.status });
        }

        // Return the user data
        return NextResponse.json(response.data, { status: 200 });

    } catch (error: unknown) {
        console.error(error);

        return NextResponse.json(
            { message: "Error fetching user info", error: error || "Unknown error" },
            { status: 500 }
        );
    }
}
