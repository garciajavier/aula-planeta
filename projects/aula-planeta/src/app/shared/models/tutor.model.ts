import { Role } from './role.model';
import { environment } from '../../../environments/environment.prod';
const apiUrl = environment.apiUrl;

export class Tutor {
  constructor(
    public uuid: string,
    public firstName: string,
    public lastName: string,
    public email: string
  ) {

  }
}
