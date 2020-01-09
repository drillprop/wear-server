declare namespace NodeJS {
  export interface ProcessEnv {
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_PASSWORD: string;
    FRONTEND_URL: string;
    JWT_SECRET: string;
    MAIL_HOST: string;
    MAIL_PORT: number;
    MAIL_USER: string;
    MAIL_PASS: string;
  }
}
