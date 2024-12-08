import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "U-Plan",
      region: "ap-southeast-2",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
          environment: {
            NEXT_PUBLIC_BASE_URL_AUTH: process.env.NEXT_PUBLIC_BASE_URL_AUTH || '',
            // NEXT_PUBLIC_VAPID_KEY: process.env.NEXT_PUBLIC_VAPID_KEY || ''
          }
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;

