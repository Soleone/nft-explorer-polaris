import web3 from "./web3.js";
import { erc721 } from "../abi/erc721.js";

export default class NFT {
  constructor(address) {
    this.address = address;
    this.contract = new web3.eth.Contract(erc721, address);
    this.name = null;
    this.data = {};
    this.attributes = [];
  }

  async load() {
    let name = await this.contract.methods.name().call();
    let baseURI = await this.contract.methods.tokenURI(1).call();
    let supply = await this.contract.methods.totalSupply().call();
    let metadata = {};

    try {
      metadata = await this.readTokenURI(baseURI);
    } catch (error) {
      console.log(`Failed to fetch metadata: ${baseURI}`);
      console.log(error);
    }

    this.name = name;
    this.data = {
      baseURI,
      supply,
      description: metadata.description
    };
    this.attributes = metadata.attributes;
  }

  async readTokenURI(tokenURI) {
    let url = tokenURI;

    if (url.startsWith("ipfs://")) {
      url = url.replace("ipfs://", "");
      url = `https://dweb.link/ipfs/${url}`;
    }

    return fetch(url).then((result) => result.json());
  }
}
