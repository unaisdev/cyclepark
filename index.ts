import 'react-native-gesture-handler';
import './src/theme/register';
import './src/i18n';

import { registerRootComponent } from 'expo';

import App from './src/App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// and ensures the environment is set up appropriately for Expo.
registerRootComponent(App);
