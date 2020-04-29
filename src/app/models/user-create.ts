import { Role } from './role-enum';

export class UserCreate {
    username: string;
    password: string;
    roles: Role[];
}