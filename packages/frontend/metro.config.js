const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

config.resolver.sourceExts.push(
  // add support for markdown
  'md', 'txt', 'svg'
);

module.exports = withNativeWind(config, { input: './global.css' })
