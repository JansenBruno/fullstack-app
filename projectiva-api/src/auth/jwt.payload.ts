export interface JwtPayload {
    username: string; // Nome de usuário
    sub: number;      // ID do usuário (pode ser string se você estiver usando string para IDs)
    role: string;     // Papel do usuário, como 'manager' ou 'employee'
  }
  