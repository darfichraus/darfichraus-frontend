import { Role } from './role-enum';

export class UserToken {
    $int_perms: [];
    sub: string;
    $int_roles: Role[];
    iat: number;
    username: string;
}