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