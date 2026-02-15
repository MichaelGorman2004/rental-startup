export type UserRole = 'student_org' | 'venue_admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  role: UserRole | null;
}

export interface LoginFormData {
  email: string;
}

export interface SignupFormData {
  email: string;
  role: UserRole;
}
