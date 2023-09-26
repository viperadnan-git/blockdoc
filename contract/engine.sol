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

        if(_owner == _assignee){
            documentsCreatedByUser[_owner].push(_docID);
        }else {
            documentsCreatedByUser[_owner].push(_docID);
            documentsCreatedByUser[_assignee].push(_docID);
        }
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

    function searchDocumentByDocIdAndType(string memory _docID, string memory _docType, string memory _contentHash) external view returns (bool) {
        Document storage doc = documents[_docID];
        if (
            keccak256(abi.encodePacked(doc.docType)) == keccak256(abi.encodePacked(_docType)) &&
            keccak256(abi.encodePacked(doc.contentHash)) == keccak256(abi.encodePacked(_contentHash))
        ) {
            return true;
        }
        
        return false; 
    }

    function editDocument(string memory _docID, string memory _newDocType, string memory _newContentHash)
        external
    {
        Document storage doc = documents[_docID];
        require(doc.owner == msg.sender, "You don't own this document and can't edit");
        doc.docType = _newDocType;
        doc.contentHash = _newContentHash;
    }

    function createUser(string memory _name, address _addr) external onlyAdmin {
        // check if the user already exist
        require(users[_addr].addr != _addr, "user with this address already exist");
        // create user
        users[_addr] = User({
            name: _name,
            addr: _addr,
            verified: false,
            role: "User"
        });
    }

    function grantRole(address _userAddr, string memory _roleType) external onlyAdmin {
        User storage user = users[_userAddr];
        require(user.addr == _userAddr, "User doesn't exist");
        user.role = _roleType;
    }
}