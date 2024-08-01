export const environment = {
  firebaseConfig: {
    apiKey: import.meta.env['NG_APP_FIREBASE_API'] || '',
    authDomain: import.meta.env['NG_APP_FIREBASE_AUTH_DOMAIN'] || '',
    projectId: import.meta.env['NG_APP_FIREBASE_PROJECT_ID'] || '',
    storageBucket: import.meta.env['NG_APP_FIREBASE_STORAGE_BUCKET'] || '',
    messagingSenderId:
      import.meta.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'] || '',
    appId: import.meta.env['NG_APP_FIREBASE_APP_ID'] || '',
  },
  cloudinary: {
    cloudName: import.meta.env['NG_APP_CLOUDINARY_CLOUD_NAME'] || '',
    uploadPreset: import.meta.env['NG_APP_CLOUDINARY_UPLOAD_PRESET'] || '',
    apiKey: import.meta.env['NG_APP_CLOUDINARY_API'] || '',
  },
  openAI: {
    key: import.meta.env['NG_APP_OPENAI_API'] || '',
  },
  stripe: {
    public: import.meta.env['NG_APP_STRIPE_PUBLIC_KEY'] || '',
    secret: import.meta.env['NG_APP_STRIPE_SECRET_KEY'] || '',
  },
};
