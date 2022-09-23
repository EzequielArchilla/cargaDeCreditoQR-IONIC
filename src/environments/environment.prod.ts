import { initializeApp } from 'firebase/app';
import { CapacitorConfig } from '@capacitor/cli';

export const environment = {
  firebase: {
    projectId: 'fir-archillaezequiel-16fce',
    appId: '1:506588007115:web:581024a7a551773495694e',
    storageBucket: 'fir-archillaezequiel-16fce.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCgzI5rzonoxnKhxv5vj1opILbtz9vwOzw',
    authDomain: 'fir-archillaezequiel-16fce.firebaseapp.com',
    messagingSenderId: '506588007115',
  },
  production: true,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#ffffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: true,
    },
  },
};

// Initialize Firebase
const app = initializeApp(environment.firebase);