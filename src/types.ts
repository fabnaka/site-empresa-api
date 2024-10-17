export interface SessionToken {
    id: number;
    empresa_id: number;
    token: string;
  }
  
  export interface ContextInterface {
    usuario?: SessionToken|undefined;
    userAgent?: string;
    ipAdress?: string;
  }