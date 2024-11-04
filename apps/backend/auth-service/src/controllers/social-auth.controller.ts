import { Controller, Get, Query, Request, Route } from "tsoa";
import SocialAuthService from "../services/social-auth.service";
import sendResponse from "../utils/sendResponse";
import { Response } from "express";
import setCookie from "../middlewares/cookies";

@Route("/api/v1/auth")
export class SocialAuthController extends Controller{
    private socialAuthService: SocialAuthService;
    constructor(){
        super();
        this.socialAuthService = new SocialAuthService();
    }
    @Get("/google-signin")
    public loginWithGoogle (@Query() _state: string){
        const cognitOAuthURL = this.socialAuthService.loginWithGoogle();
        return sendResponse({message: 'Login With Google Successfully!',data: cognitOAuthURL})
    }
    @Get("/getcallback")
    public async handleCallBack(@Request() request: Express.Request,@Query() code: string,@Query() state: string){
        try {
            const response = (request as any).res as Response
            const tokens = await this.socialAuthService.handleCallBack(code,state);
            setCookie(response,'idToken',tokens.id_token);
            setCookie(response, 'accessToken', tokens.access_token);
            setCookie(response, 'refreshToken', tokens.refresh_token, { maxAge: 30 * 24 * 3600 * 1000 });
            setCookie(response, 'username', tokens.username!, { maxAge: 30 * 24 * 3600 * 1000 });
            setCookie(response, 'user_id', tokens.userId!, { maxAge: 30 * 24 * 3600 * 1000 });
            return sendResponse({
                message: 'Authentication successful',
                data: tokens,
            });
        } catch (error) {
            console.error(error);
            return sendResponse({
                message: 'Authentication failed'
            });
        }
    }
}