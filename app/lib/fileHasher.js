const fs = require('fs');
const crypto = require('crypto');

class FileHasher {
    constructor() {
        this.algorithm = 'sha256';
        this.encoding = 'hex';
    }

    async hash(filePath) {
        const hash = crypto.createHash(this.algorithm);
        const stream = fs.createReadStream(filePath);

        stream.on('data', (data) => {
            hash.update(data);
        });

        return new Promise((resolve, reject) => {
            stream.on('end', () => {
                const fileHash = hash.digest(this.encoding);
                resolve(fileHash);
            });

            stream.on('error', (error) => {
                reject(error);
            });
        });
    }

    async compare(filePath, expectedHash) {
        try {
            const fileHash = await this.hash(filePath);
            return fileHash === expectedHash;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new FileHasher();