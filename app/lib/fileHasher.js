const crypto = require('crypto');
const fs = require('fs');

class FileHasher {
    async hash(filePath) {
        const hash = crypto.createHash('sha1');
        const stream = fs.createReadStream(filePath);

        return new Promise((resolve, reject) => {
            stream.on('data', (data) => {
                hash.update(data);
            });

            stream.on('end', () => {
                const fileHash = hash.digest('hex');
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