export interface AzzoLogin {
  email: string;
  senha: string;
}

export interface AzzoTokens {
  accessToken: string;
}

export interface Cargo {
  cargo_id: number; 
  nome: string;        
}
export interface AzzoDecodedToken {
  userId: number;     
  email: string;      
  cargo: Cargo;        
  iat: number;        
  exp: number;  
}


