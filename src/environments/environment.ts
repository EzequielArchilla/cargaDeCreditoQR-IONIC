import { initializeApp } from 'firebase/app';
import { CapacitorConfig } from '@capacitor/cli';

export const environment = {
  firebase: {
    apiKey: 'AIzaSyD8ZxH-LTzD-YAUXlyKJNYWc_F9LhS9w0U',
    authDomain: 'lectorqr-e8a14.firebaseapp.com',
    projectId: 'lectorqr-e8a14',
    storageBucket: 'lectorqr-e8a14.appspot.com',
    messagingSenderId: '373391301027',
    appId: '1:373391301027:web:54b66151ce4e2bfa8c6216',
  },
  production: false,
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
