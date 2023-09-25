// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentRegistry {
    address public admin;

    struct Document {
        string docType;
        string contentHash;
        address owner;
        address assignee;
    }

    mapping(string => Document) private documents;
    mapping(address => string[]) private documentsCreatedByUser;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this operation");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function storeDocument(
        string memory _docID,
        string memory _docType,
        string memory _contentHash,
        address _owner,
        address _assignee
    ) external {
        documents[_docID] = Document({
            docType: _docType,
            contentHash: _contentHash,
            owner: _owner,
            assignee: _assignee
        });

        documentsCreatedByUser[_owner].push(_docID);
    }

    function fetchMyIds()
        external
        view
        returns (string[] memory)
    {
        return documentsCreatedByUser[msg.sender];
    }

    function fetchDocumentById(string memory _docId) external view returns (string memory, string memory, address, address) {
        Document storage doc = documents[_docId];
        require(doc.owner == msg.sender, "You don't own this document");
        return (doc.docType, doc.contentHash, doc.owner, doc.assignee);
    }

    function searchDocumentByDocIdAndType(string memory _docID, string memory _docType)
        external
        view
        returns (string memory, address)
    {
        Document storage doc = documents[_docID];
        require(keccak256(abi.encodePacked(doc.docType)) == keccak256(abi.encodePacked(_docType)), "Document type mismatch");
        return (doc.docType, doc.owner);
    }

    function editDocument(string memory _docID, string memory _newDocType, string memory _newContentHash)
        external
    {
        Document storage doc = documents[_docID];
        require(doc.owner == msg.sender, "You don't own this document and can't edit");
        doc.docType = _newDocType;
        doc.contentHash = _newContentHash;
    }
}