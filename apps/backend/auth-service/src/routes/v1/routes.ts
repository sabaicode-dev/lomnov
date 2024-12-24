/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthControllerI } from './../../controllers/social.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SocialAuthController } from './../../controllers/social-auth.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthControllerII } from './../../controllers/auth.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "GoogleCallBackRequest": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"string"},
            "state": {"dataType":"string"},
            "error": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "APIResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"undefined"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestSignUpDTO": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "username": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "role": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestVerifyDTO": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "code": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestSignInDTO": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseChangeNewPasswordDTO": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestchangePasswordDTO": {
        "dataType": "refObject",
        "properties": {
            "previousPassword": {"dataType":"string","required":true},
            "proposedPassword": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseInitiatePasswordReset": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestInitiatePasswordResetDTO": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseConfirmPasswordResetDTO": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestConfirmPasswordResetDTO": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "newPassword": {"dataType":"string","required":true},
            "confirmationCode": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRefreshTokenResponseDTO": {
        "dataType": "refObject",
        "properties": {
            "idToken": {"dataType":"string"},
            "accessToken": {"dataType":"string"},
            "message": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IRefreshTokenRequestDTO": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string"},
            "refreshToken": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsAuthControllerI_googleSignIn: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                redirect: {"in":"res","name":"302","required":true,"dataType":"void"},
        };
        app.get('/api/v1/auth/backup/google-sign-in',
            ...(fetchMiddlewares<RequestHandler>(AuthControllerI)),
            ...(fetchMiddlewares<RequestHandler>(AuthControllerI.prototype.googleSignIn)),

            async function AuthControllerI_googleSignIn(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthControllerI_googleSignIn, request, response });

                const controller = new AuthControllerI();

              await templateService.apiHandler({
                methodName: 'googleSignIn',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthControllerI_facebookSignIn: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                redirect: {"in":"res","name":"302","required":true,"dataType":"void"},
        };
        app.get('/api/v1/auth/backup/facebook-sign-in',
            ...(fetchMiddlewares<RequestHandler>(AuthControllerI)),
            ...(fetchMiddlewares<RequestHandler>(AuthControllerI.prototype.facebookSignIn)),

            async function AuthControllerI_facebookSignIn(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthControllerI_facebookSignIn, request, response });

                const controller = new AuthControllerI();

              await templateService.apiHandler({
                methodName: 'facebookSignIn',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthControllerI_callback: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                badRequest: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error_description":{"dataType":"string","required":true},"error":{"dataType":"string","required":true}}},
                redirect: {"in":"res","name":"302","required":true,"dataType":"void"},
        };
        app.get('/api/v1/auth/backup/callback',
            ...(fetchMiddlewares<RequestHandler>(AuthControllerI)),
            ...(fetchMiddlewares<RequestHandler>(AuthControllerI.prototype.callback)),

            async function AuthControllerI_callback(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthControllerI_callback, request, response });

                const controller = new AuthControllerI();

              await templateService.apiHandler({
                methodName: 'callback',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSocialAuthController_loginWithGoogle: Record<string, TsoaRoute.ParameterSchema> = {
                state: {"in":"query","name":"state","dataType":"string"},
        };
        app.get('/api/v1/auth/google-signin',
            ...(fetchMiddlewares<RequestHandler>(SocialAuthController)),
            ...(fetchMiddlewares<RequestHandler>(SocialAuthController.prototype.loginWithGoogle)),

            async function SocialAuthController_loginWithGoogle(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSocialAuthController_loginWithGoogle, request, response });

                const controller = new SocialAuthController();

              await templateService.apiHandler({
                methodName: 'loginWithGoogle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsSocialAuthController_oauthCallBack: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                query: {"in":"queries","name":"query","required":true,"ref":"GoogleCallBackRequest"},
        };
        app.get('/api/v1/auth/callback',
            ...(fetchMiddlewares<RequestHandler>(SocialAuthController)),
            ...(fetchMiddlewares<RequestHandler>(SocialAuthController.prototype.oauthCallBack)),

            async function SocialAuthController_oauthCallBack(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSocialAuthController_oauthCallBack, request, response });

                const controller = new SocialAuthController();

              await templateService.apiHandler({
                methodName: 'oauthCallBack',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthControllerII_signup: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RequestSignUpDTO"},
        };
        app.post('/api/v1/auth/signup',
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII)),
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII.prototype.signup)),

            async function AuthControllerII_signup(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthControllerII_signup, request, response });

                const controller = new AuthControllerII();

              await templateService.apiHandler({
                methodName: 'signup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthControllerII_verify: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RequestVerifyDTO"},
        };
        app.post('/api/v1/auth/verify',
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII)),
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII.prototype.verify)),

            async function AuthControllerII_verify(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthControllerII_verify, request, response });

                const controller = new AuthControllerII();

              await templateService.apiHandler({
                methodName: 'verify',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthControllerII_signIn: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RequestSignInDTO"},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.post('/api/v1/auth/signin',
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII)),
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII.prototype.signIn)),

            async function AuthControllerII_signIn(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthControllerII_signIn, request, response });

                const controller = new AuthControllerII();

              await templateService.apiHandler({
                methodName: 'signIn',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthControllerII_logout: Record<string, TsoaRoute.ParameterSchema> = {
                reqeust: {"in":"request","name":"reqeust","required":true,"dataType":"object"},
        };
        app.post('/api/v1/auth/logout',
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII)),
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII.prototype.logout)),

            async function AuthControllerII_logout(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthControllerII_logout, request, response });

                const controller = new AuthControllerII();

              await templateService.apiHandler({
                methodName: 'logout',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthControllerII_changeNewPassword: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RequestchangePasswordDTO"},
        };
        app.post('/api/v1/auth/change-password',
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII)),
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII.prototype.changeNewPassword)),

            async function AuthControllerII_changeNewPassword(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthControllerII_changeNewPassword, request, response });

                const controller = new AuthControllerII();

              await templateService.apiHandler({
                methodName: 'changeNewPassword',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthControllerII_initiatePasswordReset: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RequestInitiatePasswordResetDTO"},
        };
        app.post('/api/v1/auth/reset-password',
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII)),
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII.prototype.initiatePasswordReset)),

            async function AuthControllerII_initiatePasswordReset(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthControllerII_initiatePasswordReset, request, response });

                const controller = new AuthControllerII();

              await templateService.apiHandler({
                methodName: 'initiatePasswordReset',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthControllerII_confirmPasswordReset: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RequestConfirmPasswordResetDTO"},
        };
        app.post('/api/v1/auth/confirm-password',
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII)),
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII.prototype.confirmPasswordReset)),

            async function AuthControllerII_confirmPasswordReset(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthControllerII_confirmPasswordReset, request, response });

                const controller = new AuthControllerII();

              await templateService.apiHandler({
                methodName: 'confirmPasswordReset',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthControllerII_refreshToken: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                body: {"in":"body","name":"body","required":true,"ref":"IRefreshTokenRequestDTO"},
        };
        app.post('/api/v1/auth/refresh-token',
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII)),
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII.prototype.refreshToken)),

            async function AuthControllerII_refreshToken(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthControllerII_refreshToken, request, response });

                const controller = new AuthControllerII();

              await templateService.apiHandler({
                methodName: 'refreshToken',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthControllerII_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
                cognitoSub: {"in":"path","name":"cognitoSub","required":true,"dataType":"string"},
        };
        app.delete('/api/v1/auth/:cognitoSub',
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII)),
            ...(fetchMiddlewares<RequestHandler>(AuthControllerII.prototype.deleteUser)),

            async function AuthControllerII_deleteUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthControllerII_deleteUser, request, response });

                const controller = new AuthControllerII();

              await templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
