import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Advice } from 'src/app/models/advice';

@Component({
  selector: 'app-advisor-modal',
  templateUrl: './advisor-modal.component.html',
  styleUrls: ['./advisor-modal.component.scss']
})
export class AdvisorModalComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    areal: ['STATE', [Validators.required]],
    county: ['', [Validators.required]],
    zip: [''],
    restrictionType: [[], [Validators.required]],
    shortDescription: ['', [Validators.required, Validators.maxLength(256)]],
    restrictionDescription: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(10000)]
    ],
    restrictionState: ['RESTRICTION', [Validators.required]],

    furtherInformation: ['', [Validators.required, Validators.maxLength(256)]],
    restrictionStart: ['', [Validators.required]],
    restrictionEnd: ['', [Validators.required]],
    verified: [false, [Validators.required]]
  });

  constructor( private fb: FormBuilder,
               public dialogRef: MatDialogRef<AdvisorModalComponent>,
    // private feedService: FeedService,
               @Inject(MAT_DIALOG_DATA) public data: Advice) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {

  }

  get f(): FormGroup['controls'] {
    return this.myForm.controls;
  }


}
