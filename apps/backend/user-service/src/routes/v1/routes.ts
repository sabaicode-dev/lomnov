/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductController } from './../../controllers/user.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';
const multer = require('multer');




// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "mongoose.Types.ObjectId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FavoriteItem": {
        "dataType": "refObject",
        "properties": {
            "propertyId": {"dataType":"union","subSchemas":[{"ref":"mongoose.Types.ObjectId"},{"dataType":"undefined"}],"required":true},
            "addedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"undefined"}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseUserDTO": {
        "dataType": "refObject",
        "properties": {
            "_id": {"ref":"mongoose.Types.ObjectId","required":true},
            "cognitoSub": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "userName": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string"},
            "location": {"dataType":"string"},
            "address": {"dataType":"string"},
            "age": {"dataType":"double"},
            "gender": {"dataType":"string"},
            "dateOfBirth": {"dataType":"string"},
            "profile": {"dataType":"array","array":{"dataType":"string"}},
            "background": {"dataType":"array","array":{"dataType":"string"}},
            "favorite": {"dataType":"array","array":{"dataType":"refObject","ref":"FavoriteItem"}},
            "role": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestUserDTO": {
        "dataType": "refObject",
        "properties": {
            "cognitoSub": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "firstName": {"dataType":"string"},
            "lastName": {"dataType":"string"},
            "userName": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string"},
            "location": {"dataType":"string"},
            "address": {"dataType":"string"},
            "age": {"dataType":"double"},
            "gender": {"dataType":"string"},
            "dateOfBirth": {"dataType":"string"},
            "profile": {"dataType":"array","array":{"dataType":"string"}},
            "background": {"dataType":"array","array":{"dataType":"string"}},
            "favorite": {"dataType":"array","array":{"dataType":"string"}},
            "role": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginationDTO": {
        "dataType": "refObject",
        "properties": {
            "currentPage": {"dataType":"double","required":true},
            "totalPages": {"dataType":"double","required":true},
            "totalUsers": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseAllUserDTO": {
        "dataType": "refObject",
        "properties": {
            "users": {"dataType":"array","array":{"dataType":"refObject","ref":"ResponseUserDTO"},"required":true},
            "pagination": {"ref":"PaginationDTO","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseUsernameExist": {
        "dataType": "refObject",
        "properties": {
            "usernameExist": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteProfileImageResponseDTO": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FavoriteResponseDTO": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "user": {"dataType":"union","subSchemas":[{"ref":"ResponseUserDTO"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router,opts?:{multer?:ReturnType<typeof multer>}) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################

    const upload = opts?.multer ||  multer({"limits":{"fileSize":8388608}});

    
        app.post('/api/v1/users',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.register)),

            async function ProductController_register(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RequestUserDTO"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'register',
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
        app.get('/api/v1/users',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.getAllUser)),

            async function ProductController_getAllUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    page: {"default":1,"in":"query","name":"page","dataType":"double"},
                    limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                    firstName: {"in":"query","name":"firstName","dataType":"string"},
                    lastName: {"in":"query","name":"lastName","dataType":"string"},
                    userName: {"in":"query","name":"userName","dataType":"string"},
                    role: {"in":"query","name":"role","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'getAllUser',
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
        app.get('/api/v1/users/username/:username',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.findUsernameExite)),

            async function ProductController_findUsernameExite(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    username: {"in":"path","name":"username","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'findUsernameExite',
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
        app.get('/api/v1/users/me',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.getMe)),

            async function ProductController_getMe(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'getMe',
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
        app.put('/api/v1/users/me',
            upload.fields([
                {
                    name: "profileFiles",
                },
                {
                    name: "backgroundFiles",
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.updateMe)),

            async function ProductController_updateMe(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    profileFiles: {"in":"formData","name":"profileFiles","dataType":"array","array":{"dataType":"file"}},
                    backgroundFiles: {"in":"formData","name":"backgroundFiles","dataType":"array","array":{"dataType":"file"}},
                    firstName: {"in":"formData","name":"firstName","dataType":"string"},
                    lastName: {"in":"formData","name":"lastName","dataType":"string"},
                    userName: {"in":"formData","name":"userName","dataType":"string"},
                    phoneNumber: {"in":"formData","name":"phoneNumber","dataType":"string"},
                    address: {"in":"formData","name":"address","dataType":"string"},
                    gender: {"in":"formData","name":"gender","dataType":"string"},
                    dateOfBirth: {"in":"formData","name":"dateOfBirth","dataType":"string"},
                    location: {"in":"formData","name":"location","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'updateMe',
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
        app.delete('/api/v1/users/my-profile/:profileId',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.deleteMyProfile)),

            async function ProductController_deleteMyProfile(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    profileId: {"in":"path","name":"profileId","required":true,"dataType":"double"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'deleteMyProfile',
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
        app.delete('/api/v1/users/my-background/:backgroundId',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.deleteMyBackground)),

            async function ProductController_deleteMyBackground(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    backgroundId: {"in":"path","name":"backgroundId","required":true,"dataType":"double"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'deleteMyBackground',
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
        app.put('/api/v1/users/favorite/:propertyId',
            ...(fetchMiddlewares<RequestHandler>(ProductController)),
            ...(fetchMiddlewares<RequestHandler>(ProductController.prototype.toggleFavorite)),

            async function ProductController_toggleFavorite(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    propertyId: {"in":"path","name":"propertyId","required":true,"ref":"mongoose.Types.ObjectId"},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ProductController();

              await templateService.apiHandler({
                methodName: 'toggleFavorite',
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
