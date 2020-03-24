import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  myForm: FormGroup = this.fb.group({

    firstName: [
      '',
      [Validators.required, Validators.maxLength(32)]
    ],
    lastName: [
      '',
      [Validators.required, Validators.maxLength(32)]
    ],
    email: [
      '',
      [Validators.required, Validators.maxLength(32)]
    ],
    title: [
      '',
      [Validators.required, Validators.maxLength(32)]
    ],
    message: [
      '',
      [Validators.required, Validators.maxLength(1024)]
    ],

  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    //private feedService: FeedService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {}


  get f(): FormGroup['controls'] {
    return this.myForm.controls;
  }
}
