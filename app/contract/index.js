const {ethers} = require('ethers');
const fs = require('fs');
const {abi} = require('./engine.json');

const config = require('../config');

// const web3 = new Web3(process.env.RPC_URL);
const CONTRACTADDRESS = config.contract.address;
const RPC_URL = config.contract.rpc_url;


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
    
    static createNewWalletAndReturnPrivateKeyAndAddress() {
        const wallet = ethers.Wallet.createRandom();
        return {
            privateKey: wallet.privateKey,
            address: wallet.address
        }
    }
    
    static getAddressFromPrivateKey(privateKey) {
        const wallet = new ethers.Wallet(privateKey);
        return wallet.address;
    }
}


module.exports = DocumentRegistryClient;