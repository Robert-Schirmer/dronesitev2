declare global {
  interface Window {
    ethereum: any;
  }
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_ANALYTICS: string;
      // Password for website
      SITE_PASS: string;
      // Sign for JWT token
      JWT_SIGN: string;
      // Password protect the entire website
      PASS_PROTECT_SITE: 'true' | 'false';
      // Enforce protecting pages based on user's role token
      // For development, role token can't be created
      // without service account set in development server env
      ENFORCE_ROLES: 'true' | 'false';
    }
  }
}

// Adding this exports the declaration file which Typescript/CRA can now pickup:
export {};
