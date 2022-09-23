import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'carga.de.credito.qr',
  appName: 'Carga de Credito QR',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,

      backgroundColor: '#ffffffff',

      launchAutoHide: true,

      androidSplashResourceName: 'launch_splash',
    },
  },
};

export default config;
