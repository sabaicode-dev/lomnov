import { createProxyMiddleware } from "http-proxy-middleware";
import ROUTE_PATHS from "@/src/routes-def";
import express from "express";
import createProxyOptions from "@/src/middleware/createProxyOption";
import { ProxyConfig, RouteConfig } from "@/src/utils/types/interface";

const proxyConfigs: ProxyConfig = {};

Object.keys(ROUTE_PATHS).forEach((key) => {
  const routeConfig = ROUTE_PATHS[key] as RouteConfig;
  const proxyOption = createProxyOptions(routeConfig);

  proxyConfigs[routeConfig.path] = proxyOption;
  if (routeConfig.nestedRoutes) {
    routeConfig.nestedRoutes.forEach((nestedRoute) => {
      const nestedPath = `${routeConfig.path}${nestedRoute.path}`;
      proxyConfigs[nestedPath] = {
        ...proxyOption,
      };
    });
  }
});

const applyProxy = (app: express.Application) => {
  Object.keys(proxyConfigs).forEach((context: string) => {
    if (context === ROUTE_PATHS.CHAT_SERVICE.path) {
      app.use(createProxyMiddleware(proxyConfigs[context]));
    } else {
      app.use(context, createProxyMiddleware(proxyConfigs[context]));
    }
  });
};

export default applyProxy;
