import { ChainOrRpc, Web3sdksSDK } from "@web3sdks/sdk";
import "dotenv/config";

// === UPDATE THESE VALUES TO MATCH YOUR CONTRACT AND NETWORK ===
const NFT_COLLECTION_ADDRESS = "0xaca236B8569932eedBb2a5B958Ef22a81a6f768c"; // The address of the edition contract
const network: ChainOrRpc = "optimism-goerli"; // The network your contracts are deployed to
const PRIVATE_KEY = process.env.PRIVATE_KEY!; // Read the README for how to set this up in a .env file
const IPFS_URL = "ipfs://QmZGU4nEJKpD5DLhbcTr2fi79ZZatXg59ir1gbaBenP48e"; // The URL of the asset bundle you uploaded to IPFS
// =========================================================== \\

(async () => {
  try {
    // Instantiate the SDK with our private key onto the network
    const sdk = Web3sdksSDK.fromPrivateKey(PRIVATE_KEY, network);
    const collection = await sdk.getContract(
      NFT_COLLECTION_ADDRESS,
      "nft-collection"
    );

    await collection.mint({
      name: "My 3D Cube NFT",
      description: "This NFT gets loaded in the Unity game at run time!",
      image: IPFS_URL,
    });

    console.log("🎉 Successfully minted NFT!");
  } catch (e) {
    console.error(e);
  }
})();
