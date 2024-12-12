import { NextResponse, NextRequest } from "next/server"
import { authHelpers } from "./libs/helper/middlewareHelpers"
export async function middleware(request: NextRequest) {
    console.log("middleware.ts: Request URL", request.url);
    const { pathname } = request.nextUrl;
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
    const access_token = allCookies.split("; ").find((cookie) => cookie.startsWith("accessToken="))?.split("=")[1];
    const refresh_token = allCookies.split("; ").find((cookie) => cookie.startsWith("refreshToken="))?.split("=")[1];
    if (!access_token && refresh_token) {
        const refreshResult = await authHelpers.refreshAccessToken(refresh_token);
        if (refreshResult) {
            return refreshResult.response;
        } else { return authHelpers.clearAuthAndRedirect(request, "/signIn") };
    }
    let userInfoResponse, userInfo;
    if (access_token) {
        userInfoResponse = await fetch(new URL("/api/userInfo", request.url), {
            method: "GET",
            headers: {
                Cookie: allCookies || "",
            },
        });
        console.log(userInfoResponse.ok);
        
        if (!userInfoResponse.ok) {
            console.error("Error response:", await userInfoResponse.text());
            return authHelpers.clearAuthAndRedirect(request, "/signIn", access_token);
        }
        userInfo = await userInfoResponse.json();
        console.log(userInfo);
        
    }
    if (pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (pathname === "/signIn" && access_token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (pathname.startsWith("/dashboard") && !access_token) {
        return NextResponse.redirect(new URL("/signIn", request.url));
    }
    if (pathname.startsWith("/dashboard")) {
        const role = userInfo.role;
        if (role !== "admin") {
            return await authHelpers.clearAuthAndRedirect(request, "/signIn", access_token);
        } else {
            console.log("middleware.ts: User is authorized for the dashboard");
            return NextResponse.next();
        }
    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/dashboard/:path*", "/signin", "/"],
};