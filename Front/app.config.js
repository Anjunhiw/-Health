// Front/app.config.js
import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  name: 'GymSpot',
  slug: 'GymSpot',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    jsEngine: 'hermes',
    ...config?.ios,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    package: 'com.anonymous.GymSpot',
    usesCleartextTraffic: true,
    jsEngine: 'hermes',
    ...config?.android,
  },
  web: {
    favicon: './assets/favicon.png',
    jsEngine: 'hermes',
    ...config?.web,
  },
  plugins: ['expo-dev-client', 'expo-web-browser'],
  extra: {
    ...(config?.extra ?? {}),
    api: {
      androidEmulator: process.env.API_ANDROID_EMULATOR ?? 'http://10.0.2.2:8080',
      androidDevice: process.env.API_ANDROID_DEVICE ?? 'http://10.125.47.4:8080',
      iosSimulator: process.env.API_IOS_SIMULATOR ?? 'http://localhost:8080',
      iosDevice: process.env.API_IOS_DEVICE ?? 'http://10.125.47.4:8080',
      ...(config?.extra?.api ?? {}),
    },
  },
});