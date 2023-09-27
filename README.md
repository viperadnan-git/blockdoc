# Blockchain eVault System for Legal Records

## Overview

This GitHub repository hosts the Blockchain eVault System for Legal Records project, aiming to revolutionize legal record management using blockchain technology. The project stack includes:

- **Smart Contract**: Solidity (Authentication and Authorization)
- **Frontend**: React (DOM manipulation) with ChakraUI (Boilerplate design)
- **Backend**: Node.js with Express (Web Server)
- **Blockchain Interaction**: Web3.js

## Approach Details

The existing legal record management system is not efficient in court proceedings and the sharing, managing and checking integrity of physical paper works makes the case proceedings slower. the existing system is not able to integrate with the other online databases. we need a secure, transparent and user-freindly system to overcome this issue. To address these challenges, we propose:

## Existing Problems
-	Lack of Transparency
-	No long term data storage
-	Server Downtimes
-	Improper authorization system
-	Simple login and accessing
-	Less complex sharing system

## Improved Solution

1. **Dispute Resolution**: Establish a transparent platform for sharing evidence and documents between parties.

2. **Authorization**: Implement role-based permissions and access controls for users.

3. **Third Party Integration**: Provide easy API access with comprehensive documentation for seamless integration.

4. **Document Sharing**: Enable effortless document sharing between parties using an entity-based system.

5. **Fast Court Proceedings**: Offer a user-friendly system with efficient role management and verification for lawyers, judges, and other users.

6. **KYC as a Service**: Utilize existing databases for user authentication and provide a secure service for legal document verification without exposing user data.

## Project Structure

The project is organized into three main components:

**Smart Contracts**: Written in Solidity, these contracts manage authentication and authorization. They regulate access permissions and transactions within the blockchain network.

**Frontend**: Developed using React and ChakraUI, the frontend provides user-friendly interfaces. Users can seamlessly upload, retrieve, track changes, and share legal documents. The frontend code is located in the `/web` directory.

**Backend**: Powered by Node.js, Express, Ethers, Multer, Sequelize, and SQlite3, the backend serves as the web server. It interacts with smart contracts using Web3.js and handles user requests, authentication, and communication with the blockchain. The backend code resides in the `/App` directory.

## API Endpoints

- **Authorization**:
  - Login User: POST `/api/login` (Parameters: email, password in the body) - Returns an authorization key.
  - Sign Up User: POST `/api/signup` (Parameters: username, name, email, password) - Returns a 200 status code on success.

- **Document Management**:
  - Upload Document for the User: POST `/api/upload` (Parameters: file, doc_type, doc_id, owner, user_id) - Returns a 201 status code on success.
  - Share Access to User: POST `/api/share` (Parameters: toAddress with an authorization key) - Returns a 200 status code on success.
  - List User Documents: GET `/api/list` (Parameters: authorization key) - Returns all user documents allotted.
  - Download File: GET `/api/download` (Parameters: document ID) - Allows users to download documents.

This project aims to enhance transparency, efficiency, and security in legal record management, addressing the challenges of the existing system. It offers a robust solution for legal professionals and stakeholders.

## Summary

This GitHub repository hosts a Blockchain eVault System for Legal Records project, utilizing Solidity for smart contracts, React with ChakraUI for the frontend, and Node.js with Express for the backend. It addresses existing challenges in legal record management by providing a transparent platform for evidence sharing, role-based authorization, seamless third-party integration, efficient document sharing, fast court proceedings, and secure KYC services. The project's structure includes smart contracts for authentication and authorization, a user-friendly frontend for document management, and a backend for communication with the blockchain. It offers a range of API endpoints for user authentication, document uploading, sharing, listing, and downloading, enhancing transparency and efficiency in the legal system.

**Note:** This repository is currently in development, and updates will be made regularly to provide a functioning prototype and comprehensive documentation. Thank you for your interest in our project!
