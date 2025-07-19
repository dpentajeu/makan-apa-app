const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add resolver configuration for Node.js modules
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config; 