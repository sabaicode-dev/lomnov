import { Controller, Get, Queries, Query, Request, Route, Tags } from "tsoa";
import SocialAuthService from "../services/social-auth.service";
import sendResponse from "../utils/sendResponse";
import {Response } from "express";
import setCookie from "../middlewares/cookies";
import { GoogleCallBackRequest } from "./types/social-auth.type";
import configs from "../config";
@Tags("Login With Google")
@Route("api/v1/auth")
export class SocialAuthController extends Controller{
    private socialAuthService: SocialAuthService;
    constructor(){
        super();
        this.socialAuthService = new SocialAuthService();
    }
    @Get("/google-signin")
    public loginWithGoogle (@Query() state?: string){
        const cognitOAuthURL = this.socialAuthService.loginWithGoogle(state);
        return sendResponse({message: 'Login With Google Successfully!',data: cognitOAuthURL})
    }
    @Get("/callback")
    public async oauthCallBack(@Request() request: Express.Request,@Queries() query: GoogleCallBackRequest){
        try {
            const response = (request as any).res as Response
            const tokens = await this.socialAuthService.getOAuthToken(query);
            console.log(tokens);
            setCookie(response,'idToken',tokens.idToken);
            setCookie(response, 'accessToken', tokens.accessToken);
            setCookie(response, 'refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 3600 * 1000 });
            setCookie(response, 'username', tokens.username!, { maxAge: 30 * 24 * 3600 * 1000 });
            setCookie(response, 'user_id', tokens.userId!, { maxAge: 30 * 24 * 3600 * 1000 });
            response.redirect(configs.clientUrl);
        } catch (error) {
           throw error;
        }
    }
}