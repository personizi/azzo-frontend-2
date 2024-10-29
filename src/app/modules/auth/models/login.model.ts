export interface AzzoLogin {
  email: string;
  senha: string;
}

export interface AzzoTokens {
  accessToken: string;
}

export interface AzzoDecodedToken {
  userId: string;
  email: string;
  cargo: string;
}