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
      [Validators.required]
    ],
    lastName: [
      '',
      [Validators.required]
    ],
    email: [
      '',
      [Validators.required]
    ],
    title: [
      '',
      [Validators.required]
    ],
    message: [
      '',
      [Validators.required]
    ],
    recaptcha: [
      null, [Validators.required]
    ]

  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactFormComponent>,
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    // submit contact
    this.dialogRef.close();
  }


  get f(): FormGroup['controls'] {
    return this.myForm.controls;
  }


}
