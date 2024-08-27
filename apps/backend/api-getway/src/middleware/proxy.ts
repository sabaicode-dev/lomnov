import { IncomingMessage, ServerResponse, ClientRequest } from "http";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { ROUTE_PATHS, RouteConfig } from "../routes-def";
import express from "express";
import { Socket } from "net";

interface ProxyConfig {
  [context: string]: Options<IncomingMessage, ServerResponse>;
}
const proxyConfigs: ProxyConfig = {};

const createProxyOptions = (
  routeConfig: RouteConfig
): Options<IncomingMessage, ServerResponse> => ({
  target: routeConfig.target,
  changeOrigin: true,
  pathRewrite: (path, _req) => {
    return path.replace(routeConfig.path, "");
  },
  on: {
    proxyReq: (
      proxyReq: ClientRequest,
      req: IncomingMessage,
      res: ServerResponse
    ) => {
      proxyReq.setHeader("x-api-gateway-header", "http://localhost:3000");
    },
    proxyRes: (
      proxyRes: IncomingMessage,
      req: IncomingMessage,
      res: ServerResponse
    ) => {
      console.log(
        `Proxied ${req.method} ${req.url} -> ${routeConfig.target}${req.url}`
      );
    },
    error: (err: Error, req: IncomingMessage, res: ServerResponse | Socket) => {
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

  console.log(
    `Configured proxy for ${routeConfig.path} -> ${routeConfig.target}`
  );

  if (routeConfig.nestedRoutes) {
    routeConfig.nestedRoutes.forEach((nestedRoute) => {
      const nestedPath = `${routeConfig.path}${nestedRoute.path}`;
      proxyConfigs[nestedPath] = {
        ...proxyOption,
        pathRewrite: (path) => path.replace(nestedPath, nestedRoute.path),
      };
      console.log(
        `Configured proxy for ${nestedPath} -> ${routeConfig.target}${nestedRoute.path}`
      );
    });
  }
});

const applyProxy = (app: express.Application) => {
  Object.keys(proxyConfigs).forEach((context: string) => {
    app.use(context, createProxyMiddleware(proxyConfigs[context]));
  });
};

export default applyProxy;
