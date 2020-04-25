import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

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
  ) {}

  ngOnInit(): void {}


  onSubmit() {

    // submit contact
    //this.dialogRef.close();
  }


  get f(): FormGroup['controls'] {
    return this.myForm.controls;
  }


}
