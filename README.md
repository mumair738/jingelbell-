# Farcaster Mini Apps (formerly Frames v2) Quickstart by Neynar 🪐

A Farcaster Mini Apps quickstart npx script.

This is a [NextJS](https://nextjs.org/) + TypeScript + React app.

## Guide

Check out [this Neynar docs page](https://docs.neynar.com/docs/create-farcaster-miniapp-in-60s) for a simple guide on how to create a Farcaster Mini App in less than 60 seconds!

## Getting Started

To create a new mini app project, run:
```{bash}
npx @neynar/create-farcaster-mini-app@latest
```

To run the project:
```{bash}
cd <PROJECT_NAME>
npm run dev
```

### Importing the CLI
To invoke the CLI directly in JavaScript, add the npm package to your project and use the following import statement:
```{javascript}
import { init } from '@neynar/create-farcaster-mini-app';
```

## Deploying to Vercel
For projects that have made minimal changes to the quickstart template, deploy to vercel by running:
```{bash}
npm run deploy:vercel
```

## Building for Production

To create a production build, run:
```{bash}
npm run build
```

The above command will generate a `.env` file based on the `.env.local` file and user input. Be sure to configure those environment variables on your hosting platform.

## Developing Script Locally

This section is only for working on the script and template. If you simply want to create a mini app and _use_ the template, this section is not for you.

### Recommended: Using `npm link` for Local Development

To iterate on the CLI and test changes in a generated app without publishing to npm:

1. In your installer/template repo (this repo), run:
   ```bash
   npm link
   ```


1. Now, when you run:
   ```bash
   npx @neynar/create-farcaster-mini-app
   ```
   ...it will use your local changes (including any edits to `init.js` or other files) instead of the published npm version.

### Alternative: Running the Script Directly

You can also run the script directly for quick iteration:

```bash
node ./bin/index.js
```

However, this does not fully replicate the npx install flow and may not catch all issues that would occur in a real user environment.

### Environment Variables and Scripts

If you update environment variable handling, remember to replicate any changes in the `dev`, `build`, and `deploy` scripts as needed. The `build` and `deploy` scripts may need further updates and are less critical for most development workflows.

---

# JingleBell Token Farcaster Mini App Setup Guide

This guide details the steps to set up a Farcaster Mini App for the JingleBell Token, allowing users to claim tokens through a Farcaster Frame.

## Setup Instructions

1.  **Clone the Repository:**
    If you haven't already, clone the `create-farcaster-mini-app` repository:
    ```bash
    gh repo clone neynarxyz/create-farcaster-mini-app
    cd create-farcaster-mini-app
    ```

2.  **Install Dependencies:**
    Navigate into the cloned directory and install the necessary npm dependencies:
    ```bash
    npm install
    ```

3.  **Set Environment Variables:**
    Create a `.env.local` file in the root of your `create-farcaster-mini-app` directory and populate it with your environment variables. **Ensure your private keys are kept secure and never committed to a public repository.**

    ```
    NEYNAR_API_KEY=your_neynar_key
    WALLET_PRIVATE_KEY=your_private_key
    RPC_URL=https://mainnet.base.org
    CONTRACT_ADDRESS=
    ```

    *   `NEYNAR_API_KEY`: Your API key from Neynar.
    *   `WALLET_PRIVATE_KEY`: The private key of the wallet that will execute the `claim()` transaction.
    *   `RPC_URL`: The RPC URL for the Base mainnet (or your chosen network).
    *   `CONTRACT_ADDRESS`: The address of your JingleBell Token smart contract.

4.  **Create Claim API Endpoint:**
    Create a new file at `/app/api/claim/route.ts` inside your `create-farcaster-mini-app` directory with the following content. This API endpoint will handle the token claim logic.

    ```typescript
    import { ethers } from "ethers";

    export async function POST(req: Request) {
      const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);
      const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY!, provider);

      const contractAddress = process.env.CONTRACT_ADDRESS!;
      const abi = [
        "function claim() external",
      ];

      const contract = new ethers.Contract(contractAddress, abi, wallet);

      try {
        const tx = await contract.claim();
        return Response.json({ success: true, tx: tx.hash });
      } catch (e: any) {
        return Response.json({ success: false, error: e.message });
      }
    }
    ```

5.  **Add Frame Button Example:**
    Modify the file at `/app/frames/route.tsx` inside your `create-farcaster-mini-app` directory to include a button for claiming JingleBell Tokens.

    ```typescript
    import { FrameResponse } from "frames.js/next/server";

    export async function GET() {
      return new FrameResponse(
        {
          image: `https://yourdomain.com/jinglebell.jpg`,
          buttons: [
            {
              label: "🎁 Claim 1000 JGB",
              action: {
                type: "post",
                target: "/api/claim"
              }
            }
          ]
        }
      );
    }
    ```
    Remember to replace `https://yourdomain.com/jinglebell.jpg` with the actual URL of your image.

## Result

Once these steps are completed, your Farcaster Mini App will be ready:

*   A user taps the "Claim 1000 JGB" button on the Frame.
*   The Frame calls your `/api/claim` endpoint.
*   Your smart contract's `claim()` function executes.
*   The user receives 1000 JGB tokens.
