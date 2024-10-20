import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (username && password) {
      return res.status(200).json({ message: 'Usuário registrado com sucesso' });
    } else {
      return res.status(400).json({ message: 'Campos inválidos' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
