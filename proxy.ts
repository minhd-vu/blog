import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";

const payTo = process.env.X402_WALLET_ADDRESS!;

const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://facilitator.payai.network", // public facilitator with mainnet support
});

// Create custom EVM scheme with Polygon USDC support
const evmScheme = new ExactEvmScheme();
evmScheme.registerMoneyParser(async (amount, network) => {
  if (network === "eip155:137") {
    // Polygon USDC (6 decimals)
    return {
      amount: Math.round(amount * 1e6).toString(),
      asset: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC on Polygon
    };
  }
  return null; // Use default parser for other networks
});

const server = new x402ResourceServer(facilitatorClient);
server.register("eip155:*", evmScheme);

export default paymentProxy(
  {
    "/posts/*": {
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
