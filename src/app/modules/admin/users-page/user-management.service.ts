import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  static readonly USERS_URL = environment.apiUrl + 'admin/users/';
  static readonly USERS_REGISTER_URL = environment.apiUrl + 'admin/users/register';

  constructor(private readonly http: HttpClient) {}

 

  getAllUsers() {
    return this.http.get<User[]>(UserManagementService.USERS_URL);
  }

  deleteUser(email: string) {
      return this.http.delete(UserManagementService.USERS_URL + email);
  }

  registerUser(user) {
      return this.http.post(UserManagementService.USERS_REGISTER_URL, user);
  }

  updateUserRole(user) {
      return;
  }

}
