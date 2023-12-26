export interface AuthService {
  authenticate: () => Promise<void>;
}
