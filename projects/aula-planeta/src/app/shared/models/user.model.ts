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
    public roles?: string,
    // public role?: Role,
  ) {
    this.username = `${firstName} ${lastName}`;
  }

  get imagenUrl() {
    if (this.img.includes('https')) {
      return this.img;
    }
    if (this.img) {
      return `${apiUrl}/upload/user/${this.img}`;
    } else {
      return `${apiUrl}/upload/user/no-img`;
    }
  }
}
