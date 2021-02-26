import { Role } from './role.model';

export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    private username?: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public uuid?: string,
    public roles?: string,
    // public role?: Role,
  ) {
    this.username = `${firstName} ${lastName}`;
  }
}
