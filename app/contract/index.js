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
        const tx = await this.contract.storeDocument(docID, docType, contentHash, owner, creator);
        await tx.wait();
        return tx.hash;
    }    

    async fetchMyIds(privateKey) {
        const wallet = new ethers.Wallet(privateKey, this.provider);
        const contract = new ethers.Contract(this.contractAddress, abi, wallet);
        const ids = await contract.fetchMyIds();
        return ids;
    }

    async fetchDocumentById(contentHash, privateKey) {
        const wallet = new ethers.Wallet(privateKey, this.provider);
        const contract = new ethers.Contract(this.contractAddress, abi, wallet);
        
        const document = await contract.fetchDocumentById(contentHash);
        const [ docId, docType, _contentHash, owner, creator ] = document;
        return {
            docId,
            docType,
            contentHash: _contentHash,
            owner,
            creator,
        };
    }    

    async searchDocumentByDocIdAndType(docType, contentHash) {
        const exists = await this.contract.searchDocumentByDocIdAndType(docType, contentHash);
        return exists;
    }    

    async editDocument(contentHash, newDocType, newContentHash) {
        const tx = await this.contract.editDocument(contentHash, newDocType, newContentHash);
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

    async shareUserAccess(contentHash, toAddress, privateKey) {
        const wallet = new ethers.Wallet(privateKey);
        const contract = new ethers.Contract(this.contractAddress, abi, wallet);
        const tx = await contract.shareUserAccess(contentHash, toAddress);
        await tx.wait();
        return tx.hash;
    }    
}

module.exports = new DocumentRegistryClient;