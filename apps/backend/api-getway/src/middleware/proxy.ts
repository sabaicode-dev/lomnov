import { IncomingMessage, ServerResponse, ClientRequest } from "http";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import ROUTE_PATHS, { RouteConfig } from "../routes-def";
import express from "express";
import { Socket } from "net";
import { loggingMiddleware } from "../utils/logger";

interface ProxyConfig {
  [context: string]: Options<IncomingMessage, ServerResponse>;
}

const proxyConfigs: ProxyConfig = {};

const createProxyOptions = (
  routeConfig: RouteConfig,
): Options<IncomingMessage, ServerResponse> => ({
  target: routeConfig.target,
  changeOrigin: true,
  pathRewrite: (path, _req) => {
    // Extract the dynamic part of the path
    const dynamicPath = path.replace(routeConfig.path, ""); // Remove the base path
    console.log(dynamicPath);
    return `${routeConfig.path}${dynamicPath}`; // Return the full path
  },
  on: {
    proxyReq: (
      proxyReq: ClientRequest,
      req: IncomingMessage,
      res: ServerResponse,
    ) => {
      proxyReq.setHeader("x-api-gateway-header", "http://localhost:3000");
      const nestedPath = `${routeConfig.target}${req.url}`;
      loggingMiddleware(req, res, nestedPath, "Proxy Request");
    },
    proxyRes: (
      _proxyRes: IncomingMessage,
      req: IncomingMessage,
      res: ServerResponse,
    ) => {
      const nestedPath = `${routeConfig.target}${req.url}`;

      loggingMiddleware(req, res, nestedPath, "Proxy Responsed");
    },
    error: (
      err: Error,
      _req: IncomingMessage,
      res: ServerResponse | Socket,
    ) => {
      console.error("Proxy error:", err);
      if (res instanceof ServerResponse) {
        res.statusCode = 500;
        res.end("Proxy error");
      } else {
        res.destroy();
      }
    },
  },
});

Object.keys(ROUTE_PATHS).forEach((key) => {
  const routeConfig = ROUTE_PATHS[key];
  const proxyOption = createProxyOptions(routeConfig);
  proxyConfigs[routeConfig.path] = proxyOption;

  // console.log(
  //   `Configured proxy for ${routeConfig.path} -> ${routeConfig.target}`,
  // );

  if (routeConfig.nestedRoutes) {
    routeConfig.nestedRoutes.forEach((nestedRoute) => {
      const nestedPath = `${routeConfig.path}${nestedRoute.path}`;
      // const nestedPath = `${nestedRoute.path}`;
      proxyConfigs[nestedPath] = {
        ...proxyOption,
      };
      // console.log(
      //   `Configured proxy for ${nestedPath} -> ${routeConfig.target}${nestedRoute.path}`,
      // );
    });
  }
});

const applyProxy = (app: express.Application) => {
  Object.keys(proxyConfigs).forEach((context: string) => {
    app.use(context, createProxyMiddleware(proxyConfigs[context]));
  });
};

export default applyProxy;
