const { ethers } = require('ethers');
const fs = require('fs');
const { abi } = require('./engine.json');

const config = require('../config');

const CONTRACT_ADDRESS = config.contract.address;
const OWNER_ADDRESS = config.contract.owner_address;
const RPC_URL = config.contract.rpc_url;
const OWNER_PRIVATE_KEY = config.contract.owner_private_key;

class DocumentRegistryClient {
    constructor() {
        this.contractAddress = CONTRACT_ADDRESS;
        this.provider = new ethers.JsonRpcProvider(RPC_URL);
        this.wallet = new ethers.Wallet(OWNER_PRIVATE_KEY, this.provider);
        this.contract = new ethers.Contract(this.contractAddress, abi, this.wallet);
    }

    async storeDocument(docID, docType, contentHash, creator, owner) {
        const tx = await this.contract.storeDocument(docID, docType, contentHash, (owner && creator), creator);
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

    createWallet() {
        const wallet = ethers.Wallet.createRandom();
        return {
            privateKey: wallet.privateKey,
            address: wallet.address
        }
    }
    
    getAddressFromPrivateKey(privateKey) {
        const wallet = new ethers.Wallet(privateKey);
        return wallet.address;
    }
}

module.exports = new DocumentRegistryClient;