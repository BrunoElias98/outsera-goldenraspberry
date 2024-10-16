import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  access_type: 'Profissional' | 'Client' | 'Master';
}

interface AuthStore {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null, // null significa que o usuário não está logado
      login: (userData) => set({ user: userData }), // Função para logar o usuário
      logout: () => set({ user: null }), // Função para deslogar o usuário
    }),
    {
      name: 'auth-storage', // nome da chave no localStorage
    }
  )
);
