import { applicationDefault, initializeApp, getApps, App } from 'firebase-admin/app';

/*
 * Initializes firebase admin app if not already initialized
 */
export const initializeFirebaseAdmin = (): App => {
  const apps = getApps();
  let app: App;
  if (apps.length === 0) {
    // Credentials should be set in the env
    // When running locally
    // export GOOGLE_APPLICATION_CREDENTIALS="/....../service-account-file.json"
    // In terminal that is running app
    app = initializeApp({
      credential: applicationDefault(),
    });
  } else {
    app = apps[0];
  }
  return app;
};
