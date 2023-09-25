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
        return this.contract.fetchDocumentById(docID);
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

// Example usage
async function main() {
    const documentRegistry = new DocumentRegistryClient();
    
    // Store a document
    const storeDocumentTxHash = await documentRegistry.storeDocument("1", "Invoice", "hash123", "assigneeAddress");
    console.log(`Transaction hash for storing document: ${storeDocumentTxHash}`);

    // Fetch your document IDs
    const myDocumentIds = await documentRegistry.fetchMyIds();
    console.log("My Document IDs:", myDocumentIds);

    // Fetch a document by its ID
    const docID = myDocumentIds[0]; // Assuming you have at least one document
    const document = await documentRegistry.fetchDocumentById(docID);
    console.log("Fetched Document:", document);

    // Search for a document by ID and type
    const searchResult = await documentRegistry.searchDocumentByDocIdAndType("1", "Invoice");
    console.log("Search Result:", searchResult);

    // Edit a document
    const editDocumentTxHash = await documentRegistry.editDocument(docID, "Updated Invoice", "newHash456");
    console.log(`Transaction hash for editing document: ${editDocumentTxHash}`);
}

main();
