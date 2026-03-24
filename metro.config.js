const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// lucide-react-native@1.0.1 publica "exports" apuntando a un archivo que no existe;
// el barrel real está en dist/esm/lucide-react-native/src/ (issue del paquete en npm).
const lucideReactNativeMain = path.resolve(
  __dirname,
  'node_modules/lucide-react-native/dist/esm/lucide-react-native/src/lucide-react-native.js',
);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'lucide-react-native') {
    return { filePath: lucideReactNativeMain, type: 'sourceFile' };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
