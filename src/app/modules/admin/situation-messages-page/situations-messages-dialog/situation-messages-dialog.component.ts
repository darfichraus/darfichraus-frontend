import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotificationService } from "src/app/modules/core/services/notification.service";
import { SituationType } from "src/app/models/situation-type";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Webresource } from 'src/app/models/webresource';
import { WebresourceService } from '../../assets-page/assets.service';
import { SituationMessageService } from '../situtation-message-type.service';
import { SituationMessage } from 'src/app/models/situation-message';
import { SituationTypeService } from '../../situation-types-page/situtation-types.service';
import { SituationMessageType } from 'src/app/models/situation-message-type';
import { SituationMessageTypeService } from '../../situation-message-types-page/situtation-message-type.service';
import { SituationCategory } from 'src/app/models/situation-category';
import { SituationCategoryService } from '../../situation-categories-page/situtation-category.service';
import { SituationReferenceService } from '../../situation-references-page/situtation-reference.service';
import { SituationReference } from 'src/app/models/situation-reference';
import { Situation } from 'src/app/models/situation';
import { SituationService } from '../../situations-page/situations.service';

@Component({
  selector: "app-situation-messages-dialog",
  templateUrl: "./situation-messages-dialog.component.html",
  styleUrls: ["./situation-messages-dialog.component.scss"],
})
export class SituationMessagesDialogComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    situationId: [this.data?.st?.situationId, [Validators.required]],
    messageTypeId: [this.data?.st?.messageTypeId, [Validators.required]],
    title: [this.data?.st?.title, [Validators.required]],
    message: [this.data?.st?.message, [Validators.required]],
    excerpt: [this.data?.st?.excerpt, [Validators.required]],
    icon: [this.data?.st?.icon, [Validators.required]],
    severity: [this.data?.st?.severity, [Validators.required]],
    documents: [this.data?.st?.documents, [Validators.required]],
    arealOfEffect: [this.data?.st?.areaOfEffect, [Validators.required]],
    affectedCategories: [[this.data?.st?.affectedCategories], [Validators.required]],
    status: [this.data?.st?.status, [Validators.required]],
    version: [this.data?.st?.version, [Validators.required]],

  });

  severities = [1,2,3,4,5];
  statuses: string[] = SituationMessage.getSituationStatusTypes();
  mySituationCategories: SituationCategory [] = [];
  myMedias: Webresource[] = [];
  mySituationTypes: SituationType [] = [];
  mySituations: Situation [] = [];
  mySituationMessageTypes: SituationMessageType [] = [];
  mySituationReferences: SituationReference [] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SituationMessagesDialogComponent>,
    private situationMessageService: SituationMessageService,
    @Inject(MAT_DIALOG_DATA) public data: { mode: string; st: SituationMessage },
    private notificationService: NotificationService,
    private webresourceService: WebresourceService,
    private situationTypeService: SituationTypeService,
    private situationMessageTypeService: SituationMessageTypeService,
    private situationCategoryService: SituationCategoryService,
    private situationReferenceService: SituationReferenceService,
    private situationService: SituationService,
  ) {}

  ngOnInit(): void {

    this.webresourceService.getWebresource().subscribe(
      (val) => {
        this.myMedias = val;
      },
      (err) => {
        console.log(err);
      }
    );

    this.situationTypeService.getAllSituationTypes().subscribe((val) => {
      this.mySituationTypes = val;
    }, (err) => {
      console.log(err);
    });

    this.situationMessageTypeService.getAllSituationMessageTypes().subscribe((val) => {
      this.mySituationMessageTypes = val;
    }, (err) => {
      console.log(err);
    });

    this.situationCategoryService.getAllSituationCategories().subscribe((val) => {
      this.mySituationCategories = val;
    }, (err) => {
      console.log(err);
    });

    this.situationReferenceService.getAllSituationReferences().subscribe((val)=> {
      this.mySituationReferences = val;
    }, (err) => {
      console.log(err);
    });

    this.situationService.getAllSituations().subscribe((val) => {
      this.mySituations = val;
    }, (err) => {
      console.log(err);
    });


  }

    // convenience getter for easy access to form fields
    get f(): FormGroup['controls'] {
      return this.myForm.controls;
    }
    
  onSave() {
    let st: SituationMessage = this.myForm.value as SituationMessage;
    st.situationId = this.f.situationId.value.id;
    st.messageTypeId = this.f.messageTypeId.value.id;
    st.documents = [this.f.documents.value.id];

    let myaffCats = this.f.affectedCategories.value.map(e => e.id);
    st.affectedCategories = myaffCats;

    console.log(st);
    if(this.data.mode == 'Add') {
      this.situationMessageService.addSituationMessage(st).subscribe((val) => {
        console.log("succ. added st");
        console.log(val);
        this.dialogRef.close(val);
      });
    }

    if(this.data.mode == 'Edit') {
      st.id = this.data.st.id;
      this.situationMessageService.updateSituationMessage(st).subscribe((val) => {
        console.log("succ. updated st");
        console.log(val);
        this.dialogRef.close(val);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
