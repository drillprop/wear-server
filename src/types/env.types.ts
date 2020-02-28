declare namespace NodeJS {
  export interface ProcessEnv {
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_PASSWORD: string;
    FRONTEND_URL: string;
    JWT_SECRET: string;
    MAIL_HOST: string;
    MAIL_PORT: string;
    MAIL_USER: string;
    MAIL_PASS: string;
  }
}
