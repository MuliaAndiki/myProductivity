const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const repoRoot = path.resolve(projectRoot, "..", "..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [repoRoot, path.join(repoRoot, "node_modules")];

const extraNodeModules = new Proxy(
  {},
  {
    get: (_, name) => path.join(repoRoot, "node_modules", name),
  },
);

config.resolver = {
  ...config.resolver,
  extraNodeModules,
  nodeModulesPaths: [path.join(repoRoot, "node_modules")],
};

module.exports = withNativeWind(config, { input: "./styles/global.css" });
