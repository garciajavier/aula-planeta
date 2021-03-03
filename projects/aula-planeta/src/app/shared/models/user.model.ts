import { Role } from './role.model';
import { environment } from '../../../environments/environment.prod';
const apiUrl = environment.apiUrl;

export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public uuid?: string,
    private username?: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: Role[],
    // public role?: Role,
  ) {
    this.username = `${firstName} ${lastName}`;
  }
}
