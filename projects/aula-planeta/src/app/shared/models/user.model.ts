import { Role } from './role.model';

export class User {
  id: string;
  jwtToken?: string;
  refreshTokens?: any[];
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  roles?: Role[];

  constructor(params: User = {} as User) {
    let {
      id = new Date().getMilliseconds().toString(),
      jwtToken = '',
      firstName = '',
      lastName = '',
      username = '',
      password = '',
      roles = []
    } = params;

    this.id = id;
    this.jwtToken = jwtToken;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.roles = roles;
    this.refreshTokens = []
  }
}
