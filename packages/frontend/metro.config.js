const { getDefaultConfig } = require("expo/metro-config");
const path = require('node:path');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push(
  // add support for markdown
  'md', 'txt', 'svg'
);

config.watchFolders = [path.resolve(__dirname, 'app')];
console.log(config.watchFolders);
module.exports = config;
