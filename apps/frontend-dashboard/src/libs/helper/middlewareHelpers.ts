import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "../axios";

export const authHelpers = {
    refreshAccessToken: async (refresh_token: string) => {
        try {
            const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh-token`, {}, {
                headers: {
                    "Authorization": `Bearer ${refresh_token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status !== 200) {
                throw new Error('Token refresh failed');
            }

            const data = response.data;  // Axios automatically parses JSON
            const nextRes = NextResponse.next();

            nextRes.cookies.set("accessToken", data.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });

            nextRes.cookies.set("idToken", data.id_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });

            return { newTokens: data, response: nextRes };

        } catch (error) {
            console.error("Failed to refresh tokens:", error);
            return null;
        }
    },
    clearAuthAndRedirect: async (
        req: NextRequest,
        redirectUrl: string,
        access_token?: string
    ) => {
        try {
            if (access_token) {
                await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/logout`, {}, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    }
                });
            }
        } catch (error) {
            console.error("Failed to sign out:", error);
        }

        const response = NextResponse.redirect(new URL(redirectUrl, req.url));

        // Clear only the authentication-related cookies
        response.cookies.set("accessToken", "", { expires: new Date(0), path: "/" });
        response.cookies.set("idToken", "", { expires: new Date(0), path: "/" });

        return response;
    }
}