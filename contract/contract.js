const { ethers } = require('ethers');
const fs = require('fs');
const { abi } = require('./engine.json');

require('dotenv').config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const RPC_URL = process.env.RPC_URL;
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;

class DocumentRegistryClient {
    constructor() {
        this.contractAddress = CONTRACT_ADDRESS;
        this.provider = new ethers.JsonRpcProvider(RPC_URL);
        this.wallet = new ethers.Wallet(OWNER_PRIVATE_KEY, this.provider);
        this.contract = new ethers.Contract(this.contractAddress, abi, this.wallet);
    }

    async storeDocument(docID, docType, contentHash, assignee) {
        const tx = await this.contract.storeDocument(docID, docType, contentHash, OWNER_ADDRESS, assignee);
        await tx.wait();
        return tx.hash;
    }

    async fetchMyIds() {
        const ids = await this.contract.fetchMyIds();
        return ids;
    }

    async fetchDocumentById(docID) {
        const document = await this.contract.fetchDocumentById(docID);
        // Parse the result into meaningful fields (assuming you want to use them)
        const [docType, contentHash, owner, assignee] = document;
        return { docType, contentHash, owner, assignee };
    }

    async searchDocumentByDocIdAndType(docID, docType, contentHash) {
        const exists = await this.contract.searchDocumentByDocIdAndType(docID, docType, contentHash);
        return exists;
    }

    async editDocument(docID, newDocType, newContentHash) {
        const tx = await this.contract.editDocument(docID, newDocType, newContentHash);
        await tx.wait();
        return tx.hash;
    }

    async createUser(name, addr) {
        const tx = await this.contract.createUser(name, addr);
        await tx.wait();
        return tx.hash;
    }

    async grantRole(userAddr, roleType) {
        const tx = await this.contract.grantRole(userAddr, roleType);
        await tx.wait();
        return tx.hash;
    }
}
