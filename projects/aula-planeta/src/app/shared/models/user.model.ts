import { Role } from './role.model';
import { Tutor } from './tutor.model';

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
    public tutor?: Tutor,
    public licencias?: any,
    public centro?: string,
    public codigoCentro?: string,
  ) {
    this.username = `${firstName} ${lastName}`;
  }
}
