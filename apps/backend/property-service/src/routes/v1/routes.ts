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
    "IProperty": {
        "dataType": "refObject",
        "properties": {
            "_id": {"ref":"mongoose.Types.ObjectId","required":true},
            "coordinate": {"dataType":"nestedObjectLiteral","nestedProperties":{"coordinates":{"dataType":"array","array":{"dataType":"double"},"required":true},"type":{"dataType":"string","required":true}},"required":true},
            "cognitoSub": {"dataType":"string"},
            "title": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"}},
            "description": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"}},
            "thumbnail": {"dataType":"string"},
            "images": {"dataType":"array","array":{"dataType":"string"}},
            "urlmap": {"dataType":"string"},
            "address": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"}},
            "location": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"}},
            "price": {"dataType":"double"},
            "category": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"}},
            "transition": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"}},
            "detail": {"ref":"Record_string.any_"},
            "comments": {"ref":"Record_string.any_"},
            "status": {"dataType":"boolean"},
            "statusAdmin": {"dataType":"boolean"},
        },
        "additionalProperties": false,
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
            "condanate": {"dataType":"array","array":{"dataType":"refObject","ref":"IProperty"}},
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
    "ResponsePropertyDTO": {
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
            "condanate": {"dataType":"array","array":{"dataType":"refObject","ref":"IProperty"}},
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
            "statusAdmin": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestQueryPropertyDTO": {
        "dataType": "refObject",
        "properties": {
            "cognitoSub": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}],"required":true},
            "title": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]},
            "description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]},
            "address": {"dataType":"string"},
            "location": {"dataType":"string"},
            "category": {"dataType":"string"},
            "transition": {"dataType":"string"},
            "price": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"undefined"}]},
            "language": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]},
            "price_gte": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"undefined"}]},
            "price_lte": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"undefined"}]},
            "page": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"undefined"}]},
            "limit": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"undefined"}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseCategoriesDTO": {
        "dataType": "refObject",
        "properties": {
            "category": {"dataType":"array","array":{"dataType":"refObject","ref":"LocalizedContent"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommentResponse": {
        "dataType": "refObject",
        "properties": {
            "_id": {"ref":"mongoose.Types.ObjectId","required":true},
            "cognitoSub": {"dataType":"string","required":true},
            "profile": {"dataType":"string","required":true},
            "userName": {"dataType":"string","required":true},
            "comment": {"dataType":"string","required":true},
            "datetime": {"dataType":"string","required":true},
            "likes": {"dataType":"double","required":true},
            "likedBy": {"dataType":"array","array":{"dataType":"string"},"required":true},
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

    
        const argsPropertyController_createProperty: Record<string, TsoaRoute.ParameterSchema> = {
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
                coordinate: {"in":"formData","name":"coordinate","dataType":"string"},
                request: {"in":"request","name":"request","dataType":"object"},
        };
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

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_createProperty, request, response });

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
        const argsPropertyController_getProperty: Record<string, TsoaRoute.ParameterSchema> = {
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
                limit: {"default":12,"in":"query","name":"limit","dataType":"double"},
        };
        app.get('/api/v1/properties',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.getProperty)),

            async function PropertyController_getProperty(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_getProperty, request, response });

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
        const argsPropertyController_fetchPropertyByID: Record<string, TsoaRoute.ParameterSchema> = {
                propertyId: {"in":"path","name":"propertyId","required":true,"dataType":"string"},
        };
        app.get('/api/v1/properties/get/:propertyId',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.fetchPropertyByID)),

            async function PropertyController_fetchPropertyByID(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_fetchPropertyByID, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'fetchPropertyByID',
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
        const argsPropertyController_getPropertyMe: Record<string, TsoaRoute.ParameterSchema> = {
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
                limit: {"default":12,"in":"query","name":"limit","dataType":"double"},
                fav_me: {"in":"query","name":"fav_me","dataType":"string"},
                request: {"in":"request","name":"request","dataType":"object"},
        };
        app.get('/api/v1/properties/me',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.getPropertyMe)),

            async function PropertyController_getPropertyMe(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_getPropertyMe, request, response });

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
        const argsPropertyController_updateProperty: Record<string, TsoaRoute.ParameterSchema> = {
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
                coordinate: {"in":"formData","name":"coordinate","dataType":"string"},
                request: {"in":"request","name":"request","dataType":"object"},
        };
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

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_updateProperty, request, response });

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
        const argsPropertyController_incrementPropertyViews: Record<string, TsoaRoute.ParameterSchema> = {
                propertyId: {"in":"path","name":"propertyId","required":true,"dataType":"string"},
        };
        app.put('/api/v1/properties/:propertyId/views',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.incrementPropertyViews)),

            async function PropertyController_incrementPropertyViews(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_incrementPropertyViews, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'incrementPropertyViews',
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
        const argsPropertyController_updatePropertyStatus: Record<string, TsoaRoute.ParameterSchema> = {
                propertyId: {"in":"path","name":"propertyId","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"status":{"dataType":"boolean","required":true}}},
        };
        app.put('/api/v1/properties/:propertyId/status',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.updatePropertyStatus)),

            async function PropertyController_updatePropertyStatus(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_updatePropertyStatus, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'updatePropertyStatus',
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
        const argsPropertyController_updateAdminstatus: Record<string, TsoaRoute.ParameterSchema> = {
                propertyId: {"in":"path","name":"propertyId","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"statusAdmin":{"dataType":"boolean","required":true}}},
        };
        app.put('/api/v1/properties/:propertyId/statusAdmin',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.updateAdminstatus)),

            async function PropertyController_updateAdminstatus(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_updateAdminstatus, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'updateAdminstatus',
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
        const argsPropertyController_deleteProperty: Record<string, TsoaRoute.ParameterSchema> = {
                propertyId: {"in":"path","name":"propertyId","required":true,"dataType":"string"},
                request: {"in":"request","name":"request","dataType":"object"},
        };
        app.delete('/api/v1/properties/me/:propertyId',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.deleteProperty)),

            async function PropertyController_deleteProperty(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_deleteProperty, request, response });

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
        const argsPropertyController_deletePropertyById: Record<string, TsoaRoute.ParameterSchema> = {
                propertyId: {"in":"path","name":"propertyId","required":true,"dataType":"string"},
        };
        app.delete('/api/v1/properties/:propertyId',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.deletePropertyById)),

            async function PropertyController_deletePropertyById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_deletePropertyById, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'deletePropertyById',
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
        const argsPropertyController_getPropertyViews: Record<string, TsoaRoute.ParameterSchema> = {
                propertyId: {"in":"path","name":"propertyId","required":true,"dataType":"string"},
        };
        app.get('/api/v1/properties/:propertyId/views',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.getPropertyViews)),

            async function PropertyController_getPropertyViews(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_getPropertyViews, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'getPropertyViews',
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
        const argsPropertyController_getPropertyUser: Record<string, TsoaRoute.ParameterSchema> = {
                cognitoSub: {"in":"path","name":"cognitoSub","required":true,"dataType":"string"},
                queries: {"in":"queries","name":"queries","required":true,"ref":"RequestQueryPropertyDTO"},
        };
        app.get('/api/v1/properties/user/:cognitoSub',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.getPropertyUser)),

            async function PropertyController_getPropertyUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_getPropertyUser, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'getPropertyUser',
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
        const argsPropertyController_addCoordinatesToProperty: Record<string, TsoaRoute.ParameterSchema> = {
                propertyId: {"in":"path","name":"propertyId","required":true,"dataType":"string"},
                coordinates: {"in":"body","name":"coordinates","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"lng":{"dataType":"double","required":true},"lat":{"dataType":"double","required":true}}},
        };
        app.post('/api/v1/properties/:propertyId/coordinates',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.addCoordinatesToProperty)),

            async function PropertyController_addCoordinatesToProperty(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_addCoordinatesToProperty, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'addCoordinatesToProperty',
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
        const argsPropertyController_findNearbyProperties: Record<string, TsoaRoute.ParameterSchema> = {
                lat: {"default":0,"in":"query","name":"lat","dataType":"double"},
                lng: {"default":0,"in":"query","name":"lng","dataType":"double"},
                maxDistance: {"default":1000,"in":"query","name":"maxDistance","dataType":"double"},
                limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
        };
        app.get('/api/v1/properties/nearby',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.findNearbyProperties)),

            async function PropertyController_findNearbyProperties(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_findNearbyProperties, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'findNearbyProperties',
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
        const argsPropertyController_getCategories: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/v1/properties/category',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.getCategories)),

            async function PropertyController_getCategories(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_getCategories, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'getCategories',
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
        const argsPropertyController_getCognitoSubProperties: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/v1/properties/sub',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.getCognitoSubProperties)),

            async function PropertyController_getCognitoSubProperties(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_getCognitoSubProperties, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'getCognitoSubProperties',
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
        const argsPropertyController_addComment: Record<string, TsoaRoute.ParameterSchema> = {
                propertyId: {"in":"path","name":"propertyId","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"comment":{"dataType":"string","required":true}}},
                request: {"in":"request","name":"request","dataType":"object"},
        };
        app.post('/api/v1/properties/:propertyId/comment',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.addComment)),

            async function PropertyController_addComment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_addComment, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'addComment',
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
        const argsPropertyController_getCommentsByPropertyId: Record<string, TsoaRoute.ParameterSchema> = {
                propertyId: {"in":"path","name":"propertyId","required":true,"dataType":"string"},
        };
        app.get('/api/v1/properties/:propertyId/get/comment',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.getCommentsByPropertyId)),

            async function PropertyController_getCommentsByPropertyId(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_getCommentsByPropertyId, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'getCommentsByPropertyId',
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
        const argsPropertyController_likeComment: Record<string, TsoaRoute.ParameterSchema> = {
                commentId: {"in":"path","name":"commentId","required":true,"dataType":"string"},
                request: {"in":"request","name":"request","dataType":"object"},
        };
        app.post('/api/v1/properties/:propertyId/comment/:commentId/like',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.likeComment)),

            async function PropertyController_likeComment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_likeComment, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'likeComment',
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
        const argsPropertyController_unlikeComment: Record<string, TsoaRoute.ParameterSchema> = {
                commentId: {"in":"path","name":"commentId","required":true,"dataType":"string"},
                request: {"in":"request","name":"request","dataType":"object"},
        };
        app.delete('/api/v1/properties/:propertyId/comment/:commentId/like',
            ...(fetchMiddlewares<RequestHandler>(PropertyController)),
            ...(fetchMiddlewares<RequestHandler>(PropertyController.prototype.unlikeComment)),

            async function PropertyController_unlikeComment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPropertyController_unlikeComment, request, response });

                const controller = new PropertyController();

              await templateService.apiHandler({
                methodName: 'unlikeComment',
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
