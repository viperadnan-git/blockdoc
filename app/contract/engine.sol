// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentRegistry {
    address public admin;

    struct Document {
        string docId;
        string docType;
        string contentHash;
        address owner;
        address creator;
    }

    struct User {
        string name;
        address addr;
        bool verified;
        string role;
    }

    mapping(string => Document) private documents;
    mapping(address => string[]) private documentsCreatedByUser;
    mapping(address => User) private users;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this operation");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function getUser(address _addr) external view returns (string memory, address, bool, string memory) {
        User storage user = users[_addr];
        return (user.name, user.addr, user.verified, user.role);
    }

    function storeDocument(
        string memory _docID,
        string memory _docType,
        string memory _contentHash,
        address _owner,
        address _creator
    ) external {
        require(users[_owner].addr == _owner, "Owner doesn't exist");
        require(users[_creator].addr == _creator, "Creator doesn't exist");
        
        require(bytes(documents[_contentHash].contentHash).length == 0, "Document already exists");

        documents[_contentHash] = Document({
            docId: _docID,
            docType: _docType,
            contentHash: _contentHash,
            owner: _owner,
            creator: _creator
        });

        documentsCreatedByUser[_owner].push(_contentHash);

        if (_owner != _creator) {
            documentsCreatedByUser[_creator].push(_contentHash);
        }
    }

    function fetchMyIds() external view returns (string[] memory) {
        return documentsCreatedByUser[msg.sender];
    }

    function fetchDocumentById(string memory _contentHash) external view returns (string memory, string memory, string memory, address, address) {
        Document storage doc = documents[_contentHash];
        require(bytes(doc.contentHash).length > 0, "Document not found");
        require(doc.owner == msg.sender || doc.creator == msg.sender, "You don't have permission for this document");
        return (doc.docId, doc.docType, doc.contentHash, doc.owner, doc.creator);
    }

    function editDocument(
        string memory _contentHash,
        string memory _newDocType,
        string memory _newContentHash
    ) external {
        Document storage doc = documents[_contentHash];
        require(bytes(doc.contentHash).length > 0, "Document not found");
        require(doc.owner == msg.sender, "You don't own this document and can't edit");

        doc.docType = _newDocType;
        doc.contentHash = _newContentHash;
    }

    function createUser(string memory _name, address _addr) external onlyAdmin {
        require(users[_addr].addr == address(0), "User with this address already exists");

        users[_addr] = User({
            name: _name,
            addr: _addr,
            verified: false,
            role: "User"
        });
    }

    function grantRole(address _userAddr, string memory _roleType) external onlyAdmin {
        User storage user = users[_userAddr];
        require(user.addr != address(0), "User doesn't exist");
        user.role = _roleType;
        user.verified = true;
    }
}