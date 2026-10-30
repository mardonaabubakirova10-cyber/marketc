const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "react-native/asset-registry": path.resolve(__dirname, "node_modules/@react-native/assets-registry/registry.js"),
  "react-native/unstable-internals-do-not-use": path.resolve(__dirname, "node_modules/react-native/unstable-internals-do-not-use.js"),
};

module.exports = config;
