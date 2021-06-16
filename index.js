/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import DirectMessage from './src/container/dm'

AppRegistry.registerComponent(appName, () => DirectMessage);
