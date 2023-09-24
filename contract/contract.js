const {ethers} = require('ethers');
const fs = require('fs');
const {abi} = require('./engine.json');

require('dotenv').config(); 

// const web3 = new Web3(process.env.RPC_URL);
const CONTRACTADDRESS = process.env.CONTRACT_ADDRESS;
const OWNERADDRESS = process.env.OWNER_ADDRESS;
const RPC_URL = process.env.RPC_URL;
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;


class DocumentRegistryClient {
    constructor() {
        this.contractAddress = CONTRACTADDRESS
        this.provider = new ethers.JsonRpcProvider(RPC_URL);
        this.wallet = new ethers.Wallet(OWNER_PRIVATE_KEY, this.provider);
        this.contract = new ethers.Contract(CONTRACTADDRESS, abi, this.wallet);
    }

    async storeDocument(docID, docType, contentHash, owner) {
        const tx = await this.contract.storeDocument(docID, docType, contentHash, owner);
        await tx.wait();
        return tx.hash;
    }

    async fetchMyIds() {
        const ids = await this.contract.fetchMyIds();
        return ids;
    }

    async fetchDocumentHashById(docID) {
        const document_hash = await this.contract.fetchDocumentHashById(docID);
        return document_hash;
    }

    async searchDocumentByDocIdAndType(docID, docType) {
        return this.contract.searchDocumentByDocIdAndType(docID, docType);
    }

    async editDocument(docID, newDocType, newContentHash) {
        const tx = await this.contract.editDocument(docID, newDocType, newContentHash);
        await tx.wait();
        return tx.hash;
    }
}


// example usage
async function main(){
    const documentRegistry = new DocumentRegistryClient();
    const storeDocument = await documentRegistry.storeDocument("1", "1", "1", OWNERADDRESS);
    const ids = await documentRegistry.searchDocumentByDocIdAndType("1", "1");
    console.log(ids);
}

main();