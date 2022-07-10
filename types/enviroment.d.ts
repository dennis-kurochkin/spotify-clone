declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      DATABASE_URL: string
      SHADOW_DATABASE_URL: string
      JWT_SECRET: string
    }
  }
}

export {}
