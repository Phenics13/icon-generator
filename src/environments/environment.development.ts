export const environment = {
  firebaseConfig: {
    apiKey: process.env['NG_APP_FIREBASE_API'] || '',
    authDomain: process.env['NG_APP_FIREBASE_AUTH_DOMAIN'] || '',
    projectId: process.env['NG_APP_FIREBASE_PROJECT_ID'] || '',
    storageBucket: process.env['NG_APP_FIREBASE_STORAGE_BUCKET'] || '',
    messagingSenderId: process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'] || '',
    appId: process.env['NG_APP_FIREBASE_APP_ID'] || '',
  },
  cloudinary: {
    cloudName: process.env['NG_APP_CLOUDINARY_CLOUD_NAME'] || '',
    uploadPreset: process.env['NG_APP_CLOUDINARY_UPLOAD_PRESET'] || '',
    apiKey: process.env['NG_APP_CLOUDINARY_API'] || '',
  },
  openAI: {
    key: process.env['NG_APP_OPENAI_API'] || '',
  },
  stripe: {
    public: process.env['NG_APP_STRIPE_PUBLIC_KEY'] || '',
    secret: process.env['NG_APP_STRIPE_SECRET_KEY'] || '',
  },
};
