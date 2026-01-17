import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";

const payTo = process.env.X402_WALLET_ADDRESS!;

const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://api.cdp.coinbase.com/platform/v2/x402", // mainnet facilitator
});

const server = new x402ResourceServer(facilitatorClient);
registerExactEvmScheme(server);

export const middleware = paymentProxy(
  {
    "/posts/:path*": {
      accepts: [
        {
          scheme: "exact",
          price: "$0.01",
          network: "eip155:8453", // Base mainnet
          payTo,
        },
        {
          scheme: "exact",
          price: "$0.01",
          network: "eip155:137", // Polygon mainnet
          payTo,
        },
      ],
      description: "Blog post content",
      mimeType: "text/html",
    },
  },
  server
);

export const config = {
  matcher: ["/posts/:path*"],
};
