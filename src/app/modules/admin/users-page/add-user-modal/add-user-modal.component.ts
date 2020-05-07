import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import { User } from 'src/app/models/user';
import { Role } from '../../../../models/role-enum';
import { UserCreate } from 'src/app/models/user-create';
import { NotificationService } from 'src/app/modules/core/services/notification.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {

  roles = Object.values(Role).splice(0, Object.keys(Role).length / 2);

  signupForm: FormGroup = this.fb.group({

    email: [
      '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    roles: [['ROLE_ADMIN'], [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserManagementService,
    private dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string; user: User },
    private notificationService: NotificationService,
  ) {}

  /**
   * ngOnInit method of class
   */
  ngOnInit(): void {
    if (this.data.user !== undefined) {
      this.setFormValues(this.data.user);
    }
  }

  // convenience getter for easy access to form fields
  get f(): FormGroup['controls'] {
    return this.signupForm.controls;
  }

  /**
   * sets (initial) form values when the user wants to edit a user
   * @param user user param to fill form values with
   */
  setFormValues(user: User): void {
    this.signupForm.controls['email'].setValue(this.data.user.id);
    this.signupForm.controls['email'].disable();
    this.signupForm.controls['password'].setValue('passwort123');
    this.signupForm.controls['password'].disable();  
    this.signupForm.controls['roles'].setValue(this.data.user.roles);
  }

  /**
   * close dialog with user details to be added
   */
  onSave(): void {

    console.log("on save");
    if (this.data.mode === 'Add') {

      const user: UserCreate = {
        username: this.f.email.value,
        password: this.f.password.value,
        roles: this.f.roles.value,
      };
      console.log('on add');
      console.log(user);

      this.userService.registerUser(user).subscribe((val) => {
        this.dialogRef.close(user);
      }, (err) => {
        console.log(err);
        this.notificationService.info(err.error.message);
      });

    }


    else if (this.data.mode === 'Edit') {


      /*
      const user: UserEdit = {
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value,
        phoneNumber: this.f.phone.value,
        roles: this.f.roles.value,
      };
      this.userService.updateUser2(this.data.user.id, user).subscribe((val) => {
        this.dialogRef.close(user);
        this.notificationService.addInfo('User Information changed.');

      }, (err) => {
        console.log(err);
      });

      */
    }


  }

  

  onCancel(): void {
    this.dialogRef.close();
  }
}
