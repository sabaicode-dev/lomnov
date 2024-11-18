/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PropertyController } from './../../controllers/property.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';
const multer = require('multer');




// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "mongoose.Types.ObjectId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LocalizedContent": {
        "dataType": "refObject",
        "properties": {
            "content": {"dataType":"string","required":true},
            "language": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.any_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseCreatePropertyDTO": {
        "dataType": "refObject",
        "properties": {
            "_id": {"ref":"mongoose.Types.ObjectId","required":true},
            "cognitoSub": {"dataType":"string","required":true},
            "title": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"}},
            "description": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"}},
            "thumbnail": {"dataType":"string","required":true},
            "images": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "urlmap": {"dataType":"string"},
            "address": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"}},
            "location": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"},"required":true},
            "price": {"dataType":"double"},
            "category": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"},"required":true},
            "transition": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"},"required":true},
            "detail": {"ref":"Record_string.any_"},
            "status": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pagination": {
        "dataType": "refObject",
        "properties": {
            "currentPage": {"dataType":"double","required":true},
            "totalPages": {"dataType":"double","required":true},
            "totalProperty": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseAllPropertyDTO": {
        "dataType": "refObject",
        "properties": {
            "properties": {"dataType":"array","array":{"dataType":"refObject","ref":"ResponseCreatePropertyDTO"},"required":true},
            "pagination": {"ref":"Pagination","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseUpdatePropertyDTO": {
        "dataType": "refObject",
        "properties": {
            "_id": {"ref":"mongoose.Types.ObjectId","required":true},
            "cognitoSub": {"dataType":"string","required":true},
            "title": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"}},
            "description": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"}},
            "thumbnail": {"dataType":"string","required":true},
            "images": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "urlmap": {"dataType":"string"},
            "address": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"}},
            "location": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"},"required":true},
            "price": {"dataType":"double"},
            "category": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"},"required":true},
            "transition": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"},"required":true},
            "detail": {"ref":"Record_string.any_"},
            "status": {"dataType":"boolean"},
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

    
        app.post('/api/v1/properties',
            upload.fields([
                {
                    name: "thumbnail",
                    maxCount: 1
                },
                {
                    name: "images",
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.createProperty)),

            async function PropertyController_createProperty(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    thumbnail: {"in":"formData","name":"thumbnail","required":true,"dataType":"file"},
                    images: {"in":"formData","name":"images","required":true,"dataType":"array","array":{"dataType":"file"}},
                    title: {"in":"formData","name":"title","required":true,"dataType":"string"},
                    description: {"in":"formData","name":"description","required":true,"dataType":"string"},
                    urlmap: {"in":"formData","name":"urlmap","dataType":"string"},
                    address: {"in":"formData","name":"address","dataType":"string"},
                    location: {"in":"formData","name":"location","dataType":"string"},
                    price: {"in":"formData","name":"price","dataType":"string"},
                    category: {"in":"formData","name":"category","dataType":"string"},
                    transition: {"in":"formData","name":"transition","dataType":"string"},
                    detail: {"in":"formData","name":"detail","dataType":"string"},
                    request: {"in":"request","name":"request","dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'createProperty',
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
        app.get('/api/v1/properties',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.getProperty)),

            async function PropertyController_getProperty(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    cognitoSub: {"in":"query","name":"cognitoSub","dataType":"string"},
                    title: {"in":"query","name":"title","dataType":"string"},
                    description: {"in":"query","name":"description","dataType":"string"},
                    address: {"in":"query","name":"address","dataType":"string"},
                    location: {"in":"query","name":"location","dataType":"string"},
                    category: {"in":"query","name":"category","dataType":"string"},
                    transition: {"in":"query","name":"transition","dataType":"string"},
                    price: {"in":"query","name":"price","dataType":"double"},
                    language: {"in":"query","name":"language","dataType":"string"},
                    price_gte: {"in":"query","name":"price_gte","dataType":"double"},
                    price_lte: {"in":"query","name":"price_lte","dataType":"double"},
                    page: {"default":1,"in":"query","name":"page","dataType":"double"},
                    limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'getProperty',
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
        app.get('/api/v1/properties/me',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.getPropertyMe)),

            async function PropertyController_getPropertyMe(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    title: {"in":"query","name":"title","dataType":"string"},
                    description: {"in":"query","name":"description","dataType":"string"},
                    address: {"in":"query","name":"address","dataType":"string"},
                    location: {"in":"query","name":"location","dataType":"string"},
                    category: {"in":"query","name":"category","dataType":"string"},
                    transition: {"in":"query","name":"transition","dataType":"string"},
                    price: {"in":"query","name":"price","dataType":"double"},
                    language: {"in":"query","name":"language","dataType":"string"},
                    price_gte: {"in":"query","name":"price_gte","dataType":"double"},
                    price_lte: {"in":"query","name":"price_lte","dataType":"double"},
                    page: {"default":1,"in":"query","name":"page","dataType":"double"},
                    limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                    request: {"in":"request","name":"request","dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'getPropertyMe',
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
        app.put('/api/v1/properties/me/:propertyId',
            upload.fields([
                {
                    name: "thumbnail",
                    maxCount: 1
                },
                {
                    name: "images",
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.updateProperty)),

            async function PropertyController_updateProperty(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    propertyId: {"in":"path","name":"propertyId","required":true,"dataType":"string"},
                    thumbnail: {"in":"formData","name":"thumbnail","dataType":"file"},
                    images: {"in":"formData","name":"images","dataType":"array","array":{"dataType":"file"}},
                    title: {"in":"formData","name":"title","dataType":"string"},
                    description: {"in":"formData","name":"description","dataType":"string"},
                    urlmap: {"in":"formData","name":"urlmap","dataType":"string"},
                    address: {"in":"formData","name":"address","dataType":"string"},
                    location: {"in":"formData","name":"location","dataType":"string"},
                    category: {"in":"formData","name":"category","dataType":"string"},
                    transition: {"in":"formData","name":"transition","dataType":"string"},
                    price: {"in":"formData","name":"price","dataType":"string"},
                    detail: {"in":"formData","name":"detail","dataType":"string"},
                    status: {"in":"formData","name":"status","dataType":"string"},
                    request: {"in":"request","name":"request","dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'updateProperty',
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
        app.delete('/api/v1/properties/me/:propertyId',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.deleteProperty)),

            async function PropertyController_deleteProperty(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    propertyId: {"in":"path","name":"propertyId","required":true,"dataType":"string"},
                    request: {"in":"request","name":"request","dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'deleteProperty',
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
