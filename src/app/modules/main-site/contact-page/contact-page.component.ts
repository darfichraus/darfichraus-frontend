import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faEnvelope = faEnvelope;

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

  ngOnInit(): void {
    this.f.firstName.disable();
    this.f.lastName.disable();
    this.f.email.disable();
    this.f.title.disable();
    this.f.message.disable();
  }


  onSubmit() {

    // submit contact
    //this.dialogRef.close();
  }


  get f(): FormGroup['controls'] {
    return this.myForm.controls;
  }


}
