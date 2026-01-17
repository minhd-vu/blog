import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { NextRequest, NextResponse } from "next/server";

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

// Check if request is from a regular browser (not an AI agent)
function isBrowser(req: NextRequest): boolean {
  const accept = req.headers.get("accept") || "";
  const userAgent = req.headers.get("user-agent") || "";
  return accept.includes("text/html") && userAgent.includes("Mozilla");
}

const x402Proxy = paymentProxy(
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

// Let browsers through for free, only charge AI agents
export default async function proxy(req: NextRequest) {
  if (isBrowser(req)) {
    return NextResponse.next();
  }
  return x402Proxy(req);
}

export const config = {
  matcher: ["/posts/:path*"],
};
