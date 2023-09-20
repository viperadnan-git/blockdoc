const { parse } = require('toml');
const { readFileSync } = require('fs');

const config = parse(readFileSync('./config.toml', 'utf-8'));

module.exports = config;